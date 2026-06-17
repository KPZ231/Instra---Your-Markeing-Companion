import type { PluginVersion, Plugin } from "@prisma/client";

type Submission = PluginVersion & {
  plugin: Pick<Plugin, "id" | "slug" | "name" | "description">;
};

interface MySubmissionsSectionProps {
  submissions: Submission[];
}

const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; color: string }
> = {
  PENDING_REVIEW: {
    label: "Pending Review",
    bg: "rgba(255, 180, 0, 0.12)",
    color: "#ffb400",
  },
  APPROVED: {
    label: "Approved",
    bg: "rgba(0, 200, 120, 0.12)",
    color: "#00c878",
  },
  REJECTED: {
    label: "Rejected",
    bg: "rgba(255, 80, 80, 0.12)",
    color: "#ff5050",
  },
};

/**
 * Displays the current user's plugin submissions grouped with review status badges.
 * Shown above the marketplace grid so users can track pending/rejected plugins.
 * @param submissions - List of PluginVersion records belonging to the current user
 */
export default function MySubmissionsSection({
  submissions,
}: MySubmissionsSectionProps) {
  if (submissions.length === 0) return null;

  return (
    <section className="space-y-3">
      <p
        className="font-mono text-xs tracking-[0.12em] uppercase"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        // MY SUBMISSIONS
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
        {submissions.map((s) => {
          const cfg = STATUS_CONFIG[s.status] ?? STATUS_CONFIG.PENDING_REVIEW;
          return (
            <div
              key={s.id}
              className="rounded-sm border p-4 flex flex-col gap-2"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              {/* Name + badge */}
              <div className="flex items-start justify-between gap-2">
                <span
                  className="font-mono text-sm font-semibold leading-tight"
                  style={{ color: "var(--color-primary)" }}
                >
                  {s.plugin.name}
                </span>
                <span
                  className="font-mono text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 rounded-sm whitespace-nowrap flex-shrink-0"
                  style={{ background: cfg.bg, color: cfg.color }}
                >
                  {cfg.label}
                </span>
              </div>

              {/* Version */}
              <p
                className="font-mono text-[10px] tracking-[0.08em]"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                v{s.version}
              </p>

              {/* Description */}
              <p
                className="text-xs leading-relaxed line-clamp-2"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                {s.plugin.description}
              </p>

              {/* Rejection reason */}
              {s.status === "REJECTED" && s.rejectionReason && (
                <p
                  className="font-mono text-[10px] leading-relaxed border-l-2 pl-2 mt-1"
                  style={{
                    color: "#ff5050",
                    borderColor: "#ff5050",
                  }}
                >
                  {s.rejectionReason}
                </p>
              )}

              {/* Pending hint */}
              {s.status === "PENDING_REVIEW" && (
                <p
                  className="font-mono text-[10px] leading-relaxed mt-1"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  Your plugin is awaiting admin review. It will appear in the
                  marketplace once approved.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
