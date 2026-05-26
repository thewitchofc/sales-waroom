"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const THINKING_STATES = [
  "מנתח שליטה בפריים...",
  "מזהה התנהגות ריאקטיבית...",
  "מודד ודאות וטונality...",
  "מעריך סמכות תחת לחץ...",
  "מייצר משוב פסיכולוגי חד...",
];

export function AIThinkingIndicator({ active = true }: { active?: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % THINKING_STATES.length);
    }, 1100);
    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      className="flex items-center gap-3 border border-red-500/20 bg-red-500/5 px-4 py-3"
    >
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="size-1.5 rounded-full bg-red-400"
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -3, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
      <div>
        <div className="font-brand text-[9px] text-red-400">
          ניתוח פסיכולוגי
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-sm text-white/75"
          >
            {THINKING_STATES[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
