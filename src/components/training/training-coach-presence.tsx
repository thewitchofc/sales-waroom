"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COACH_COMMENTARY } from "@/config/training-combat-data";

interface TrainingCoachPresenceProps {
  active?: boolean;
  weakness?: string;
}

export function TrainingCoachPresence({
  active = true,
  weakness = "סמכות",
}: TrainingCoachPresenceProps) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setMsgIndex((i) => (i + 1) % COACH_COMMENTARY.length);
    }, 3200);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div className="training-coach-panel relative overflow-hidden border border-red-500/20 bg-red-500/[0.04] p-5 sm:p-6">
      <div className="pointer-events-none absolute inset-0 analytics-classified-scan opacity-30" />
      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <motion.span
              className="size-2 rounded-full bg-red-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="font-brand text-[9px] tracking-[0.15em] text-red-400">
              מאמן AI, מחובר
            </span>
          </div>
          <span className="font-brand text-[8px] text-white/30">
            סטטוס, פעיל
          </span>
        </div>

        <p className="mt-4 font-display text-lg font-bold text-white">
          המאמן צופה בשיחה. בזמן אמת.
        </p>

        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-3 text-sm text-white/60"
          >
            {COACH_COMMENTARY[msgIndex]}
          </motion.p>
        </AnimatePresence>

        {weakness && (
          <div className="mt-5 border border-red-500/15 bg-black/40 px-4 py-3">
            <p className="font-brand text-[8px] text-red-400/70">חולשה מזוהה</p>
            <p className="mt-1 text-sm font-semibold text-white">{weakness}</p>
            <p className="mt-2 font-brand text-[9px] text-accent">
              תיקון מומלץ נטען ←
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
