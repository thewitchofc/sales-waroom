"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { fadeUp } from "@/components/ui/section";
import { SectionAtmosphere } from "@/components/ui/cinematic-bg";
import { ObjectionAnalysisPanel } from "@/components/product/objection-analysis-panel";
import { OBJECTION_SCENARIOS, type ObjectionScenario } from "@/components/product/demo-data";
import { Waveform } from "@/components/ui/waveform";
import { AIThinkingIndicator } from "@/components/product/ai-thinking-indicator";
import { TrainingCompetitionStrip } from "@/components/training/training-competition-strip";
import { TrainingCoachPresence } from "@/components/training/training-coach-presence";
import { TrainingCallReplay } from "@/components/training/training-call-replay";
import { SCENARIO_COMBAT_INTEL, PSYCHOLOGY_ALERTS } from "@/config/training-combat-data";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "פסיכולוגיית התנגדות",
    description: "כל התנגדות היא בדיקת פריים. AI חושף אם אתה מוביל או מגיב, לפני שהלקוח מרגיש.",
    icon: "01",
  },
  {
    title: "ניתוח סמכות",
    description: "טון, ודאות, שליטה רגשית. חולשה נחשפת בשנייה. לא אחרי שהעסקה מתה.",
    icon: "02",
  },
  {
    title: "פרסונות דומיננטיות",
    description: "CFO סקепטי, רכש עוין, יזם עייף. לקוחות ששולטים בפריים ומחפשים חולשה.",
    icon: "03",
  },
];

export function ObjectionSimulator({ showHeader = true }: { showHeader?: boolean }) {
  const [selected, setSelected] = useState<ObjectionScenario>(OBJECTION_SCENARIOS[0]);
  const [analyzing, setAnalyzing] = useState(false);
  const [responseScore, setResponseScore] = useState(92);

  const handleSelect = (scenario: ObjectionScenario) => {
    setAnalyzing(true);
    setSelected(scenario);
    setResponseScore(Math.max(40, 92 + scenario.scoreImpact));
    setTimeout(() => setAnalyzing(false), 1400);
  };

  const intel = SCENARIO_COMBAT_INTEL[selected.id];

  return (
    <Section id="simulator" atmosphere className="py-20 sm:py-28 md:py-32">
      <SectionAtmosphere />
      <div className="pointer-events-none absolute inset-0 command-grid opacity-[0.03]" />

      {showHeader && (
        <div className="mb-12 text-center">
          <p className="font-brand text-[10px] tracking-[0.2em] text-accent">סימולטור קרב</p>
          <h2 className="mt-4 font-display text-3xl font-black text-white sm:text-4xl">
            כל התנגדות היא בדיקת פריים
          </h2>
        </div>
      )}

      <TrainingCompetitionStrip />

      <div className="mb-8 flex flex-wrap gap-2">
        {PSYCHOLOGY_ALERTS.slice(0, 4).map((alert) => (
          <span
            key={alert.label}
            className={cn(
              "border px-2 py-1 font-brand text-[8px]",
              alert.severity === "CRIT"
                ? "border-red-500/30 bg-red-500/10 text-red-400"
                : alert.severity === "HIGH"
                  ? "border-red-500/20 bg-red-500/5 text-red-400/90"
                  : "border-accent/20 bg-accent/5 text-accent/80"
            )}
          >
            {alert.label}
          </span>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-2">
          <GlassCard hover={false} premium className="relative h-full overflow-hidden !p-6 sm:!p-8">
            <div className="ai-scan-line pointer-events-none absolute inset-0 opacity-15" />
            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <motion.span
                  className="flex items-center gap-2 font-brand text-[10px] text-red-400"
                  animate={{ opacity: [1, 0.35, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  <span className="pressure-pulse size-1.5 rounded-full bg-red-500" />
                  סימולציה חיה
                </motion.span>
                <span className="font-brand text-[10px] tracking-widest text-accent">
                  זרם התנגדויות
                </span>
              </div>

              <div className="mb-6 border border-white/8 bg-black/50 p-4">
                <Waveform bars={48} intense={analyzing || !analyzing} active className="h-14" />
              </div>

              <div className="flex flex-col gap-3">
                {OBJECTION_SCENARIOS.map((obj, i) => (
                  <motion.button
                    key={obj.id}
                    type="button"
                    onClick={() => handleSelect(obj)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    variants={fadeUp}
                    className={cn(
                      "group relative w-full overflow-hidden border p-5 text-start transition-all",
                      selected.id === obj.id
                        ? "border-red-500/35 bg-red-500/[0.04] glow-accent"
                        : "border-white/5 bg-black/40 hover:border-accent/25 hover:bg-white/[0.02]"
                    )}
                  >
                    <div className="absolute inset-y-0 start-0 w-px bg-gradient-to-b from-transparent via-red-500/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="flex items-start justify-between gap-4">
                      <p className="flex-1 text-base leading-relaxed text-white/85 group-hover:text-white">
                        &laquo;{obj.text}&raquo;
                      </p>
                      <div className="flex shrink-0 flex-col items-end gap-2">
                        <span className="border border-accent/20 bg-accent/5 px-2 py-0.5 text-xs text-accent">
                          {obj.type}
                        </span>
                        <span className="font-brand text-[9px] text-red-400/70">
                          {obj.severity}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border border-white/8 bg-black/40 p-5">
                <div className="flex-1 pe-4">
                  <p className="font-brand text-[8px] text-white/35">מדד דומיננטיות · תגובה</p>
                  <div className="mt-2 h-2 overflow-hidden bg-white/5">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={responseScore}
                        className="h-full bg-gradient-to-l from-red-500 via-accent to-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${responseScore}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </AnimatePresence>
                  </div>
                </div>
                <div className="text-start">
                  <motion.div
                    key={responseScore}
                    initial={{ scale: 1.15, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-display text-4xl font-black text-white"
                  >
                    {responseScore}
                  </motion.div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <ObjectionAnalysisPanel scenario={selected} combat />
            </motion.div>
          </AnimatePresence>

          {analyzing ? (
            <AIThinkingIndicator active />
          ) : (
            <TrainingCoachPresence weakness={intel?.threat} />
          )}
        </div>
      </div>

      <TrainingCallReplay />

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {features.map((feature, i) => (
          <GlassCard key={feature.title} delay={i * 0.1} premium className="!p-6 sm:!p-8">
            <div className="mb-4 font-brand text-2xl font-bold text-accent/30">{feature.icon}</div>
            <h3 className="mb-3 font-display text-xl font-bold text-white">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-white/45">{feature.description}</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
