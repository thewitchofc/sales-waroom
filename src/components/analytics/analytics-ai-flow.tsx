"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AI_ANALYSIS_STEPS } from "@/config/analytics-intelligence-data";

export function AnalyticsAiFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const [analyzing, setAnalyzing] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      setActiveStep((s) => (s + 1) % AI_ANALYSIS_STEPS.length);
      setAnalyzing(true);
      timeout = setTimeout(() => setAnalyzing(false), 1200);
    }, 4500);
    return () => {
      clearInterval(id);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="relative px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="relative mx-auto max-w-6xl">
        <p className="font-brand text-[10px] tracking-[0.2em] text-accent">זרימת ניתוח</p>
        <h2 className="mt-3 font-display text-2xl font-black text-white sm:text-3xl">
          AI מפרק את הפסיכולוגיה שלך בזמן אמת
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {AI_ANALYSIS_STEPS.map((step, i) => {
            const isActive = i === activeStep;
            return (
              <motion.div
                key={step.step}
                animate={{
                  opacity: isActive ? 1 : 0.45,
                  scale: isActive ? 1.02 : 1,
                }}
                transition={{ duration: 0.5 }}
                className={`analytics-flow-step relative border p-6 sm:p-8 ${
                  isActive
                    ? "border-accent/35 bg-accent/[0.03] glow-accent"
                    : "border-white/8 bg-black/50"
                }`}
              >
                {isActive && (
                  <div className="pointer-events-none absolute inset-0 ai-scan-line opacity-20" />
                )}
                <div className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-brand text-[10px] text-accent">{step.step}</span>
                    {isActive && analyzing && (
                      <motion.span
                        className="font-brand text-[8px] text-accent"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        AI מנתח...
                      </motion.span>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">{step.body}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {step.metrics.map((m) => (
                      <span
                        key={m}
                        className="border border-white/10 px-2 py-0.5 font-brand text-[8px] text-white/40"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, width: "0%" }}
            animate={{ opacity: 1, width: `${((activeStep + 1) / AI_ANALYSIS_STEPS.length) * 100}%` }}
            className="mt-8 h-0.5 bg-gradient-to-r from-accent/20 via-accent to-accent/20"
          />
        </AnimatePresence>
      </div>
    </section>
  );
}
