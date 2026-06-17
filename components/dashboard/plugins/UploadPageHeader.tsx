"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

/**
 * Client component for the plugin upload page header.
 * Renders the back link, label, and heading using i18n translations.
 *
 * @example
 * <UploadPageHeader />
 */
export default function UploadPageHeader() {
  const { t } = useTranslation();

  return (
    <div>
      <Link
        href="/dashboard/plugins"
        className="font-mono text-[11px] tracking-[0.08em] uppercase mb-3 inline-block transition-colors"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        ← {t("dashboard.nav.plugins")}
      </Link>
      <p
        className="font-mono text-xs tracking-[0.12em] uppercase mb-1"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        {t("plugins.upload.label")}
      </p>
      <h1
        className="font-sans text-2xl font-semibold"
        style={{ color: "var(--color-primary)" }}
      >
        {t("plugins.upload.heading")}
      </h1>
    </div>
  );
}
