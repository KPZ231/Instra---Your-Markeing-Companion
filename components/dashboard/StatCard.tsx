"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  delta: number;
  deltaLabel: string;
}

/**
 * KPI metric card for the dashboard stats row.
 * Shows a large value, a label, and a positive/negative delta indicator.
 *
 * @param label - Metric name (e.g. "Total Reach")
 * @param value - Formatted value string (e.g. "1.2M")
 * @param delta - Percentage change as a number (positive = up, negative = down)
 * @param deltaLabel - Human-readable delta context (e.g. "vs last week")
 * @example
 * <StatCard label="Total Reach" value="1.2M" delta={12.4} deltaLabel="vs last week" />
 */
export default function StatCard({ label, value, delta, deltaLabel }: StatCardProps) {
  const isPositive = delta >= 0;

  return (
    <motion.div
      className="rounded-sm p-5 flex flex-col gap-3 border group transition-colors"
      style={{
        background: "var(--color-surface-container)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
      whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
      transition={{ duration: 0.15 }}
    >
      <p
        className="font-mono text-xs tracking-[0.1em] uppercase"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        {label}
      </p>

      <p
        className="font-sans text-3xl font-semibold leading-none tracking-tight"
        style={{ color: "var(--color-primary)" }}
      >
        {value}
      </p>

      <div className="flex items-center gap-1.5">
        {isPositive ? (
          <TrendingUp size={12} style={{ color: "#00FF41" }} />
        ) : (
          <TrendingDown size={12} style={{ color: "var(--color-on-surface-variant)" }} />
        )}
        <span
          className="font-mono text-xs"
          style={{ color: isPositive ? "#00FF41" : "var(--color-on-surface-variant)" }}
        >
          {isPositive ? "+" : ""}{delta}%
        </span>
        <span
          className="font-mono text-xs"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          {deltaLabel}
        </span>
      </div>
    </motion.div>
  );
}
