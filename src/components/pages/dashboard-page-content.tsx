"use client";

import { SimulationProvider } from "@/components/product/simulation-provider";
import { SimulationStatusBar } from "@/components/product/simulation-status-bar";
import { LiveCallInterface } from "@/components/product/live-call-interface";
import { PlatformCommandPanel } from "@/components/product/platform-command-panel";
import { CoachingInsightsPanel } from "@/components/product/coaching-insights-panel";
import { TeamPerformanceDashboard } from "@/components/product/team-performance-dashboard";
import { useSimulation } from "@/components/product/simulation-provider";

function DashboardContent() {
  const demo = useSimulation();

  return (
    <div className="space-y-10 sm:space-y-12">
      <header>
        <h1 className="font-display text-2xl font-black text-white sm:text-3xl md:text-4xl">
          מרכז פיקוד
        </h1>
        <p className="mt-3 text-sm text-white/45">
          סימולציית שיחה חיה · ניתוח AI · מאמן שטח
        </p>
      </header>

      <section id="simulations">
        <LiveCallInterface />
      </section>

      <SimulationStatusBar minimalTelemetry />

      <div className="grid gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <PlatformCommandPanel />
        </div>
        <div id="coaching" className="panel-surface border border-white/[0.06] p-4 sm:p-5">
          <CoachingInsightsPanel insights={demo.visibleInsights} />
        </div>
      </div>

      <section id="team">
        <TeamPerformanceDashboard />
      </section>
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
