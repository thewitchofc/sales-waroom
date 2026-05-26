"use client";

import { SimulationProvider } from "@/components/product/simulation-provider";
import { SimulationStatusBar } from "@/components/product/simulation-status-bar";
import { LiveCallInterface } from "@/components/product/live-call-interface";
import { PlatformCommandPanel } from "@/components/product/platform-command-panel";
import { ScoreMetersPanel } from "@/components/product/score-meters";
import { AICoachPanel } from "@/components/product/ai-coach-panel";
import { CoachingInsightsPanel } from "@/components/product/coaching-insights-panel";
import { TeamPerformanceDashboard } from "@/components/product/team-performance-dashboard";
import { ActiveUsersBar } from "@/components/product/active-users-bar";
import { useSimulation } from "@/components/product/simulation-provider";
import { motion } from "framer-motion";

function DashboardContent() {
  const demo = useSimulation();

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-4">
        <div>
          <h1 className="font-display text-2xl font-black text-white sm:text-3xl md:text-4xl">
            מרכז פיקוד
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Frame control · Authority · Pressure simulation · FIELD COACH
          </p>
        </div>
        <ActiveUsersBar />
      </div>

      <SimulationStatusBar />

      <section id="simulations" className="depth-elevated">
        <LiveCallInterface />
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <PlatformCommandPanel />
        </div>
        <div className="space-y-4 sm:space-y-6">
          <div id="analytics" className="glass-premium glass-shimmer metallic-border os-panel-glow p-4 sm:p-5">
            <div className="mb-4 font-brand text-[10px] text-accent">PSYCH METRICS</div>
            <ScoreMetersPanel scores={demo.scores} behaviorMode={demo.behaviorMode} />
          </div>
          <div id="coaching" className="glass-premium glass-shimmer metallic-border os-panel-glow p-4 sm:p-5">
            <AICoachPanel feedback={demo.visibleFeedback} />
          </div>
          <div className="glass-premium glass-shimmer metallic-border os-panel-glow p-4 sm:p-5">
            <CoachingInsightsPanel insights={demo.visibleInsights} />
          </div>
        </div>
      </div>

      <motion.section
        id="team"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
      >
        <TeamPerformanceDashboard />
      </motion.section>
    </div>
  );
}

export function DashboardPageContent() {
  return (
    <SimulationProvider>
      <DashboardContent />
    </SimulationProvider>
  );
}
