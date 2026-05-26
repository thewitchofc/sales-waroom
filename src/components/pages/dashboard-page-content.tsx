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
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-black text-white md:text-4xl">
            מרכז פיקוד
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            סימולציות חיות · ניתוח AI · ביצועי צוות
          </p>
        </div>
        <ActiveUsersBar />
      </div>

      <SimulationStatusBar />

      <section id="simulations">
        <LiveCallInterface />
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <PlatformCommandPanel />
        </div>
        <div className="space-y-6">
          <div id="analytics" className="glass-premium metallic-border p-5">
            <div className="mb-4 font-brand text-[10px] text-accent">LIVE SCORES</div>
            <ScoreMetersPanel
              confidence={demo.scores.confidence}
              objection={demo.scores.objection}
              pressure={demo.scores.pressure}
            />
          </div>
          <div id="coaching" className="glass-premium metallic-border p-5">
            <AICoachPanel
              feedback={demo.visibleFeedback.length > 0 ? demo.visibleFeedback : []}
            />
          </div>
          <div className="glass-premium metallic-border p-5">
            <CoachingInsightsPanel insights={demo.visibleInsights} />
          </div>
        </div>
      </div>

      <motion.section id="team" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
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
