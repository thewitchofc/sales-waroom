"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { fadeUp } from "@/components/ui/section";
import { SectionAtmosphere } from "@/components/ui/cinematic-bg";
import { ObjectionAnalysisPanel } from "@/components/product/objection-analysis-panel";
import { OBJECTION_SCENARIOS, type ObjectionScenario } from "@/components/product/demo-data";
import { Waveform } from "@/components/ui/waveform";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "טיפול בהתנגדויות",
    description: "200+ התנגדויות מהשטח. AI שמתאים קושי בזמן אמת לפי הביצועים שלכם.",
    icon: "01",
  },
  {
    title: "ניתוח ביטחון בשיחה",
    description: "טון, קצב, היסוס — כל סימני החולשה נחשפים לפני שהלקוח מרגיש אותם.",
    icon: "02",
  },
  {
    title: "שיחות AI בזמן אמת",
    description: "דיאלוגים דינמיים ללא תסריט. כל שיחה שונה. כל סגירה אמיתית.",
    icon: "03",
  },
];

export function ObjectionSimulator() {
  const [selected, setSelected] = useState<ObjectionScenario>(OBJECTION_SCENARIOS[0]);
  const [analyzing, setAnalyzing] = useState(false);
  const [responseScore, setResponseScore] = useState(92);

  const handleSelect = (scenario: ObjectionScenario) => {
    setAnalyzing(true);
    setSelected(scenario);
    setResponseScore(Math.max(40, 92 + scenario.scoreImpact));
    setTimeout(() => setAnalyzing(false), 1400);
  };

  return (
    <Section id="simulator" atmosphere>
      <SectionAtmosphere />
      <SectionHeader
        label="OBJECTION SIMULATOR"
        title="אתגרו כל התנגדות לפני שהיא הורגת עסקה"
        description="לחצו על התנגדות — ה-AI מנתח, מדרג, ומציע תגובה. בזמן אמת."
      />

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <GlassCard hover={false} premium className="h-full">
            <div className="mb-6 flex items-center justify-between">
              <motion.span
                className="flex items-center gap-2 font-brand text-[10px] text-green-400"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="size-1.5 rounded-full bg-green-400" />
                SIMULATION ACTIVE
              </motion.span>
              <span className="font-brand text-[10px] tracking-widest text-accent">
                OBJECTION STREAM
              </span>
            </div>

            <div className="mb-6 border border-white/5 bg-black/40 p-3">
              <Waveform bars={48} intense={analyzing} active className="h-12" />
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
                      ? "border-accent/40 bg-accent/5 glow-accent"
                      : "border-white/5 bg-black/40 hover:border-accent/25 hover:bg-white/[0.02]"
                  )}
                >
                  <div className="absolute inset-y-0 start-0 w-px bg-gradient-to-b from-transparent via-accent/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
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

            <div className="mt-6 flex items-center justify-between border border-white/5 bg-black/30 p-5">
              <div className="h-1.5 w-40 overflow-hidden bg-white/5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={responseScore}
                    className="h-full bg-gradient-to-l from-accent via-accent-secondary to-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${responseScore}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </AnimatePresence>
              </div>
              <div className="text-start">
                <div className="text-xs text-muted-foreground">ציון תגובה AI</div>
                <motion.div
                  key={responseScore}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-display text-3xl font-bold text-white"
                >
                  {responseScore}
                </motion.div>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <ObjectionAnalysisPanel scenario={selected} />
            </motion.div>
          </AnimatePresence>

          {analyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 flex items-center gap-3 border border-accent/20 bg-accent/5 px-4 py-3"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="size-1.5 rounded-full bg-accent"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
              <span className="text-sm text-white/70">מנתח התנגדות ומייצר תגובה מומלצת...</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {features.map((feature, i) => (
          <GlassCard key={feature.title} delay={i * 0.1} premium>
            <div className="mb-4 font-brand text-2xl font-bold text-accent/30">{feature.icon}</div>
            <h3 className="mb-3 font-display text-xl font-bold text-white">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
