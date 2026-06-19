import 'server-only'

import { prisma } from '@/lib/prisma'
import { getOrSet } from '@/lib/cache'
import { getConnectedAccounts } from '@/lib/api/socialAccounts'

/** A single KPI stat card value. `value` is null when no data source exists. */
export type DashboardStat = {
  /** Stat identifier */
  id: string
  /** i18n key for the card label */
  labelKey: string
  /** Formatted display value, or null when data is unavailable */
  value: string | null
  /** Percentage change vs the previous 7 days, or null when unavailable */
  delta: number | null
  /** i18n key for the delta context label */
  deltaLabelKey: string
}

/** A single recent-activity event derived from social publish statuses. */
export type DashboardActivityItem = {
  id: string
  platform: string
  /** PUBLISHED | FAILED | PENDING | PUBLISHING */
  status: string
  /** ISO string of the event time (publishedAt ?? createdAt) */
  at: string
}

/** Full metrics payload for the dashboard overview. */
export type DashboardMetrics = {
  stats: DashboardStat[]
  /** Normalised engagement series (0–100) keyed by time range */
  chartSeries: Record<'7D' | '30D' | '90D', number[]>
  activity: DashboardActivityItem[]
}

// ─── helpers ────────────────────────────────────────────────────────────────

/**
 * Computes a percentage-change delta between two counts.
 * Returns null when the previous period has zero events (avoids ÷0).
 *
 * @param current - Count in the current period
 * @param previous - Count in the prior period
 */
function computeDelta(current: number, previous: number): number | null {
  if (previous === 0) return null
  return Math.round(((current - previous) / previous) * 100 * 10) / 10
}

/**
 * Formats a plain number for display using compact notation (e.g. 1200 → "1.2K").
 *
 * @param n - Number to format
 */
function formatCompact(n: number): string {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n)
}

/**
 * Aggregates an array of ISO date strings into a per-day count array
 * covering the last `days` days (oldest → newest), then normalises to 0–100.
 *
 * @param dates - ISO date strings of events
 * @param days  - Number of days to cover
 */
function buildDailySeries(dates: string[], days: number): number[] {
  const counts: number[] = new Array(days).fill(0)
  const now = Date.now()

  for (const iso of dates) {
    const diffMs = now - new Date(iso).getTime()
    const diffDays = Math.floor(diffMs / 86_400_000)
    const idx = days - 1 - diffDays
    if (idx >= 0 && idx < days) counts[idx]++
  }

  const max = Math.max(...counts, 1)
  return counts.map((c) => Math.round((c / max) * 100))
}

// ─── main export ────────────────────────────────────────────────────────────

/**
 * Fetches all metrics required by the dashboard overview for a given user.
 * Results are Redis-cached (db namespace, 300 s TTL) and should be
 * invalidated after post/like mutations via `invalidatePrefix('db', 'dashboardMetrics', userId)`.
 *
 * @param userId - Authenticated user's ID
 * @returns DashboardMetrics payload
 *
 * @example
 * const metrics = await getDashboardMetrics(user.id)
 */
export async function getDashboardMetrics(userId: string): Promise<DashboardMetrics> {
  return getOrSet(
    'db',
    async () => {
      const now = new Date()
      const sevenDaysAgo = new Date(now.getTime() - 7 * 86_400_000)
      const fourteenDaysAgo = new Date(now.getTime() - 14 * 86_400_000)
      const ninetyDaysAgo = new Date(now.getTime() - 90 * 86_400_000)

      // ── run all DB queries in parallel ──────────────────────────────────
      const [
        totalPosts,
        postsLast7,
        postsPrev7,
        totalLikes,
        likesLast7,
        likesPrev7,
        accounts,
        recentActivity,
        postsForChart,
      ] = await Promise.all([
        prisma.post.count({ where: { authorId: userId } }),
        prisma.post.count({ where: { authorId: userId, createdAt: { gte: sevenDaysAgo } } }),
        prisma.post.count({ where: { authorId: userId, createdAt: { gte: fourteenDaysAgo, lt: sevenDaysAgo } } }),
        prisma.like.count({ where: { post: { authorId: userId } } }),
        prisma.like.count({ where: { post: { authorId: userId }, createdAt: { gte: sevenDaysAgo } } }),
        prisma.like.count({ where: { post: { authorId: userId }, createdAt: { gte: fourteenDaysAgo, lt: sevenDaysAgo } } }),
        getConnectedAccounts(userId),
        prisma.socialPostStatus.findMany({
          where: { post: { authorId: userId } },
          orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
          take: 7,
          select: { id: true, platform: true, status: true, publishedAt: true, createdAt: true },
        }),
        prisma.post.findMany({
          where: { authorId: userId, createdAt: { gte: ninetyDaysAgo } },
          select: { createdAt: true },
          orderBy: { createdAt: 'asc' },
        }),
      ])

      // ── stats ────────────────────────────────────────────────────────────
      const postsDelta = computeDelta(postsLast7, postsPrev7)
      const likesDelta = computeDelta(likesLast7, likesPrev7)

      const stats: DashboardStat[] = [
        {
          id: 'posts',
          labelKey: 'dashboard.stats.posts',
          value: formatCompact(totalPosts),
          delta: postsDelta,
          deltaLabelKey: 'dashboard.stats.vsLastWeek',
        },
        {
          id: 'likes',
          labelKey: 'dashboard.stats.likes',
          value: formatCompact(totalLikes),
          delta: likesDelta,
          deltaLabelKey: 'dashboard.stats.vsLastWeek',
        },
        {
          id: 'accounts',
          labelKey: 'dashboard.stats.accounts',
          value: String(accounts.length),
          delta: null,
          deltaLabelKey: 'dashboard.stats.vsLastWeek',
        },
        {
          id: 'reach',
          labelKey: 'dashboard.stats.reach',
          value: null,
          delta: null,
          deltaLabelKey: 'dashboard.stats.vsLastWeek',
        },
      ]

      // ── chart series ─────────────────────────────────────────────────────
      const chartDates = postsForChart.map((p) => p.createdAt.toISOString())
      const chartSeries: Record<'7D' | '30D' | '90D', number[]> = {
        '7D': buildDailySeries(chartDates.filter((d) => new Date(d) >= sevenDaysAgo), 7),
        '30D': buildDailySeries(chartDates.filter((d) => new Date(d) >= new Date(now.getTime() - 30 * 86_400_000)), 30),
        '90D': buildDailySeries(chartDates, 90),
      }

      // ── activity ─────────────────────────────────────────────────────────
      const activity: DashboardActivityItem[] = recentActivity.map((row) => ({
        id: row.id,
        platform: row.platform,
        status: row.status,
        at: (row.publishedAt ?? row.createdAt).toISOString(),
      }))

      return { stats, chartSeries, activity }
    },
    undefined,
    'dashboardMetrics',
    userId,
  )
}
