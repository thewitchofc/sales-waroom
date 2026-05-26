"use client";

import { motion } from "framer-motion";

interface TacticalSignalProps {
  active?: boolean;
  intense?: boolean;
  className?: string;
}

/** Minimal signal bars — not a full waveform. For secondary telemetry only. */
export function TacticalSignalBars({
  active = true,
  intense = false,
  className = "",
}: TacticalSignalProps) {
  const heights = intense ? [0.35, 0.65, 0.5, 0.8, 0.45] : [0.25, 0.4, 0.3, 0.5, 0.35];

  return (
    <div className={`flex h-4 items-end gap-0.5 ${className}`} aria-hidden>
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-accent/50"
          animate={
            active
              ? {
                  height: [`${h * 100}%`, `${Math.min(h + 0.25, 1) * 100}%`, `${h * 100}%`],
                  opacity: [0.5, 1, 0.5],
                }
              : { height: `${h * 35}%`, opacity: 0.25 }
          }
          transition={{
            duration: intense ? 0.9 : 1.4,
            repeat: Infinity,
            delay: i * 0.08,
          }}
        />
      ))}
    </div>
  );
}

export function TacticalStatusChip({
  label,
  active = true,
  variant = "default",
}: {
  label: string;
  active?: boolean;
  variant?: "default" | "accent" | "danger";
}) {
  const colors = {
    default: "border-white/10 text-white/45",
    accent: "border-accent/20 text-accent/80",
    danger: "border-red-500/20 text-red-400/80",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 border bg-black/40 px-2 py-1 font-brand text-[8px] tracking-wide ${colors[variant]}`}
    >
      <span
        className={`size-1 rounded-full ${
          active
            ? variant === "danger"
              ? "bg-red-500 pressure-pulse"
              : "bg-accent pressure-pulse"
            : "bg-white/20"
        }`}
      />
      {label}
    </span>
  );
}

export function TacticalScanLine({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-px overflow-hidden bg-white/5 ${className}`}>
      <motion.div
        className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        animate={{ x: ["-100%", "400%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
