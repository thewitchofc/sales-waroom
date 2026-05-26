"use client";

import { AnalyticsLiveHud } from "@/components/analytics/analytics-live-hud";
import { AnalyticsAiFlow } from "@/components/analytics/analytics-ai-flow";
import { AnalyticsCallIntelligence } from "@/components/analytics/analytics-call-intelligence";
import { AnalyticsDominancePanel } from "@/components/analytics/analytics-dominance-panel";
import { AnalyticsCompetitionPanel } from "@/components/analytics/analytics-competition-panel";
import { AnalyticsCorrectionsPanel } from "@/components/analytics/analytics-corrections-panel";
import { AnalyticsPsychologicalBreakdown } from "@/components/analytics/analytics-psychological-breakdown";
import { Section, SectionHeader } from "@/components/ui/section";
import { SectionAtmosphere } from "@/components/ui/cinematic-bg";

export function AnalyticsDashboard({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <>
      <AnalyticsLiveHud />

      {showHeader && (
        <Section atmosphere className="py-16 sm:py-20">
          <SectionAtmosphere />
          <SectionHeader
            label="מרכז מודיעין"
            title="AI מפרק כל חולשה. בזמן אמת."
            description="לא דשבורד. מערכת מודיעין פסיכולוגית לקלוזרים עילית."
          />
        </Section>
      )}

      <AnalyticsAiFlow />
      <AnalyticsCallIntelligence />
      <AnalyticsDominancePanel />
      <AnalyticsCompetitionPanel />
      <AnalyticsCorrectionsPanel />
      <AnalyticsPsychologicalBreakdown />
    </>
  );
}
