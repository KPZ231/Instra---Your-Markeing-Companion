"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Bell, Search } from "lucide-react";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import type { SessionUser } from "@/types/auth";

interface DashboardHeaderProps {
  user: SessionUser;
}

/**
 * Top-bar action group — search trigger, notifications bell, user avatar with dropdown.
 * Dropdown matches the style of Navbar.tsx (glassmorphism, framer-motion, Button sign-out).
 *
 * @param user - The current authenticated session user.
 * @example
 * <DashboardHeader user={session.user} />
 */
export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email?.[0]?.toUpperCase() ?? "U";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSignOut() {
    setOpen(false);
    await signOut({ callbackUrl: "/" });
  }

  return (
    <div className="flex items-center gap-3 shrink-0">
      {/* Search trigger */}
      <button
        aria-label={t("dashboard.header.search")}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        style={{
          background: "var(--color-surface-container-low)",
          borderColor: "rgba(255,255,255,0.08)",
          color: "var(--color-on-surface-variant)",
        }}
      >
        <Search size={14} />
        <span
          className="font-mono text-xs tracking-[0.05em] hidden sm:inline"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          {t("dashboard.header.search")}
        </span>
      </button>

      {/* Notifications */}
      <button
        aria-label={t("dashboard.header.notifications")}
        className="relative flex items-center justify-center w-9 h-9 rounded-full border transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        style={{
          background: "var(--color-surface-container-low)",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <Bell size={16} style={{ color: "var(--color-on-surface-variant)" }} />
        <span
          aria-hidden="true"
          className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
          style={{ background: "#00FF41" }}
        />
      </button>

      {/* Avatar + dropdown */}
      <div ref={profileRef} className="relative">
        <button
          onClick={() => setOpen((p) => !p)}
          aria-label={t("nav.profile")}
          aria-expanded={open}
          className="flex items-center gap-1.5 transition-opacity duration-150 hover:opacity-80 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-full"
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-medium tracking-wide select-none shrink-0"
            style={{
              background: "var(--color-surface-container-high)",
              color: "var(--color-primary)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {initials}
          </div>
        </button>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-full mt-3 min-w-48 py-1 rounded z-50"
            style={{
              background: "rgba(26, 28, 24, 0.92)",
              backdropFilter: "blur(24px) saturate(160%)",
              WebkitBackdropFilter: "blur(24px) saturate(160%)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow:
                "0 16px 40px rgba(0, 0, 0, 0.55), 0 0 0 0.5px rgba(255,255,255,0.04)",
            }}
          >
            {user.name && (
              <div
                className="px-4 py-2.5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <p
                  className="text-xs font-mono tracking-widest truncate"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  {user.name}
                </p>
              </div>
            )}

            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center px-4 py-2.5 text-sm transition-colors duration-100"
              style={{ color: "var(--color-on-surface)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {t("nav.dashboard")}
            </Link>
            <Link
              href="/dashboard/profile"
              onClick={() => setOpen(false)}
              className="flex items-center px-4 py-2.5 text-sm transition-colors duration-100"
              style={{ color: "var(--color-on-surface)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {t("nav.profile")}
            </Link>

            <div
              className="px-3 py-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <Button
                onClick={handleSignOut}
                variant="secondary"
                className="w-full justify-center"
                style={{ borderColor: "var(--color-error)", color: "var(--color-error)" }}
              >
                {t("nav.signout")}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
