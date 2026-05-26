"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { STAT_LABELS, type BattleStats } from "@/config/arena-data";

export function BattleStatsGrid({
  stats,
  animated = true,
  compact = false,
}: {
  stats: BattleStats;
  animated?: boolean;
  compact?: boolean;
}) {
  const entries = Object.entries(stats) as [keyof BattleStats, number][];

  if (compact) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map(([key, value], i) => {
          const label = STAT_LABELS[key];
          const isLow = value < 75;
          const isHigh = value >= 90;

          return (
            <div
              key={key}
              className="border-b border-white/5 pb-3 last:border-0"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-xs text-white/40">{label.labelHe}</span>
                <span
                  className={cn(
                    "font-display text-xl font-black",
                    isLow
                      ? "text-red-400"
                      : isHigh
                        ? "text-green-400"
                        : "text-white",
                  )}
                >
                  {value}
                </span>
              </div>
              <div className="mt-2 h-1 overflow-hidden bg-white/5">
                <motion.div
                  className={cn(
                    "h-full",
                    isLow
                      ? "bg-red-500/70"
                      : isHigh
                        ? "bg-green-500/70"
                        : "bg-accent/60",
                  )}
                  initial={animated ? { width: 0 } : false}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 0.8, delay: i * 0.04 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map(([key, value], i) => {
        const label = STAT_LABELS[key];
        const isLow = value < 75;
        const isHigh = value >= 90;

        return (
          <motion.div
            key={key}
            initial={animated ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={cn(
              "border bg-black/50 p-4",
              isLow
                ? "border-red-500/20"
                : isHigh
                  ? "border-green-500/20"
                  : "border-white/5",
            )}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-brand text-[9px] text-muted-foreground">
                {label.labelHe}
              </span>
              <motion.span
                key={value}
                className={cn(
                  "font-display text-2xl font-black",
                  isLow
                    ? "text-red-400"
                    : isHigh
                      ? "text-green-400"
                      : "text-white",
                )}
              >
                {value}
              </motion.span>
            </div>
            <div className="h-1.5 overflow-hidden bg-white/5">
              <motion.div
                className={cn(
                  "h-full bg-gradient-to-l",
                  isLow
                    ? "from-red-500 to-orange-500"
                    : isHigh
                      ? "from-green-500 to-accent"
                      : "from-accent to-accent-secondary",
                )}
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1, delay: i * 0.05 }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function PressureLevelVisual({
  level,
  max = 5,
}: {
  level: number;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: max }).map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            "h-8 flex-1 border",
            i < level
              ? level >= 4
                ? "border-red-500/50 bg-red-500/30"
                : "border-accent/40 bg-accent/20"
              : "border-white/5 bg-white/[0.02]",
          )}
          animate={i < level && level >= 4 ? { opacity: [0.6, 1, 0.6] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
      <span className="font-brand text-[10px] text-red-400">ר{level}</span>
    </div>
  );
}
