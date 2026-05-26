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

const voiceLines = [
  "אני מבין שתקציב הוא נושא רגיש...",
  "לפני שנדבר על מחיר — מה העלות של לא לפתור את הבעיה?",
  "לקוחותינו רואים ROI כבר ב-90 הימים הראשונים.",
];

const baseMetrics = [
  { label: "מילים/דקה", base: 142, suffix: "", status: "אופטימלי", color: "text-green-400" },
  { label: "מילות מילוי", base: 2, suffix: "", status: "נמוך", color: "text-green-400" },
  { label: "שיעור הפסקות", base: 8, suffix: "%", status: "טוב", color: "text-accent" },
  { label: "אנרגיה", base: 94, suffix: "", status: "שיא", color: "text-red-400", isEnergy: true },
];

export function VoiceTraining() {
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
      <SectionHeader
        label="VOICE TRAINING"
        title="אימון קולי שקורא את הביטחון שלכם"
        description="דברו בטבעיות. ה-AI מנתח טון, קצב, מילות מילוי ותהודה רגשית — משוב מיידי על כל מילה."
      />

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
                {["AI מזהה חולשות בסגירה", "סימולציית לקוח קשה"].map((tag) => (
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
                    {metric.isEnergy ? "גבוהה" : `${metrics[i]}${metric.suffix}`}
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
            <div className="mb-2 font-brand text-[10px] text-accent">ADAPTIVE PRESSURE</div>
            <h3 className="mb-4 font-display text-xl font-bold text-white">קושי אדפטיבי</h3>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              ה-AI מעלה לחץ ככל שאתם משתפרים. מלקוחות ידידותיים — דרך C-suite
              סקепטיים — ועד שיחות ועדה רב-משתתפים.
            </p>
            <div className="flex flex-wrap gap-2">
              {["מתחיל", "מתקדם", "עילית"].map((level, idx) => (
                <span
                  key={level}
                  className={`px-4 py-1.5 text-xs font-semibold ${
                    idx === 2
                      ? "border border-accent/30 bg-accent/10 text-accent glow-accent"
                      : "border border-white/5 bg-white/[0.02] text-muted-foreground"
                  }`}
                >
                  {level}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </Section>
  );
}
