import type { Metadata } from "next";
import { PageHero } from "@/components/pages/page-hero";
import { ObjectionSimulator } from "@/components/sections/objection-simulator";
import { VoiceTraining } from "@/components/sections/voice-training";
import { TheoryQuizSection } from "@/components/sections/theory-quiz-section";
import { TrainingLiveHud } from "@/components/training/training-live-hud";

export const metadata: Metadata = {
  title: "אימון AI",
  description: "סימולטור קרב פסיכולוגי, מאמן AI חי, והתנגדויות תחת לחץ.",
};

export default function TrainingPage() {
  return (
    <>
      <PageHero
        label="אימון AI, SALES WAROOM"
        title="AI מאמן אותך לשלוט בשיחות מכירה."
        description="לא קורס. לא דשבורד. סימולטור קרב פסיכולוגי עם מאמן שרואה כל חולשה."
      />
      <TrainingLiveHud />
      <TheoryQuizSection />
      <ObjectionSimulator showHeader={false} />
      <VoiceTraining showHeader={false} />
    </>
  );
}
