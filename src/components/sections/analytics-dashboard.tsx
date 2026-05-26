"use client";

import { AnalyticsLiveHud } from "@/components/analytics/analytics-live-hud";
import { AnalyticsAiFlow } from "@/components/analytics/analytics-ai-flow";
import { AnalyticsCallIntelligence } from "@/components/analytics/analytics-call-intelligence";
import { AnalyticsDominancePanel } from "@/components/analytics/analytics-dominance-panel";
import { AnalyticsCompetitionPanel } from "@/components/analytics/analytics-competition-panel";
import { AnalyticsCorrectionsPanel } from "@/components/analytics/analytics-corrections-panel";
import { AnalyticsPsychologicalBreakdown } from "@/components/analytics/analytics-psychological-breakdown";

export function AnalyticsDashboard({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <>
      {showHeader && <AnalyticsLiveHud />}
      <AnalyticsPsychologicalBreakdown />
      <AnalyticsCallIntelligence />
      <AnalyticsAiFlow />
      <AnalyticsDominancePanel />
      <AnalyticsCompetitionPanel />
      <AnalyticsCorrectionsPanel />
    </>
  );
}
