import type { Metadata } from "next";
import { PageHero } from "@/components/pages/page-hero";
import { ObjectionSimulator } from "@/components/sections/objection-simulator";
import { VoiceTraining } from "@/components/sections/voice-training";

export const metadata: Metadata = {
  title: "אימון AI",
  description: "סימולטור התנגדויות ואימון קולי תחת לחץ — AI training preview.",
};

export default function TrainingPage() {
  return (
    <>
      <PageHero
        label="AI TRAINING"
        title="אימון שמכין לשטח. לא למבחן."
        description="התנגדויות אמיתיות, ניתוח AI, אימון קולי — הכל במקום אחד."
      />
      <ObjectionSimulator showHeader={false} />
      <VoiceTraining showHeader={false} />
    </>
  );
}
