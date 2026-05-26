"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const THINKING_STATES = [
  "מנתח תגובה...",
  "מזהה דפוס התנגדות...",
  "מייצר משוב מותאם...",
  "מעריך רמת לחץ...",
];

export function AIThinkingIndicator({ active = true }: { active?: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % THINKING_STATES.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      className="flex items-center gap-3 border border-accent/20 bg-accent/5 px-4 py-3"
    >
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="size-1.5 rounded-full bg-accent"
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -3, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
      <div>
        <div className="font-brand text-[9px] text-accent">AI PROCESSING</div>
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-sm text-white/70"
          >
            {THINKING_STATES[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
