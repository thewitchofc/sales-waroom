"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PsychologyScores, BehaviorMode } from "@/components/product/demo-data";
import {
  FrameControlIndicator,
  BehaviorModeBadge,
} from "@/components/product/frame-control-indicator";

interface ScoreMeterProps {
  label: string;
  value: number;
  max?: number;
  unit?: string;
  variant:
    | "confidence"
    | "objection"
    | "pressure"
    | "frameControl"
    | "authority"
    | "certainty";
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
  frameControl: {
    gradient: "from-purple-500 via-accent to-green-500",
    glow: "rgba(168,85,247,0.25)",
    label: "FRAME",
  },
  authority: {
    gradient: "from-accent via-yellow-500 to-accent-secondary",
    glow: "rgba(212,175,85,0.35)",
    label: "AUTHORITY",
  },
  certainty: {
    gradient: "from-blue-400 via-green-400 to-accent",
    glow: "rgba(96,165,250,0.25)",
    label: "CERTAINTY",
  },
};

function ScoreMeter({
  label,
  value,
  max = 100,
  unit = "%",
  variant,
  delay = 0,
}: ScoreMeterProps) {
  const pct = Math.min((value / max) * 100, 100);
  const style = variantStyles[variant];
  const isCritical =
    (variant === "pressure" && value > 80) ||
    (["frameControl", "authority", "certainty", "confidence"].includes(variant) &&
      value < 45);

  return (
    <motion.div
      className={cn(
        "border bg-black/40 p-4",
        isCritical ? "border-red-500/20" : "border-white/5"
      )}
      animate={
        isCritical
          ? {
              boxShadow: [
                "0 0 0 rgba(239,68,68,0)",
                "0 0 20px rgba(239,68,68,0.12)",
                "0 0 0 rgba(239,68,68,0)",
              ],
            }
          : {}
      }
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="font-brand text-[9px] tracking-widest text-muted-foreground">
          {style.label}
        </span>
        <motion.span
          className={cn(
            "font-display text-2xl font-black",
            isCritical && variant !== "pressure" ? "text-red-400" : "text-white"
          )}
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
      </div>
    </motion.div>
  );
}

export function ScoreMetersPanel({
  scores,
  behaviorMode = "leading",
}: {
  scores: PsychologyScores;
  behaviorMode?: BehaviorMode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <FrameControlIndicator value={scores.frameControl} mode={behaviorMode} />
      <div className="flex items-center justify-between border border-white/5 bg-black/30 px-3 py-2">
        <span className="font-brand text-[9px] text-muted-foreground">BEHAVIOR MODE</span>
        <BehaviorModeBadge mode={behaviorMode} />
      </div>
      <ScoreMeter label="סמכות בשיחה · Authority" value={scores.authority} variant="authority" delay={0.05} />
      <ScoreMeter label="רמת Certainty · ביטחון פסיכולוגי" value={scores.certainty} variant="certainty" delay={0.1} />
      <ScoreMeter label="ביטחון קולי · Confidence" value={scores.confidence} variant="confidence" delay={0.15} />
      <ScoreMeter label="טיפול בהתנגדויות" value={scores.objection} variant="objection" delay={0.2} />
      <ScoreMeter label="לחץ פסיכולוגי · Pressure" value={scores.pressure} variant="pressure" delay={0.25} />
    </div>
  );
}
