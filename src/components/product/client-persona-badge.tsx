"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type {
  ClientPersona,
  PressureLevel,
} from "@/components/product/demo-data";

const dominanceStyles = {
  HIGH: "border-red-500/30 bg-red-500/10 text-red-400",
  CRIT: "border-red-500/50 bg-red-500/15 text-red-500",
};

const dominanceLabels = {
  HIGH: "גבוה",
  CRIT: "קריטי",
};

export function ClientPersonaBadge({ persona }: { persona: ClientPersona }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="border border-white/10 bg-black/60 px-3 py-1.5">
        <div className="font-brand text-[8px] tracking-widest text-muted-foreground">
          פרסונה דומיננטית
        </div>
        <div className="text-xs font-semibold text-white">{persona.name}</div>
      </div>
      <span
        className={cn(
          "border px-2 py-1 font-brand text-[9px]",
          dominanceStyles[persona.dominance],
        )}
      >
        {dominanceLabels[persona.dominance]}
      </span>
    </div>
  );
}

export function PressureLevelBadge({ level }: { level: PressureLevel }) {
  const isIntense = level.id >= 4;

  return (
    <motion.div
      className={cn(
        "border px-3 py-1.5",
        isIntense
          ? "border-red-500/30 bg-red-500/10"
          : "border-accent/20 bg-accent/5",
      )}
      animate={
        isIntense
          ? {
              boxShadow: [
                "0 0 0 rgba(239,68,68,0)",
                "0 0 12px rgba(239,68,68,0.15)",
                "0 0 0 rgba(239,68,68,0)",
              ],
            }
          : {}
      }
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="font-brand text-[8px] text-muted-foreground">לחץ</div>
      <div
        className={cn(
          "text-xs font-bold",
          isIntense ? "text-red-400" : "text-accent",
        )}
      >
        {level.label}
      </div>
    </motion.div>
  );
}

export function PersonaTraits({ persona }: { persona: ClientPersona }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {persona.traits.map((trait) => (
        <span
          key={trait}
          className="border border-white/5 bg-white/[0.02] px-2 py-0.5 text-[10px] text-white/50"
        >
          {trait}
        </span>
      ))}
    </div>
  );
}
