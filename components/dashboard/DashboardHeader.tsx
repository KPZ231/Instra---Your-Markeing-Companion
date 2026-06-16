"use client";

import { useTranslation } from "react-i18next";
import { Bell, Search } from "lucide-react";
import type { SessionUser } from "@/types/auth";

interface DashboardHeaderProps {
  user: SessionUser;
}

/**
 * Top header bar for the dashboard — search, notifications, and user avatar.
 *
 * @param user - The current authenticated session user.
 * @example
 * <DashboardHeader user={session.user} />
 */
export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const { t } = useTranslation();
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email?.[0]?.toUpperCase() ?? "U";

  return (
    <header
      className="flex items-center justify-between px-6 py-4 shrink-0 border-b"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      {/* Search */}
      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-sm border w-64"
          style={{
            background: "var(--color-surface-container-low)",
            borderColor: "rgba(255,255,255,0.1)",
          }}
        >
          <Search size={14} style={{ color: "var(--color-on-surface-variant)" }} />
          <span
            className="font-mono text-xs tracking-[0.05em]"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            {t("dashboard.header.search")}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          aria-label={t("dashboard.header.notifications")}
          className="relative p-2 rounded-sm transition-colors hover:bg-white/5"
        >
          <Bell size={18} style={{ color: "var(--color-on-surface-variant)" }} />
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{ background: "#00FF41" }}
          />
        </button>

        <div
          className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-mono font-medium tracking-wide select-none"
          style={{
            background: "var(--color-surface-container-high)",
            color: "var(--color-primary)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
          title={user.name ?? user.email ?? ""}
        >
          {initials}
        </div>
      </div>
    </header>
  );
}
