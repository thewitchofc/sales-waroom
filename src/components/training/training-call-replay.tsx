"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TRAINING_REPLAY_EVENTS } from "@/config/training-combat-data";

const typeColors: Record<string, string> = {
  drop: "text-red-400",
  panic: "text-red-400",
  hesitation: "text-orange-300",
  recovery: "text-green-400",
  momentum: "text-accent",
};

export function TrainingCallReplay() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % TRAINING_REPLAY_EVENTS.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-12 border border-white/8 bg-black/40 p-6 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-brand text-[9px] tracking-[0.15em] text-accent">
            השמעת קרב
          </p>
          <h3 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
            AI משחזר את השיחה
          </h3>
        </div>
        <span className="flex items-center gap-2 font-brand text-[9px] text-red-400/80">
          <span className="pressure-pulse size-1.5 rounded-full bg-red-500" />
          ניתוח בזמן אמת
        </span>
      </div>

      <div className="space-y-0 border border-white/6">
        {TRAINING_REPLAY_EVENTS.map((ev, i) => {
          const active = i === activeIndex;
          const past = i < activeIndex;
          return (
            <motion.div
              key={ev.id}
              animate={{ opacity: past || active ? 1 : 0.35 }}
              className={`flex items-center gap-4 border-b border-white/5 px-5 py-4 last:border-b-0 sm:gap-6 sm:px-6 sm:py-5 ${
                active ? "bg-red-500/[0.04]" : ""
              }`}
            >
              <span
                className={`w-12 shrink-0 font-brand text-xs sm:w-14 ${
                  active ? "text-accent" : "text-white/30"
                }`}
                dir="ltr"
              >
                {ev.time}
              </span>
              <span className="text-white/20">. </span>
              <span
                className={`flex-1 text-sm font-medium sm:text-base ${
                  active ? typeColors[ev.type] : "text-white/50"
                }`}
              >
                {ev.label}
              </span>
              {active && (
                <motion.span
                  className="size-1.5 rounded-full bg-red-500"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
