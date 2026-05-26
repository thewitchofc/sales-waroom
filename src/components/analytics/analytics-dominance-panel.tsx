"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { DOMINANCE_METRICS } from "@/config/analytics-intelligence-data";

export function AnalyticsDominancePanel() {
  return (
    <section className="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-brand text-[10px] tracking-[0.2em] text-accent">
              מדדי ביצוע
            </p>
            <h2 className="mt-3 font-display text-3xl font-black text-white sm:text-4xl">
              מדדי דומיננטיות
            </h2>
          </div>
          <p className="max-w-xs text-sm text-white/40 md:text-end">
            ציונים חיים. AI מודד כל חולשה. כל עלייה.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {DOMINANCE_METRICS.map((metric, i) => (
            <GlassCard
              key={metric.id}
              delay={i * 0.08}
              premium
              className="!p-6 sm:!p-8"
            >
              <p className="font-brand text-[8px] tracking-[0.12em] text-white/35">
                {metric.label}
              </p>
              <div className="mt-5 flex items-center gap-4">
                <div className="relative size-20 shrink-0">
                  <svg className="size-20 -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="1.5"
                    />
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="#d4af55"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray={`${metric.score} 100`}
                      initial={{ strokeDasharray: "0 100" }}
                      whileInView={{ strokeDasharray: `${metric.score} 100` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.08 }}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-display text-xl font-black text-white">
                    {metric.score}
                  </span>
                </div>
                <div>
                  {metric.trend && (
                    <span className="font-brand text-sm text-green-400">
                      {metric.trend}%
                    </span>
                  )}
                  <p className="mt-1 text-[10px] text-white/35">שבועי</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
