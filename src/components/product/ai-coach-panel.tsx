"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { CoachFeedback } from "@/components/product/demo-data";
import { PremiumEmptyState } from "@/components/ui/premium-empty-state";

const typeStyles = {
  critical: {
    wrapper: "border-red-500/30 bg-red-500/5",
    title: "text-red-400",
  },
  warning: {
    wrapper: "border-accent/30 bg-accent/5",
    title: "text-accent",
  },
  success: {
    wrapper: "border-green-500/30 bg-green-500/5",
    title: "text-green-400",
  },
  info: {
    wrapper: "border-blue-400/30 bg-blue-500/5",
    title: "text-blue-400",
  },
};

export function AICoachPanel({ feedback }: { feedback: CoachFeedback[] }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-brand text-[10px] tracking-widest text-red-400">
          FIELD COACH
        </span>
        <motion.span
          className="text-[10px] text-red-400"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ● מנטר · לא מרגיע
        </motion.span>
      </div>

      {feedback.length === 0 ? (
        <PremiumEmptyState
          status="FIELD COACH ARMED"
          title="אין מקום לרכות בשיחה"
          description="משוב חד יופיע ברגע שתאבד פריים, certainty, או שליטה רגשית. ה-Coach לא יעודד, הוא יחשוף."
        />
      ) : (
        feedback.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className={cn(
              "border p-4 transition-all hover:glow-accent",
              typeStyles[item.type].wrapper
            )}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className={cn("text-xs font-bold", typeStyles[item.type].title)}>
                {item.title}
              </span>
              <span className="font-brand text-[9px] text-muted-foreground">{item.time}</span>
            </div>
            <p className="text-sm font-medium leading-relaxed text-white/85">{item.body}</p>
          </motion.div>
        ))
      )}
    </div>
  );
}
