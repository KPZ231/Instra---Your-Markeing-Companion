/**
 * Shared types for the post analytics feature module.
 * All consumers (service, engine, UI) import from here.
 */

/** Raw engagement metric values for a single post at a point in time. */
export interface EngagementMetrics {
  impressions: number
  reach: number
  views: number
  clicks: number
  shares: number
  comments: number
  likes: number
}

/** Aggregated snapshot totals for a post across its full history. */
export interface AggregatedMetrics extends EngagementMetrics {
  /** Engagement rate as a 0–1 fraction: (likes+comments+shares+clicks) / max(impressions,1) */
  engagementRate: number
  /** ISO string of the most recent snapshot */
  lastCapturedAt: string | null
}

/** A single point in a time-series for chart rendering. */
export interface MetricDataPoint {
  /** ISO date string (YYYY-MM-DD) */
  date: string
  /** The primary engagement rate for that day (0–100 scale for chart) */
  value: number
  /** Raw engagement counts for tooltip */
  metrics: Pick<EngagementMetrics, 'likes' | 'comments' | 'shares' | 'clicks'>
}

/** Prediction result for future engagement. */
export interface EngagementPrediction {
  /** Predicted future data points (date + value on 0–100 scale) */
  points: Array<{ date: string; value: number }>
  /** Confidence level: 'low' (< 3 snapshots), 'medium', 'high' (>= 14 snapshots) */
  confidence: 'low' | 'medium' | 'high'
}

/** Content score and issues for a single post. */
export interface ContentScore {
  /** 0–100 overall score */
  score: number
  /** Detected issues and suggestions, ordered by priority descending */
  issues: ContentIssue[]
}

/** A single content quality issue / improvement opportunity. */
export interface ContentIssue {
  /** i18n key under analytics.issues.* */
  key: string
  /** 1–10 priority (higher = more important to fix) */
  priority: number
  /** Optional interpolation params for i18next */
  params?: Record<string, string | number>
}

/** The daily tip shown at the top of the analytics page. */
export interface DailyTip {
  /** i18n key under analytics.tips.* */
  key: string
  /** Optional interpolation params */
  params?: Record<string, string | number>
  /** Post ID the tip relates to (undefined = general) */
  postId?: string
  /** Tip priority bucket */
  priority: 'high' | 'medium' | 'low'
}

/** Full analytics data for a single post. */
export interface PostAnalytics {
  postId: string
  content: string | null
  platforms: string[]
  createdAt: string
  likeCount: number
  metrics: AggregatedMetrics
  series: MetricDataPoint[]
  prediction: EngagementPrediction
  contentScore: ContentScore
}

/** Overview analytics for all of a user's posts. */
export interface AnalyticsOverviewData {
  /** Totals across all posts */
  totals: AggregatedMetrics
  /** Delta vs previous equivalent period (null = not enough history) */
  delta: Partial<Record<keyof AggregatedMetrics, number | null>>
  /** Aggregated daily time-series for the engagement chart */
  series: MetricDataPoint[]
  /** Prediction for the next period */
  prediction: EngagementPrediction
  /** Per-post summary, sorted by engagement rate desc */
  posts: PostAnalytics[]
  /** The daily tip computed from all posts */
  dailyTip: DailyTip
}
