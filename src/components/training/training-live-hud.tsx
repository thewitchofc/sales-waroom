"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  TRAINING_LIVE_SIGNALS,
  TRAINING_SESSION,
} from "@/config/training-combat-data";

export function TrainingLiveHud() {
  const [scan, setScan] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setScan((v) => (v + 2) % 100), 60);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative border-b border-white/5 px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
      <div className="pointer-events-none absolute inset-0 ai-scan-line opacity-25" />
      <div className="pointer-events-none absolute inset-0 analytics-radar-glow" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="pressure-pulse size-1.5 rounded-full bg-red-500" />
            <span className="font-brand text-[9px] tracking-[0.2em] text-red-400/80">
              סימולטור קרב פסיכולוגי · {TRAINING_SESSION.label}
            </span>
          </div>
          <motion.span
            className="font-brand text-[8px] text-accent"
            animate={{ opacity: [1, 0.35, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            ● ניתוח חי פעיל
          </motion.span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TRAINING_LIVE_SIGNALS.map((sig, i) => (
            <motion.div
              key={sig.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="analytics-hud-cell relative border border-white/8 bg-black/70 px-4 py-4"
            >
              <p className="font-brand text-[8px] tracking-[0.12em] text-white/35">{sig.label}</p>
              <p className="mt-2 text-sm font-semibold text-white">{sig.value}</p>
              {sig.pulse && (
                <span className="absolute end-3 top-3 size-1.5 rounded-full bg-accent pressure-pulse" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="relative mt-4 h-px overflow-hidden bg-white/5">
          <motion.div
            className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
            style={{ insetInlineStart: `${scan}%` }}
          />
        </div>
      </div>
    </section>
  );
}
