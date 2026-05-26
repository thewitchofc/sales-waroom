"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  { label: "מפעילים באימון", key: "operators", base: 247, variance: 8 },
  { label: "שיחות חיות", key: "sessions", base: 38, variance: 5 },
  { label: "סימולציות היום", key: "simulations", base: 1842, variance: 40 },
];

export function ActiveUsersBar() {
  const [values, setValues] = useState(stats.map((s) => s.base));

  useEffect(() => {
    const interval = setInterval(() => {
      setValues(
        stats.map((s) =>
          s.base + Math.floor(Math.random() * s.variance * 2 - s.variance)
        )
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 flex flex-col gap-4 border border-white/5 bg-black/60 px-4 py-4 backdrop-blur-xl sm:mb-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:px-5"
    >
      <div className="flex items-center gap-3">
        <motion.span
          className="size-2 rounded-full bg-green-400"
          animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="font-brand text-[10px] tracking-widest text-green-400">
          PLATFORM LIVE
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-6 md:gap-10">
        {stats.map((stat, i) => (
          <div key={stat.key} className="flex items-center gap-3">
            <motion.span
              key={values[i]}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-xl font-bold text-white md:text-2xl"
            >
              {values[i].toLocaleString("he-IL")}
            </motion.span>
            <span className="text-xs text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="hidden items-center gap-2 md:flex">
        <span className="font-brand text-[9px] text-accent">+12</span>
        <span className="text-[10px] text-muted-foreground">בשעה האחרונה</span>
      </div>
    </motion.div>
  );
}

export function FloatingActiveStats() {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-4 end-0 glass-premium z-10 hidden border border-green-500/20 px-4 py-2 lg:block"
    >
      <div className="flex items-center gap-2">
        <motion.span
          className="size-1.5 rounded-full bg-green-400"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-xs text-green-400">247 מפעילים פעילים</span>
      </div>
    </motion.div>
  );
}
