"use client";

import { useTranslation } from "react-i18next";
import type { AnalyticsOverviewData } from "@/features/analytics";
import { formatMetricValue } from "@/features/analytics";
import StatCard from "@/components/dashboard/StatCard";
import EngagementChart from "./EngagementChart";
import DailyTipCard from "./DailyTipCard";
import PostAnalyticsList from "./PostAnalyticsList";

interface AnalyticsOverviewProps {
  data: AnalyticsOverviewData;
}

/**
 * Full analytics bento-grid overview.
 * Composes StatCards, the engagement chart with prediction, the daily tip, and the post list.
 *
 * @param data - AnalyticsOverviewData from getPostsAnalyticsOverview()
 *
 * @example
 * <AnalyticsOverview data={overview} />
 */
export default function AnalyticsOverview({ data }: AnalyticsOverviewProps) {
  const { t } = useTranslation();
  const { totals, delta, series, prediction, posts, dailyTip } = data;

  const deltaLabel = t("analytics.stats.vsLastPeriod");
  const engDelta = delta.engagementRate ?? null;

  return (
    <div className="space-y-6">
      {/* Section label */}
      <div>
        <p
          className="font-mono text-xs tracking-[0.1em] uppercase mb-1"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          {t("analytics.overview.label")}
        </p>
        <h1
          className="font-sans text-2xl font-semibold"
          style={{ color: "var(--color-primary)" }}
        >
          {t("analytics.overview.heading")}
        </h1>
      </div>

      {/* KPI row 1 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          label={t("analytics.stats.impressions")}
          value={totals.impressions > 0 ? formatMetricValue(totals.impressions) : null}
          delta={null}
          deltaLabel={deltaLabel}
        />
        <StatCard
          label={t("analytics.stats.reach")}
          value={totals.reach > 0 ? formatMetricValue(totals.reach) : null}
          delta={null}
          deltaLabel={deltaLabel}
        />
        <StatCard
          label={t("analytics.stats.likes")}
          value={formatMetricValue(totals.likes)}
          delta={null}
          deltaLabel={deltaLabel}
        />
        <StatCard
          label={t("analytics.stats.engagementRate")}
          value={`${(totals.engagementRate * 100).toFixed(2)}%`}
          delta={engDelta}
          deltaLabel={deltaLabel}
        />
      </div>

      {/* KPI row 2 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          label={t("analytics.stats.views")}
          value={totals.views > 0 ? formatMetricValue(totals.views) : null}
          delta={null}
          deltaLabel={deltaLabel}
        />
        <StatCard
          label={t("analytics.stats.comments")}
          value={totals.comments > 0 ? formatMetricValue(totals.comments) : null}
          delta={null}
          deltaLabel={deltaLabel}
        />
        <StatCard
          label={t("analytics.stats.shares")}
          value={totals.shares > 0 ? formatMetricValue(totals.shares) : null}
          delta={null}
          deltaLabel={deltaLabel}
        />
        <StatCard
          label={t("analytics.stats.clicks")}
          value={totals.clicks > 0 ? formatMetricValue(totals.clicks) : null}
          delta={null}
          deltaLabel={deltaLabel}
        />
      </div>

      {/* Chart + Daily Tip */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <EngagementChart series={series} prediction={prediction} />
        </div>
        <div>
          <DailyTipCard tip={dailyTip} />
        </div>
      </div>

      {/* Post list */}
      <PostAnalyticsList posts={posts} />
    </div>
  );
}
