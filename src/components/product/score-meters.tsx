"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScoreMeterProps {
  label: string;
  value: number;
  max?: number;
  unit?: string;
  variant?: "confidence" | "objection" | "pressure";
  delay?: number;
}

const variantStyles = {
  confidence: {
    gradient: "from-green-500 via-accent to-accent",
    glow: "rgba(34,197,94,0.3)",
    label: "CONFIDENCE",
  },
  objection: {
    gradient: "from-accent-secondary via-accent to-accent",
    glow: "rgba(212,175,85,0.3)",
    label: "OBJECTION",
  },
  pressure: {
    gradient: "from-red-500 via-orange-500 to-accent",
    glow: "rgba(239,68,68,0.3)",
    label: "PRESSURE",
  },
};

export function ScoreMeter({
  label,
  value,
  max = 100,
  unit = "%",
  variant = "confidence",
  delay = 0,
}: ScoreMeterProps) {
  const pct = Math.min((value / max) * 100, 100);
  const style = variantStyles[variant];
  const isCritical = variant === "pressure" && value > 80;

  return (
    <motion.div
      className="border border-white/5 bg-black/40 p-4"
      animate={
        isCritical
          ? { boxShadow: ["0 0 0 rgba(239,68,68,0)", "0 0 20px rgba(239,68,68,0.15)", "0 0 0 rgba(239,68,68,0)"] }
          : {}
      }
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="font-brand text-[9px] tracking-widest text-muted-foreground">
          {style.label}
        </span>
        <motion.span
          className="font-display text-2xl font-black text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.5 }}
        >
          {value}
          <span className="text-sm font-normal text-muted-foreground">{unit}</span>
        </motion.span>
      </div>
      <p className="mb-3 text-xs text-white/60">{label}</p>
      <div className="relative h-2 overflow-hidden bg-white/5">
        <motion.div
          className={cn("absolute inset-y-0 end-0 bg-gradient-to-l", style.gradient)}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ boxShadow: `0 0 12px ${style.glow}` }}
        />
        <motion.div
          className="absolute inset-y-0 end-0 w-px bg-white/50"
          initial={{ right: "100%" }}
          animate={{ right: `${100 - pct}%` }}
          transition={{ duration: 1.2, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        />
      </div>
    </motion.div>
  );
}

export function ScoreMetersPanel({
  confidence,
  objection,
  pressure,
}: {
  confidence: number;
  objection: number;
  pressure: number;
}) {
  return (
    <div className="flex flex-col gap-3">
      <ScoreMeter label="ציון ביטחון בשיחה" value={confidence} variant="confidence" delay={0.1} />
      <ScoreMeter label="טיפול בהתנגדויות" value={objection} variant="objection" delay={0.2} />
      <ScoreMeter label="רמת לחץ בסימולציה" value={pressure} variant="pressure" delay={0.3} />
    </div>
  );
}
