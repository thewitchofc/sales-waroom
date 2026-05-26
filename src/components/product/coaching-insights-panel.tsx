"use client";

import { motion, AnimatePresence } from "framer-motion";
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
          AI INSIGHTS
        </span>
        <motion.span
          className="text-[10px] text-green-400"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ● מייצר תובנות
        </motion.span>
      </div>

      <AnimatePresence initial={false}>
        {insights.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-dashed border-white/10 p-6 text-center"
          >
            <motion.div
              className="mx-auto mb-3 flex gap-1 justify-center"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {[0, 1, 2].map((i) => (
                <div key={i} className="size-1.5 rounded-full bg-accent/50" />
              ))}
            </motion.div>
            <p className="text-sm text-muted-foreground">ממתין לניתוח שיחה...</p>
          </motion.div>
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
              <p className="mb-3 text-sm leading-relaxed text-white/75">{item.insight}</p>
              <div className="border border-accent/10 bg-accent/5 px-3 py-2">
                <span className="font-brand text-[9px] text-accent">ACTION →</span>
                <p className="mt-1 text-xs leading-relaxed text-white/80">{item.action}</p>
              </div>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
}
