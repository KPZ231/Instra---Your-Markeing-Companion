"use client";

import { useTranslation } from "react-i18next";
import { FileText, Zap, BarChart2, Puzzle } from "lucide-react";

interface ActivityItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  timestamp: string;
}

const MOCK_ACTIVITY: ActivityItem[] = [
  { id: "1", icon: <FileText size={13} />, title: "Post published — Instagram", timestamp: "2m ago" },
  { id: "2", icon: <Zap size={13} />, title: "Campaign 'Q3 Launch' activated", timestamp: "18m ago" },
  { id: "3", icon: <BarChart2 size={13} />, title: "Weekly report generated", timestamp: "1h ago" },
  { id: "4", icon: <Puzzle size={13} />, title: "Plugin 'HubSpot Sync' installed", timestamp: "3h ago" },
  { id: "5", icon: <FileText size={13} />, title: "Post published — LinkedIn", timestamp: "5h ago" },
  { id: "6", icon: <Zap size={13} />, title: "Automation triggered × 14", timestamp: "Yesterday" },
  { id: "7", icon: <BarChart2 size={13} />, title: "Reach milestone: 1M impressions", timestamp: "Yesterday" },
];

/**
 * Scrollable activity feed showing recent platform events.
 * Uses static mock data — connect to real event stream in production.
 *
 * @example
 * <ActivityFeed />
 */
export default function ActivityFeed() {
  const { t } = useTranslation();

  return (
    <div
      className="rounded-sm border flex flex-col"
      style={{
        background: "var(--color-surface-container)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="px-5 py-4 border-b"
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

      <ul className="flex-1 overflow-y-auto">
        {MOCK_ACTIVITY.map((item) => (
          <li
            key={item.id}
            className="flex items-start gap-3 px-5 py-3.5 border-b"
            style={{ borderColor: "rgba(255,255,255,0.04)" }}
          >
            <span
              className="mt-0.5 shrink-0"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              {item.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p
                className="font-sans text-sm leading-snug truncate"
                style={{ color: "var(--color-on-surface)" }}
              >
                {item.title}
              </p>
              <p
                className="font-mono text-xs mt-0.5"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                {item.timestamp}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
