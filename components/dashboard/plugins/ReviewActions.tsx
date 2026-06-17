"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface ReviewActionsProps {
  versionId: string;
}

/**
 * Client component with Approve and Reject buttons for admin plugin review.
 * Reject reveals a textarea for the rejection reason before confirming.
 * Calls POST /api/admin/plugins/[versionId]/review and refreshes on success.
 *
 * @param versionId - The PluginVersion ID to approve or reject
 */
export default function ReviewActions({ versionId }: ReviewActionsProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const [mode, setMode] = useState<"idle" | "rejecting">("idle");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Submits an approve or reject decision to the review API.
   * @param decision - "approve" or "reject"
   */
  async function submitDecision(decision: "approve" | "reject") {
    setLoading(true);
    setError(null);
    try {
      const body =
        decision === "approve"
          ? { decision }
          : { decision, reason };

      const res = await fetch(`/api/admin/plugins/${versionId}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({})) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Request failed.");
        return;
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  if (mode === "rejecting") {
    return (
      <div className="space-y-3">
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder={t("plugins.admin.reject_reason_placeholder")}
          rows={3}
          className="w-full rounded-sm border px-3 py-2 font-mono text-xs bg-transparent outline-none resize-none transition-colors"
          style={{
            borderColor: "rgba(255,75,75,0.4)",
            color: "var(--color-primary)",
          }}
        />
        {error && (
          <p className="font-mono text-[10px]" style={{ color: "#ffb4ab" }}>
            {error}
          </p>
        )}
        <div className="flex gap-2">
          <button
            onClick={() => submitDecision("reject")}
            disabled={loading || !reason.trim()}
            className="px-3 py-1.5 rounded-sm font-mono text-xs tracking-[0.08em] uppercase border transition-colors disabled:opacity-50"
            style={{ borderColor: "rgba(255,75,75,0.5)", color: "#ffb4ab" }}
          >
            {loading ? t("plugins.admin.rejecting") : t("plugins.admin.confirm_reject")}
          </button>
          <button
            onClick={() => {
              setMode("idle");
              setReason("");
              setError(null);
            }}
            disabled={loading}
            className="px-3 py-1.5 rounded-sm font-mono text-xs tracking-[0.08em] uppercase border transition-colors disabled:opacity-50"
            style={{
              borderColor: "rgba(255,255,255,0.1)",
              color: "var(--color-on-surface-variant)",
            }}
          >
            {t("plugins.admin.cancel")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-center">
      {error && (
        <p className="font-mono text-[10px] self-center" style={{ color: "#ffb4ab" }}>
          {error}
        </p>
      )}
      <button
        onClick={() => setMode("rejecting")}
        disabled={loading}
        className="px-3 py-1.5 rounded-sm font-mono text-xs tracking-[0.08em] uppercase border transition-colors disabled:opacity-50"
        style={{ borderColor: "rgba(255,75,75,0.4)", color: "#ffb4ab" }}
      >
        {t("plugins.admin.reject")}
      </button>
      <button
        onClick={() => submitDecision("approve")}
        disabled={loading}
        className="px-3 py-1.5 rounded-sm font-mono text-xs tracking-[0.08em] uppercase transition-colors disabled:opacity-50"
        style={{
          background: "var(--color-primary)",
          color: "var(--color-on-primary)",
        }}
      >
        {loading ? t("plugins.admin.approving") : t("plugins.admin.approve")}
      </button>
    </div>
  );
}
