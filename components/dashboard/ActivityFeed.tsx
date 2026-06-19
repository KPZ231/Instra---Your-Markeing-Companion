"use client";

import { useTranslation } from "react-i18next";
import { FileText, AlertCircle, Clock, Loader2 } from "lucide-react";
import type { DashboardActivityItem } from "@/lib/api/dashboardMetrics";

interface ActivityFeedProps {
  /** Recent publish-status events from the dashboard metrics service. */
  items: DashboardActivityItem[];
}

/**
 * Returns a relative-time string (e.g. "2 minutes ago") using the browser's
 * Intl.RelativeTimeFormat API.
 *
 * @param iso - ISO date string of the event
 */
function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHours = Math.round(diffMin / 60);
  const diffDays = Math.round(diffHours / 24);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (diffSec < 60) return rtf.format(-diffSec, "second");
  if (diffMin < 60) return rtf.format(-diffMin, "minute");
  if (diffHours < 24) return rtf.format(-diffHours, "hour");
  return rtf.format(-diffDays, "day");
}

/**
 * Returns the appropriate Lucide icon and colour for a publish status.
 *
 * @param status - PUBLISHED | FAILED | PENDING | PUBLISHING
 */
function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case "PUBLISHED":
      return <FileText size={13} style={{ color: "#00FF41" }} />;
    case "FAILED":
      return <AlertCircle size={13} style={{ color: "var(--color-error, #FF4444)" }} />;
    case "PUBLISHING":
      return <Loader2 size={13} className="animate-spin" style={{ color: "var(--color-on-surface-variant)" }} />;
    default:
      return <Clock size={13} style={{ color: "var(--color-on-surface-variant)" }} />;
  }
}

/**
 * Maps a publish status to the appropriate i18n key.
 *
 * @param status - PUBLISHED | FAILED | PENDING | PUBLISHING
 */
function statusKey(status: string): string {
  switch (status) {
    case "PUBLISHED":  return "dashboard.activity.published";
    case "FAILED":     return "dashboard.activity.failed";
    case "PUBLISHING": return "dashboard.activity.processing";
    default:           return "dashboard.activity.pending";
  }
}

/**
 * Scrollable activity feed showing recent social-platform publish events.
 * Renders a friendly empty-state when no events exist yet.
 *
 * @param items - Publish-status events from getDashboardMetrics()
 *
 * @example
 * <ActivityFeed items={metrics.activity} />
 */
export default function ActivityFeed({ items }: ActivityFeedProps) {
  const { t } = useTranslation();

  return (
    <div
      className="rounded-sm border flex flex-col h-full"
      style={{
        background: "var(--color-surface-container)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="px-5 py-4 border-b shrink-0"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <p
          className="font-mono text-xs tracking-[0.1em] uppercase mb-0.5"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          {t("dashboard.activity.label")}
        </p>
        <p className="font-sans text-base font-semibold" style={{ color: "var(--color-primary)" }}>
          {t("dashboard.activity.title")}
        </p>
      </div>

      {items.length === 0 ? (
        <div
          className="flex-1 flex flex-col items-center justify-center gap-2 px-5 py-8"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          <Clock size={20} opacity={0.4} />
          <p className="font-mono text-xs tracking-[0.05em] text-center opacity-60">
            {t("dashboard.activity.empty")}
          </p>
        </div>
      ) : (
        <ul className="flex-1 overflow-y-auto">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-3 px-5 py-3.5 border-b"
              style={{ borderColor: "rgba(255,255,255,0.04)" }}
            >
              <span className="mt-0.5 shrink-0">
                <StatusIcon status={item.status} />
              </span>
              <div className="flex-1 min-w-0">
                <p
                  className="font-sans text-sm leading-snug truncate"
                  style={{ color: "var(--color-on-surface)" }}
                >
                  {t(statusKey(item.status), { platform: item.platform })}
                </p>
                <p
                  className="font-mono text-xs mt-0.5"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  {relativeTime(item.at)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
