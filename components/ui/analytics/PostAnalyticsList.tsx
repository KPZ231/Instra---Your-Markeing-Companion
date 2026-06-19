"use client";

import { useTranslation } from "react-i18next";
import type { PostAnalytics } from "@/features/analytics";
import PostAnalyticsRow from "./PostAnalyticsRow";

interface PostAnalyticsListProps {
  posts: PostAnalytics[];
}

/**
 * Scrollable list of per-post analytics rows.
 * Posts are pre-sorted by engagement rate descending (handled by lib/api/analytics).
 *
 * @param posts - Array of PostAnalytics from the analytics overview
 *
 * @example
 * <PostAnalyticsList posts={overview.posts} />
 */
export default function PostAnalyticsList({ posts }: PostAnalyticsListProps) {
  const { t } = useTranslation();

  return (
    <div
      className="rounded-sm border flex flex-col"
      style={{
        background: "var(--color-surface-container)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-4 border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <p
          className="font-mono text-xs tracking-[0.1em] uppercase mb-0.5"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          {t("analytics.posts.label")}
        </p>
        <p className="font-sans text-base font-semibold" style={{ color: "var(--color-primary)" }}>
          {t("analytics.posts.title")}
        </p>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-2 p-4">
        {posts.length === 0 ? (
          <p
            className="font-mono text-xs text-center py-8"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            {t("analytics.posts.empty")}
          </p>
        ) : (
          posts.map((post) => <PostAnalyticsRow key={post.postId} post={post} />)
        )}
      </div>
    </div>
  );
}
