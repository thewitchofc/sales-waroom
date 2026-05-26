"use client";

import { SimulationProvider } from "@/components/product/simulation-provider";
import { LiveCallInterface } from "@/components/product/live-call-interface";
import { CoachingInsightsPanel } from "@/components/product/coaching-insights-panel";
import { useSimulation } from "@/components/product/simulation-provider";
import { PageGuide } from "@/components/ui/page-guide";

function DemoContent() {
  const demo = useSimulation();

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-16 sm:py-20">
      <header className="px-5 sm:px-8">
        <h1 className="font-display text-2xl font-black text-white sm:text-3xl">דמו</h1>
        <PageGuide title="מה קורה כאן?">
          זו שיחת תרגול קצרה. ה-AI מדבר כמו לקוח — אתם עונים. אין צורך
          להבין הכל; פשוט קראו את התמלול וראו איך המערכת עובדת.
        </PageGuide>
      </header>

      <div className="px-5 sm:px-8">
        <LiveCallInterface simple />
      </div>

      {demo.visibleInsights.length > 0 && (
        <div className="mx-5 border border-white/[0.06] p-4 sm:mx-8 sm:p-5">
          <h2 className="mb-3 text-sm text-white/60">דוגמה למשוב</h2>
          <CoachingInsightsPanel insights={demo.visibleInsights.slice(0, 2)} />
        </div>
      )}
    </div>
  );
}

export function LivePlatform({ showHeader = true }: { showHeader?: boolean }) {
  if (!showHeader) {
    return (
      <SimulationProvider>
        <DemoContent />
      </SimulationProvider>
    );
  }

  return (
    <SimulationProvider>
      <DemoContent />
    </SimulationProvider>
  );
}
