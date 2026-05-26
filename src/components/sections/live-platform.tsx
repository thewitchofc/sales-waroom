"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { SectionAtmosphere } from "@/components/ui/cinematic-bg";
import { SimulationProvider } from "@/components/product/simulation-provider";
import { SimulationStatusBar } from "@/components/product/simulation-status-bar";
import { LiveCallInterface } from "@/components/product/live-call-interface";
import { PlatformCommandPanel } from "@/components/product/platform-command-panel";
import { ActiveUsersBar } from "@/components/product/active-users-bar";
import { ScoreMetersPanel } from "@/components/product/score-meters";
import { AICoachPanel } from "@/components/product/ai-coach-panel";
import { CoachingInsightsPanel } from "@/components/product/coaching-insights-panel";
import { TeamPerformanceDashboard } from "@/components/product/team-performance-dashboard";
import { FloatingAnalyticsWidgets } from "@/components/product/floating-analytics-widgets";
import { useSimulation } from "@/components/product/simulation-provider";

const performanceMetrics = [
  { label: "Frame Dominance", value: "68%", trend: "-12%" },
  { label: "Authority Score", value: "74", trend: "+9" },
  { label: "Reactive Sessions", value: "23%", trend: "-6%" },
  { label: "Certainty Under Pressure", value: "61", trend: "+14" },
];

function LivePlatformContent() {
  const demo = useSimulation();

  return (
    <>
      <SimulationStatusBar />
      <ActiveUsersBar />

      <div className="relative pb-8">
        <FloatingAnalyticsWidgets />
        <LiveCallInterface />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {performanceMetrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group os-panel-glow border border-white/5 bg-black/50 p-5 transition-all hover:border-accent/20 hover:glow-accent"
          >
            <div className="mb-2 text-xs text-muted-foreground">{metric.label}</div>
            <div className="flex items-end justify-between">
              <span className="font-display text-3xl font-black text-white">
                {metric.value}
              </span>
              <span className="font-brand text-xs text-green-400">{metric.trend}</span>
            </div>
            <div className="mt-3 h-px w-full bg-gradient-to-l from-accent/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
        <PlatformCommandPanel />

        <div className="flex min-h-[520px] flex-col gap-5">
          <div className="glass-premium metallic-border os-panel-glow flex-1 p-5 md:p-6">
            <div className="mb-5 font-brand text-[10px] tracking-widest text-accent">
              PSYCH METRICS
            </div>
            <ScoreMetersPanel scores={demo.scores} behaviorMode={demo.behaviorMode} />
          </div>

          <div className="glass-premium metallic-border os-panel-glow flex-[1.2] p-5 md:p-6">
            <AICoachPanel feedback={demo.visibleFeedback} />
          </div>

          <div className="glass-premium metallic-border os-panel-glow flex-[1.4] p-5 md:p-6">
            <CoachingInsightsPanel insights={demo.visibleInsights} />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12"
      >
        <TeamPerformanceDashboard />
      </motion.div>
    </>
  );
}

export function LivePlatform({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <Section id="live-demo" className="overflow-hidden" atmosphere>
      <SectionAtmosphere />

      {showHeader && (
        <SectionHeader
          label="COMMAND CENTER"
          title="מערכת אימון פסיכולוגית לקלוזרים עילית"
          description="שליטה בפריים, סמכות, certainty ו-pressure response — ניתוח חד בזמן אמת. לא מוטיבציה. אימון."
        />
      )}

      <SimulationProvider>
        <LivePlatformContent />
      </SimulationProvider>
    </Section>
  );
}
