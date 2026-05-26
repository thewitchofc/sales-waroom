"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { Waveform, VoiceUI } from "@/components/ui/waveform";
import { fadeUp } from "@/components/ui/section";
import { HudFrame } from "@/components/ui/hud-elements";
import { SectionAtmosphere } from "@/components/ui/cinematic-bg";
import { AIThinkingIndicator } from "@/components/product/ai-thinking-indicator";
import { PRESSURE_LEVELS } from "@/components/product/demo-data";

const voiceLines = [
  "לפני מחיר — מה העלות של לא לפתור את זה?",
  "אני לא מסביר. אני שואל. מה חייב להשתנות?",
  "אתה לא צריך לשכנע אותי. אתה צריך להחליט.",
];

const baseMetrics = [
  { label: "Certainty", base: 88, suffix: "%", status: "יציב", color: "text-green-400" },
  { label: "Tonality · Authority", base: 91, suffix: "", status: "Dominant", color: "text-accent" },
  { label: "Emotional Control", base: 94, suffix: "", status: "שליטה", color: "text-green-400" },
  { label: "Pressure Response", base: 76, suffix: "", status: "Under fire", color: "text-red-400", isEnergy: true },
];

export function VoiceTraining({ showHeader = true }: { showHeader?: boolean }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [metrics, setMetrics] = useState(baseMetrics.map((m) => m.base));

  useEffect(() => {
    const cycle = setInterval(() => {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setLineIndex((i) => (i + 1) % voiceLines.length);
        setMetrics((prev) =>
          prev.map((v, i) => v + (i === 0 ? 3 : i === 3 ? -2 : Math.floor(Math.random() * 3 - 1)))
        );
      }, 1200);
    }, 4500);
    return () => clearInterval(cycle);
  }, []);

  return (
    <Section id="voice" className="overflow-hidden" atmosphere>
      <SectionAtmosphere />
      {showHeader && (
        <SectionHeader
          label="VOICE TRAINING"
          title="Tonality · Certainty · Authority — תחת לחץ"
          description="ה-AI מזהה חולשה בקול לפני שהלקוח שומע אותה. לא feedback ידידותי — חשיפה פסיכולוגית."
        />
      )}

      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <GlassCard hover={false} premium className="relative overflow-hidden">
          <div className="ai-scan-line pointer-events-none absolute inset-0 opacity-10" />
          <HudFrame label="VOICE INTERFACE">
            <div className="relative flex flex-col items-center py-10">
              <VoiceUI active={!isAnalyzing} />

              <Waveform
                bars={52}
                intense={!isAnalyzing}
                active
                className="mb-8 mt-10 h-20 w-full max-w-lg"
              />

              <motion.div
                key={lineIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md border border-white/5 bg-black/50 p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <motion.span
                    className="font-brand text-[9px] text-green-400"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ● LIVE TRANSCRIPT
                  </motion.span>
                  <span className="text-[10px] text-muted-foreground">ניתוח שיחה בזמן אמת</span>
                </div>
                <p className="text-base leading-relaxed text-white/80">
                  &laquo;{voiceLines[lineIndex]}&raquo;
                </p>
              </motion.div>

              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 w-full max-w-md"
                >
                  <AIThinkingIndicator />
                </motion.div>
              )}

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {["Frame under pressure", "Dominant persona · CFO"].map((tag) => (
                  <span
                    key={tag}
                    className="border border-red-500/20 bg-red-500/5 px-3 py-1 text-[11px] text-red-400/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </HudFrame>
        </GlassCard>

        <div className="flex flex-col gap-5">
          {baseMetrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group os-panel-glow border border-white/5 bg-black/30 p-6 transition-all hover:border-accent/20 hover:glow-accent"
            >
              <div className="flex items-center justify-between">
                <span className={`font-brand text-xs ${metric.color}`}>{metric.status}</span>
                <div className="text-start">
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                  <motion.div
                    key={metrics[i]}
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    className="mt-1 font-display text-3xl font-bold text-white"
                  >
                    {metric.isEnergy ? "INTENSE" : `${metrics[i]}${metric.suffix}`}
                  </motion.div>
                </div>
              </div>
              {!metric.isEnergy && (
                <div className="mt-3 h-1 overflow-hidden bg-white/5">
                  <motion.div
                    className="h-full bg-gradient-to-l from-accent to-green-500"
                    animate={{ width: `${Math.min(metrics[i], 100)}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              )}
            </motion.div>
          ))}

          <GlassCard delay={0.4} premium>
            <div className="mb-2 font-brand text-[10px] text-red-400">PRESSURE SIMULATION</div>
            <h3 className="mb-4 font-display text-xl font-bold text-white">רמות לחץ פסיכולוגי</h3>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              מבסיסי — דרך עילית ואינטנסיבי — ועד COMBAT. קונים דומיננטיים
              שבודקים frame, authority ו-certainty. אין מקום לריאקטיביות.
            </p>
            <div className="flex flex-wrap gap-2">
              {PRESSURE_LEVELS.map((level) => (
                <span
                  key={level.code}
                  className={`px-3 py-1.5 text-xs font-semibold ${
                    level.id >= 4
                      ? "border border-red-500/30 bg-red-500/10 text-red-400"
                      : level.id === 3
                        ? "border border-accent/30 bg-accent/10 text-accent glow-accent"
                        : "border border-white/5 bg-white/[0.02] text-muted-foreground"
                  }`}
                  title={level.description}
                >
                  {level.label}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </Section>
  );
}
