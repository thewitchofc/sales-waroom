"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ANALYTICS_SESSION } from "@/config/analytics-intelligence-data";

const hudSignals = [
  { label: "סשן", value: ANALYTICS_SESSION.label, mono: true },
  { label: "סטטוס", value: "ניתוח חי פעיל", pulse: true },
  { label: "AI", value: "מאמן AI מחובר", pulse: true },
  { label: "קול", value: "דפוס קולי זוהה", mono: true },
];

export function AnalyticsLiveHud() {
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setScanLine((v) => (v + 1) % 100), 80);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative border-b border-white/5 px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
      <div className="pointer-events-none absolute inset-0 ai-scan-line opacity-30" />
      <div
        className="pointer-events-none absolute inset-0 analytics-radar-glow"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-5 flex items-center gap-2">
          <span className="pressure-pulse size-1.5 rounded-full bg-red-500/80" />
          <span className="font-brand text-[9px] tracking-[0.2em] text-red-400/80">
            מרכז מודיעין AI · פעיל
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {hudSignals.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="analytics-hud-cell relative border border-white/8 bg-black/70 px-4 py-4"
            >
              <p className="font-brand text-[8px] tracking-[0.15em] text-white/35">
                {item.label}
              </p>
              <p
                className={`mt-2 font-display text-sm font-bold text-white sm:text-base ${
                  item.mono ? "font-brand tracking-wider" : ""
                }`}
                dir={item.mono ? "ltr" : undefined}
              >
                {item.value}
              </p>
              {item.pulse && (
                <span className="absolute end-3 top-3 size-1.5 rounded-full bg-accent pressure-pulse" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="relative mt-4 h-px overflow-hidden bg-white/5">
          <motion.div
            className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-accent/60 to-transparent"
            style={{ insetInlineStart: `${scanLine}%` }}
          />
        </div>
      </div>
    </section>
  );
}
