import type { Metadata } from "next";
import { verifySession } from "@/lib/auth/dal";
import UploadForm from "@/components/dashboard/plugins/UploadForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Submit Plugin — Instra",
  robots: { index: false, follow: false },
};

/**
 * Plugin upload page — server component shell wrapping the client upload form.
 * Requires an authenticated session; redirects to login otherwise.
 */
export default async function PluginUploadPage() {
  await verifySession();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/plugins"
          className="font-mono text-[11px] tracking-[0.08em] uppercase mb-3 inline-block transition-colors"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          ← Marketplace
        </Link>
        <p
          className="font-mono text-xs tracking-[0.12em] uppercase mb-1"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          // PRZEŚLIJ PLUGIN
        </p>
        <h1
          className="font-sans text-2xl font-semibold"
          style={{ color: "var(--color-primary)" }}
        >
          Prześlij Plugin
        </h1>
        <p
          className="font-sans text-sm mt-2"
          style={{ color: "var(--color-accent-bone)" }}
        >
          Plugin trafi do kolejki recenzji. Po zatwierdzeniu przez admina zostanie opublikowany w marketplace.
        </p>
      </div>

      {/* Form */}
      <div
        className="rounded-sm border p-6"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <UploadForm />
      </div>
    </div>
  );
}
