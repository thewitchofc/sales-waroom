"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { Waveform, VoiceUI } from "@/components/ui/waveform";
import { fadeUp } from "@/components/ui/section";
import { HudFrame } from "@/components/ui/hud-elements";
import { SectionAtmosphere } from "@/components/ui/cinematic-bg";
import { AIThinkingIndicator } from "@/components/product/ai-thinking-indicator";
import { TrainingCoachPresence } from "@/components/training/training-coach-presence";
import { PRESSURE_LEVELS } from "@/components/product/demo-data";
import { TRAINING_SESSION } from "@/config/training-combat-data";

const voiceLines = [
  "לפני מחיר, מה העלות של לא לפתור את זה?",
  "אני לא מסביר. אני שואל. מה חייב להשתנות?",
  "אתה לא צריך לשכנע אותי. אתה צריך להחליט.",
];

const baseMetrics = [
  { id: "certainty", label: "ודאות", base: 88, suffix: "%", status: "יציב", color: "text-green-400" },
  { id: "tonality", label: "טון · סמכות", base: 91, suffix: "", status: "דומיננטי", color: "text-accent" },
  { id: "emotional", label: "שליטה רגשית", base: 94, suffix: "", status: "שליטה", color: "text-green-400" },
  { id: "pressure", label: "תגובה ללחץ", base: 76, suffix: "", status: "תחת אש", color: "text-red-400", isEnergy: true },
];

export function VoiceTraining({ showHeader = true }: { showHeader?: boolean }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [metrics, setMetrics] = useState(baseMetrics.map((m) => m.base));
  const [charIndex, setCharIndex] = useState(0);

  const currentLine = voiceLines[lineIndex];

  useEffect(() => {
    const cycle = setInterval(() => {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setLineIndex((i) => (i + 1) % voiceLines.length);
        setCharIndex(0);
        setMetrics((prev) =>
          prev.map((v, i) =>
            Math.max(40, Math.min(99, v + (i === 0 ? 3 : i === 3 ? -2 : Math.floor(Math.random() * 3 - 1))))
          )
        );
      }, 1200);
    }, 4500);
    return () => clearInterval(cycle);
  }, []);

  useEffect(() => {
    if (isAnalyzing) return;
    const id = setInterval(() => {
      setCharIndex((c) => (c >= currentLine.length ? c : c + 1));
    }, 35);
    return () => clearInterval(id);
  }, [currentLine, isAnalyzing]);

  return (
    <Section id="voice" className="overflow-hidden border-t border-white/5 py-20 sm:py-28 md:py-32" atmosphere>
      <SectionAtmosphere />
      <div className="pointer-events-none absolute inset-0 analytics-radar-glow opacity-50" />

      {showHeader && (
        <div className="mb-12 text-center">
          <p className="font-brand text-[10px] tracking-[0.2em] text-accent">אימון קולי</p>
          <h2 className="mt-4 font-display text-3xl font-black text-white sm:text-4xl">
            טון · ודאות · סמכות, תחת לחץ
          </h2>
        </div>
      )}

      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <GlassCard hover={false} premium className="relative overflow-hidden !p-0">
          <div className="ai-scan-line pointer-events-none absolute inset-0 opacity-15" />
          <HudFrame label="ממשק קולי · חי">
            <div className="relative flex flex-col items-center px-6 py-10 sm:px-8 sm:py-12">
              <div className="mb-6 flex w-full flex-wrap items-center justify-between gap-2">
                <span className="font-brand text-[9px] text-white/40">{TRAINING_SESSION.label}</span>
                <motion.span
                  className="flex items-center gap-1.5 font-brand text-[9px] text-red-400"
                  animate={{ opacity: [1, 0.35, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                >
                  <span className="pressure-pulse size-1.5 rounded-full bg-red-500" />
                  סשן חי פעיל
                </motion.span>
              </div>

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
                className="w-full max-w-md border border-white/8 bg-black/60 p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <motion.span
                    className="font-brand text-[9px] text-green-400"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ● תמלול חי
                  </motion.span>
                  <span className="text-[10px] text-white/35">ניתוח בזמן אמת</span>
                </div>
                <p className="min-h-[3rem] text-base leading-relaxed text-white/85">
                  &laquo;{currentLine.slice(0, charIndex)}
                  {charIndex < currentLine.length && (
                    <motion.span
                      className="inline-block w-0.5 bg-accent align-middle"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  )}
                  {charIndex >= currentLine.length && "»"}
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
                {["פריים תחת לחץ", "פרסונה דומיננטית · קונה סמכותי"].map((tag) => (
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

        <div className="flex flex-col gap-6">
          <TrainingCoachPresence active={!isAnalyzing} weakness="טון · ודאות" />

          {baseMetrics.map((metric, i) => (
            <motion.div
              key={metric.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative overflow-hidden border border-white/8 bg-black/40 p-6 transition-all hover:border-accent/20 hover:glow-accent sm:p-7"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-accent/[0.02] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative flex items-center gap-5">
                {!metric.isEnergy && (
                  <div className="relative size-16 shrink-0">
                    <svg className="size-16 -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                      <motion.circle
                        cx="18"
                        cy="18"
                        r="15"
                        fill="none"
                        stroke={metric.color.includes("red") ? "#ef4444" : "#d4af55"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray={`${metrics[i]} 100`}
                        animate={{ strokeDasharray: `${metrics[i]} 100` }}
                        transition={{ duration: 0.7 }}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center font-brand text-xs text-white">
                      {metrics[i]}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className={`font-brand text-[10px] ${metric.color}`}>{metric.status}</span>
                    <motion.span
                      key={metrics[i]}
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      className="font-brand text-[8px] text-white/30"
                    >
                      חי
                    </motion.span>
                  </div>
                  <div className="mt-1 text-sm text-white/45">{metric.label}</div>
                  <motion.div
                    key={metrics[i]}
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    className="mt-1 font-display text-3xl font-black text-white"
                  >
                    {metric.isEnergy ? "אינטנסיבי" : `${metrics[i]}${metric.suffix}`}
                  </motion.div>
                </div>
              </div>
              {!metric.isEnergy && (
                <div className="relative mt-4 h-1.5 overflow-hidden bg-white/5">
                  <motion.div
                    className="h-full bg-gradient-to-l from-accent via-green-500/80 to-accent"
                    animate={{ width: `${Math.min(metrics[i], 100)}%` }}
                    transition={{ duration: 0.6 }}
                    style={{ boxShadow: "0 0 12px rgba(212,175,85,0.3)" }}
                  />
                </div>
              )}
            </motion.div>
          ))}

          <GlassCard delay={0.4} premium className="!p-6 sm:!p-8">
            <div className="mb-2 font-brand text-[10px] text-red-400">סימולציית לחץ</div>
            <h3 className="mb-4 font-display text-xl font-bold text-white">רמות לחץ פסיכולוגי</h3>
            <p className="mb-6 text-sm leading-relaxed text-white/45">
              מבסיסי, דרך עילית ואינטנסיבי, ועד שטח. קונים דומיננטיים שבודקים פריים,
              סמכות וודאות. אין מקום לריאקטיביות.
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
                        : "border border-white/5 bg-white/[0.02] text-white/40"
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
