"use client";

import { motion } from "framer-motion";
import { PSYCHOLOGICAL_SIGNALS } from "@/config/analytics-intelligence-data";

const signalStyles: Record<string, string> = {
  fear: "border-red-500/25 text-red-400",
  hesitation: "border-orange-400/20 text-orange-300",
  collapse: "border-red-500/30 text-red-400",
  spike: "border-green-500/25 text-green-400",
  shift: "border-accent/25 text-accent",
};

export function AnalyticsPsychologicalBreakdown() {
  return (
    <section className="relative border-t border-white/5 px-5 py-20 sm:px-8 sm:py-32 lg:px-12">
      <div className="pointer-events-none absolute inset-0 command-grid opacity-[0.04]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 50% at 80% 30%, rgba(239,68,68,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="font-brand text-[10px] tracking-[0.2em] text-red-400/70">
              לוחמה פסיכולוגית
            </p>
            <h2 className="mt-4 font-display text-3xl font-black text-white sm:text-4xl">
              פירוק
              <span className="mt-1 block text-white/55">פסיכולוגי</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-white/45 sm:text-base">
              AI קורא את המוח שלך בשיחה. כל שינוי רגשי, כל סימן פחד, כל קריסת
              סמכות, מתועד.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="relative border border-white/8">
              <div className="absolute inset-y-0 start-8 w-px bg-white/10 sm:start-10" />
              {PSYCHOLOGICAL_SIGNALS.map((signal, i) => (
                <motion.div
                  key={signal.id}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="relative flex gap-6 border-b border-white/5 px-6 py-5 last:border-b-0 sm:gap-8 sm:px-10 sm:py-6"
                >
                  <span
                    className={`absolute start-6 top-1/2 size-2.5 -translate-y-1/2 rounded-full border-2 border-black sm:start-8 ${
                      signal.type === "spike"
                        ? "bg-green-500"
                        : signal.type === "fear" || signal.type === "collapse"
                          ? "bg-red-500"
                          : "bg-accent"
                    }`}
                  />
                  <span
                    className="w-12 shrink-0 font-brand text-xs text-white/40"
                    dir="ltr"
                  >
                    {signal.time}
                  </span>
                  <div className="flex-1">
                    <span
                      className={`inline-flex border px-2 py-0.5 font-brand text-[8px] ${signalStyles[signal.type]}`}
                    >
                      {signal.type === "fear"
                        ? "פחד"
                        : signal.type === "hesitation"
                          ? "היסוס"
                          : signal.type === "collapse"
                            ? "קריסה"
                            : signal.type === "spike"
                              ? "קפיצה"
                              : "שינוי"}
                    </span>
                    <p className="mt-3 font-display text-base font-semibold text-white/85 sm:text-lg">
                      {signal.signal}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
