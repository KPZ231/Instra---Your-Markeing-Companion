"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BarChart2 } from "lucide-react";

const RANGES = ["7D", "30D", "90D"] as const;
type Range = (typeof RANGES)[number];

interface AnalyticsChartProps {
  /**
   * Normalised (0–100) per-day series for each time range.
   * An empty array for a given range triggers the empty-state view.
   */
  series: Record<Range, number[]>;
}

function buildPolyline(data: number[], width: number, height: number): string {
  const pad = 8;
  const w = width - pad * 2;
  const h = height - pad * 2;
  return data
    .map((v, i) => {
      const x = pad + (i / (data.length - 1)) * w;
      const y = pad + h - (v / 100) * h;
      return `${x},${y}`;
    })
    .join(" ");
}

function buildArea(data: number[], width: number, height: number): string {
  const pad = 8;
  const w = width - pad * 2;
  const h = height - pad * 2;
  const points = data
    .map((v, i) => {
      const x = pad + (i / (data.length - 1)) * w;
      const y = pad + h - (v / 100) * h;
      return `${x},${y}`;
    })
    .join(" ");
  const first = `${pad},${pad + h}`;
  const last = `${pad + w},${pad + h}`;
  return `${first} ${points} ${last}`;
}

const W = 600;
const H = 160;

/**
 * SVG area chart showing post-publication activity over a selected time range.
 * Accepts real normalised series data from the dashboard metrics service.
 * Renders an empty-state message when the series for the active range is empty.
 *
 * @param series - Record mapping each range ("7D" | "30D" | "90D") to a
 *                 normalised number[] (0–100). Supply empty arrays for ranges
 *                 with no data.
 *
 * @example
 * <AnalyticsChart series={{ "7D": [0, 50, 100], "30D": [...], "90D": [...] }} />
 */
export default function AnalyticsChart({ series }: AnalyticsChartProps) {
  const { t } = useTranslation();
  const [range, setRange] = useState<Range>("30D");
  const data = series[range];
  const isEmpty = data.length === 0 || data.every((v) => v === 0);

  return (
    <div
      className="rounded-sm border flex flex-col"
      style={{
        background: "var(--color-surface-container)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div>
          <p
            className="font-mono text-xs tracking-[0.1em] uppercase mb-0.5"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            {t("dashboard.chart.label")}
          </p>
          <p className="font-sans text-base font-semibold" style={{ color: "var(--color-primary)" }}>
            {t("dashboard.chart.title")}
          </p>
        </div>

        <div className="flex items-center gap-1">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className="font-mono text-xs tracking-[0.08em] px-2.5 py-1 rounded-sm border transition-colors cursor-pointer"
              style={{
                color: range === r ? "var(--color-primary)" : "var(--color-on-surface-variant)",
                background: range === r ? "rgba(255,255,255,0.08)" : "transparent",
                borderColor: range === r ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)",
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Chart / Empty state */}
      <div className="flex-1 px-4 py-4">
        {isEmpty ? (
          <div
            className="h-36 flex flex-col items-center justify-center gap-2"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            <BarChart2 size={24} opacity={0.4} />
            <p className="font-mono text-xs tracking-[0.05em] text-center max-w-xs opacity-60">
              {t("dashboard.chart.empty")}
            </p>
          </div>
        ) : (
          <>
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full h-36"
              aria-label={t("dashboard.chart.aria")}
              role="img"
            >
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[25, 50, 75].map((pct) => {
                const y = 8 + (H - 16) - (pct / 100) * (H - 16);
                return (
                  <line
                    key={pct}
                    x1={8}
                    y1={y}
                    x2={W - 8}
                    y2={y}
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth={1}
                  />
                );
              })}

              {/* Area fill */}
              <polygon points={buildArea(data, W, H)} fill="url(#chartGrad)" />

              {/* Line */}
              <polyline
                points={buildPolyline(data, W, H)}
                fill="none"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth={1.5}
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {/* Last point dot */}
              {(() => {
                const last = data[data.length - 1];
                const x = W - 8;
                const y = 8 + (H - 16) - (last / 100) * (H - 16);
                return <circle cx={x} cy={y} r={3} fill="#ffffff" />;
              })()}
            </svg>

            {/* Y-axis labels */}
            <div className="flex justify-between mt-1 px-2">
              {["0%", "25%", "50%", "75%", "100%"].map((l) => (
                <span key={l} className="font-mono text-[10px]" style={{ color: "var(--color-on-surface-variant)" }}>
                  {l}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
