"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PremiumEmptyState } from "@/components/ui/premium-empty-state";
import { cn } from "@/lib/utils";
import type { CoachingInsight } from "@/components/product/demo-data";

const priorityStyles = {
  high: "border-red-500/30 bg-red-500/5 text-red-400",
  medium: "border-accent/30 bg-accent/5 text-accent",
  low: "border-blue-400/30 bg-blue-500/5 text-blue-400",
};

export function CoachingInsightsPanel({ insights }: { insights: CoachingInsight[] }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-brand text-[10px] tracking-widest text-accent">
          PSYCH INTELLIGENCE
        </span>
        <motion.span
          className="text-[10px] text-red-400"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ● Authority · Frame · Pressure
        </motion.span>
      </div>

      <AnimatePresence initial={false}>
        {insights.length === 0 ? (
          <PremiumEmptyState
            status="PSYCH ENGINE"
            title="מנוע ניתוח פסיכולוגי פעיל"
            description="תובנות על frame dominance, emotional control, certainty ו-pressure response יופיעו כאן — חדות, ללא פילטר."
          />
        ) : (
          insights.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group border border-white/5 bg-black/40 p-4 transition-all hover:border-accent/20 hover:glow-accent"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-white">{item.category}</span>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "border px-2 py-0.5 text-[9px] font-brand",
                      priorityStyles[item.priority]
                    )}
                  >
                    {item.priority.toUpperCase()}
                  </span>
                  <span className="font-brand text-[9px] text-muted-foreground">
                    {item.time}
                  </span>
                </div>
              </div>
              <p className="mb-3 text-sm font-medium leading-relaxed text-white/80">{item.insight}</p>
              <div className="border border-red-500/10 bg-red-500/5 px-3 py-2">
                <span className="font-brand text-[9px] text-red-400">CORRECTION →</span>
                <p className="mt-1 text-xs leading-relaxed text-white/85">{item.action}</p>
              </div>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
}
