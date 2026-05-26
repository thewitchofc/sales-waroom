"use client";

import { SimulationProvider } from "@/components/product/simulation-provider";
import { LiveCallInterface } from "@/components/product/live-call-interface";
import { CoachingInsightsPanel } from "@/components/product/coaching-insights-panel";
import { useSimulation } from "@/components/product/simulation-provider";
import { PageGuide } from "@/components/ui/page-guide";

function DashboardContent() {
  const demo = useSimulation();

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <header>
        <h1 className="font-display text-2xl font-black text-white sm:text-3xl">
          תרגול שיחה
        </h1>
        <PageGuide title="מה קורה כאן?">
          ה-AI משחק לקוח. אתם מדברים איתו כמו בשיחת מכירה אמיתית. למטה רואים
          את התמלול — ומימין (במסך רחב) טיפים מהמאמן.
        </PageGuide>
      </header>

      <section id="simulations">
        <LiveCallInterface compact simple />
      </section>

      {demo.visibleInsights.length > 0 && (
        <section id="coaching" className="border border-white/[0.06] p-4 sm:p-5">
          <h2 className="mb-4 text-sm font-medium text-white/70">משוב מהמאמן</h2>
          <CoachingInsightsPanel insights={demo.visibleInsights} />
        </section>
      )}
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
