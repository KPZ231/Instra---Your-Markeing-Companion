"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import type { PostAnalytics } from "@/features/analytics";
import { formatMetricValue } from "@/features/analytics";

interface PostAnalyticsRowProps {
  post: PostAnalytics;
}

/** Colour for content score badge */
function scoreColor(score: number): string {
  if (score >= 75) return "#00FF41";
  if (score >= 50) return "var(--color-primary)";
  return "#FF4444";
}

/**
 * Single row in the post analytics table.
 * Shows post excerpt, platforms, content score, like count, and engagement rate.
 *
 * @param post - PostAnalytics data for this row
 *
 * @example
 * <PostAnalyticsRow post={post} />
 */
export default function PostAnalyticsRow({ post }: PostAnalyticsRowProps) {
  const { t } = useTranslation();
  const score = post.contentScore.score;
  const engagementPct = (post.metrics.engagementRate * 100).toFixed(2);
  const excerpt = post.content?.slice(0, 80) ?? "(no text)";

  return (
    <div
      className="rounded-sm border px-4 py-3 flex items-center gap-4 hover:border-white/20 transition-colors"
      style={{
        background: "var(--color-surface-container)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      {/* Excerpt */}
      <p
        className="font-sans text-sm flex-1 truncate"
        style={{ color: "var(--color-primary)" }}
        title={post.content ?? undefined}
      >
        {excerpt}
      </p>

      {/* Platforms */}
      <div className="hidden md:flex items-center gap-1 shrink-0">
        {post.platforms.map((p) => (
          <span
            key={p}
            className="font-mono text-[10px] tracking-[0.06em] uppercase px-1.5 py-0.5 rounded-sm border"
            style={{
              color: "var(--color-on-surface-variant)",
              borderColor: "rgba(255,255,255,0.1)",
            }}
          >
            {p.slice(0, 2)}
          </span>
        ))}
      </div>

      {/* Likes */}
      <span
        className="font-mono text-xs tabular-nums shrink-0"
        title={t("analytics.stats.likes")}
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        ♥ {formatMetricValue(post.likeCount)}
      </span>

      {/* Content score */}
      <div className="flex items-center gap-1 shrink-0">
        <span
          className="font-mono text-xs tracking-[0.06em] uppercase"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          {t("analytics.posts.score")}
        </span>
        <span
          className="font-mono text-xs font-semibold tabular-nums"
          style={{ color: scoreColor(score) }}
        >
          {score}
        </span>
      </div>

      {/* Engagement rate */}
      <span
        className="font-mono text-xs tabular-nums shrink-0"
        title={t("analytics.stats.engagementRate")}
        style={{
          color: post.metrics.engagementRate > 0 ? "#00FF41" : "var(--color-on-surface-variant)",
        }}
      >
        {engagementPct}%
      </span>

      {/* Detail link */}
      <Link
        href={`/dashboard/analytics/${post.postId}`}
        className="font-mono text-[10px] tracking-[0.08em] uppercase px-2.5 py-1 rounded-sm border transition-colors shrink-0 hover:border-white/20"
        style={{
          color: "var(--color-on-surface-variant)",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        {t("analytics.posts.viewDetails")}
      </Link>
    </div>
  );
}
