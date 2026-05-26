"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  BEHAVIOR_LABELS,
  type BehaviorMode,
} from "@/components/product/demo-data";

export function FrameControlIndicator({
  value,
  mode,
  compact = false,
}: {
  value: number;
  mode: BehaviorMode;
  compact?: boolean;
}) {
  const repDominance = value;
  const clientDominance = 100 - value;
  const behavior = BEHAVIOR_LABELS[mode];
  const isCritical = value < 40;

  return (
    <motion.div
      className={cn(
        "border bg-black/50",
        isCritical ? "border-red-500/30 bg-red-500/5" : "border-white/5",
        compact ? "p-3" : "p-4",
      )}
      animate={
        isCritical
          ? {
              boxShadow: [
                "0 0 0 rgba(239,68,68,0)",
                "0 0 16px rgba(239,68,68,0.12)",
                "0 0 0 rgba(239,68,68,0)",
              ],
            }
          : {}
      }
      transition={{ duration: 2.5, repeat: Infinity }}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="font-brand text-[9px] tracking-widest text-muted-foreground">
          שליטה בפריים
        </span>
        <div className="flex items-center gap-2">
          <span className={cn("font-brand text-[9px]", behavior.color)}>
            {behavior.label}
          </span>
          <motion.span
            className={cn(
              "font-display text-xl font-black",
              isCritical ? "text-red-400" : "text-white",
            )}
            key={value}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
          >
            {value}
          </motion.span>
        </div>
      </div>

      {!compact && (
        <p className="mb-3 text-xs text-white/55">
          {mode === "leading"
            ? "אתה מוביל את הפריים, הלקוח עוקב"
            : mode === "reactive"
              ? "הלקוח מוביל, אתה מגיב במקום לשלוט"
              : "מאזן פריים, הלקוח בודק סמכות"}
        </p>
      )}

      <div className="relative h-2.5 overflow-hidden bg-white/5">
        <motion.div
          className="absolute inset-y-0 start-0 bg-gradient-to-r from-green-500/80 to-accent/60"
          initial={{ width: 0 }}
          animate={{ width: `${repDominance}%` }}
          transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
        />
        <motion.div
          className="absolute inset-y-0 end-0 bg-gradient-to-l from-red-500/70 to-red-500/30"
          initial={{ width: 0 }}
          animate={{ width: `${clientDominance}%` }}
          transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
        />
        <div
          className="absolute inset-y-0 w-px bg-white/60"
          style={{ left: `${repDominance}%` }}
        />
      </div>

      <div className="mt-2 flex justify-between text-[9px] text-muted-foreground">
        <span>נציג, {repDominance}%</span>
        <span>לקוח, {clientDominance}%</span>
      </div>
    </motion.div>
  );
}

export function BehaviorModeBadge({ mode }: { mode: BehaviorMode }) {
  const behavior = BEHAVIOR_LABELS[mode];

  return (
    <span
      className={cn(
        "border px-2 py-0.5 font-brand text-[9px] tracking-wider",
        mode === "leading"
          ? "border-green-500/30 bg-green-500/10"
          : mode === "reactive"
            ? "border-red-500/30 bg-red-500/10"
            : "border-accent/30 bg-accent/10",
        behavior.color,
      )}
    >
      {behavior.label}
    </span>
  );
}
