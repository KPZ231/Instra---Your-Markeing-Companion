"use client";

import { useTranslation } from "react-i18next";
import { FilePlus, Zap, BarChart2, Puzzle } from "lucide-react";

interface QuickAction {
  id: string;
  icon: React.ReactNode;
  labelKey: string;
}

const ACTIONS: QuickAction[] = [
  { id: "new-post", icon: <FilePlus size={15} />, labelKey: "dashboard.quickActions.newPost" },
  { id: "new-campaign", icon: <Zap size={15} />, labelKey: "dashboard.quickActions.newCampaign" },
  { id: "view-report", icon: <BarChart2 size={15} />, labelKey: "dashboard.quickActions.viewReport" },
  { id: "add-plugin", icon: <Puzzle size={15} />, labelKey: "dashboard.quickActions.addPlugin" },
];

/**
 * Quick-action ghost-button grid for common dashboard tasks.
 *
 * @example
 * <QuickActions />
 */
export default function QuickActions() {
  const { t } = useTranslation();

  return (
    <div
      className="rounded-sm border"
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
          {t("dashboard.quickActions.label")}
        </p>
        <p className="font-sans text-base font-semibold" style={{ color: "var(--color-primary)" }}>
          {t("dashboard.quickActions.title")}
        </p>
      </div>

      <div className="p-5 grid grid-cols-2 gap-2">
        {ACTIONS.map((action) => (
          <button
            key={action.id}
            className="flex items-center gap-2 px-3 py-2.5 rounded-sm border text-left transition-colors hover:bg-white/5"
            style={{
              color: "var(--color-secondary)",
              borderColor: "rgba(203,198,188,0.2)",
            }}
          >
            <span className="shrink-0">{action.icon}</span>
            <span className="font-mono text-xs tracking-[0.05em]">{t(action.labelKey)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
