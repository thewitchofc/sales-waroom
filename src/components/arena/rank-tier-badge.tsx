"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getTierConfig, type RankTier } from "@/config/arena-data";

export function RankTierBadge({
  tier,
  size = "md",
  plain = false,
}: {
  tier: RankTier;
  size?: "sm" | "md" | "lg";
  plain?: boolean;
}) {
  const config = getTierConfig(tier);

  if (plain) {
    return (
      <span className={cn("text-xs text-white/40", config.color)}>
        {config.labelHe}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border font-brand tracking-wider",
        config.border,
        config.color,
        size === "sm" && "px-2 py-0.5 text-[8px]",
        size === "md" && "px-2.5 py-1 text-[9px]",
        size === "lg" && "px-3 py-1.5 text-[10px]"
      )}
      style={{ boxShadow: `0 0 12px ${config.glow}` }}
    >
      {config.labelHe}
    </span>
  );
}

export function RankMovement({ delta }: { delta: number }) {
  if (delta === 0) {
    return <span className="font-brand text-[10px] text-muted-foreground">-</span>;
  }
  const up = delta > 0;
  return (
    <motion.span
      initial={{ opacity: 0, y: up ? 4 : -4 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "font-brand text-[10px] font-bold",
        up ? "text-green-400" : "text-red-400"
      )}
    >
      {up ? "▲" : "▼"} {Math.abs(delta)}
    </motion.span>
  );
}

export function LiveIndicator({ label = "חי" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <motion.span
        className="size-1.5 rounded-full bg-red-500"
        animate={{ opacity: [1, 0.2, 1], scale: [1, 1.4, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      <span className="font-brand text-[9px] text-red-400">{label}</span>
    </span>
  );
}
