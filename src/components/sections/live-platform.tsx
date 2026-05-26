"use client";

import { Section, SectionHeader } from "@/components/ui/section";
import { SectionAtmosphere } from "@/components/ui/cinematic-bg";
import { SimulationProvider } from "@/components/product/simulation-provider";
import { SimulationStatusBar } from "@/components/product/simulation-status-bar";
import { LiveCallInterface } from "@/components/product/live-call-interface";
import { PlatformCommandPanel } from "@/components/product/platform-command-panel";
import { CoachingInsightsPanel } from "@/components/product/coaching-insights-panel";
import { useSimulation } from "@/components/product/simulation-provider";

function LivePlatformContent() {
  const demo = useSimulation();

  return (
    <>
      <SimulationStatusBar minimalTelemetry />

      <LiveCallInterface focusedWaveform />

      <div className="mt-8 grid gap-5 lg:grid-cols-2 lg:gap-6">
        <PlatformCommandPanel minimalTelemetry />
        <div className="glass-premium metallic-border os-panel-glow p-5 md:p-6">
          <CoachingInsightsPanel insights={demo.visibleInsights} />
        </div>
      </div>
    </>
  );
}

export function LivePlatform({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <Section id="live-demo" className="overflow-hidden py-16 sm:py-20" atmosphere>
      <SectionAtmosphere />

      {showHeader && (
        <SectionHeader
          label="מרכז פיקוד"
          title="מערכת אימון פסיכולוגית לקלוזרים עילית"
          description="שליטה בפריים, סמכות, ודאות ו-תגובה ללחץ, ניתוח חד בזמן אמת. לא מוטיבציה. אימון."
        />
      )}

      <SimulationProvider>
        <LivePlatformContent />
      </SimulationProvider>
    </Section>
  );
}
