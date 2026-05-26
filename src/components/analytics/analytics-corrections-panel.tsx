"use client";

import { motion } from "framer-motion";
import {
  ANALYTICS_CORRECTIONS,
  severityLabels,
  severityStyles,
} from "@/config/analytics-intelligence-data";

export function AnalyticsCorrectionsPanel() {
  return (
    <section className="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="pointer-events-none absolute inset-0 analytics-radar-glow opacity-60" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 border border-red-500/25 bg-red-500/5 px-3 py-1">
              <span className="pressure-pulse size-1.5 rounded-full bg-red-500" />
              <span className="font-brand text-[8px] tracking-[0.15em] text-red-400/90">
                סיווג · פעיל
              </span>
            </div>
            <h2 className="font-display text-3xl font-black text-white sm:text-4xl">
              תיקוני קרב · AI
            </h2>
            <p className="mt-4 max-w-lg text-sm text-white/45">
              כל חולשה מזוהה. כל תיקון מדורג. כל שיפור מדיד.
            </p>
          </div>
          <motion.span
            className="font-brand text-[9px] text-accent"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ● מאמן AI מחובר
          </motion.span>
        </div>

        <div className="space-y-6">
          {ANALYTICS_CORRECTIONS.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`analytics-correction-card relative overflow-hidden border p-6 sm:p-8 ${
                item.severity === "CRIT"
                  ? "border-red-500/30 bg-red-500/[0.04]"
                  : "border-white/8 bg-black/50"
              }`}
            >
              {item.severity === "CRIT" && (
                <div className="pointer-events-none absolute inset-0 analytics-classified-scan opacity-40" />
              )}

              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`border px-2 py-0.5 font-brand text-[8px] ${severityStyles[item.severity]}`}
                    >
                      {severityLabels[item.severity]}
                    </span>
                    <span className="font-brand text-[8px] text-white/30" dir="ltr">
                      {item.time}
                    </span>
                  </div>
                  <span className="font-brand text-[10px] text-green-400">
                    {item.confidenceDelta} אם מתוקן
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-bold text-white sm:text-2xl">
                  {item.behavior}
                </h3>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="border border-white/5 bg-black/40 p-4">
                    <p className="font-brand text-[8px] text-white/35">הסבר פסיכולוגי</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">
                      {item.psychology}
                    </p>
                  </div>
                  <div className="border border-red-500/15 bg-red-500/[0.04] p-4">
                    <p className="font-brand text-[8px] text-red-400/70">תיקון AI</p>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-white/85">
                      {item.correction}
                    </p>
                  </div>
                </div>

                <div className="mt-4 border border-accent/15 bg-accent/[0.03] px-4 py-3">
                  <p className="font-brand text-[8px] text-accent/70">תגובה משופרת</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">
                    {item.improvedResponse}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
