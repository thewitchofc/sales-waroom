"use client";

import { Section } from "@/components/ui/section";
import { SectionAtmosphere } from "@/components/ui/cinematic-bg";
import { TheoryQuiz } from "@/components/theory/theory-quiz";
import { BrandLink } from "@/components/brand/brand-link";

export function TheoryQuizSection() {
  return (
    <Section id="theory-quiz" atmosphere className="py-20 sm:py-28 md:py-32">
      <SectionAtmosphere />
      <div className="pointer-events-none absolute inset-0 command-grid opacity-[0.03]" />

      <div className="relative mx-auto max-w-3xl px-6">
        <TheoryQuiz compact showIntro />

        <div className="mt-10 flex justify-center">
          <BrandLink href="/theory-quiz" variant="command">
            למבחן המלא במרכז הפיקוד
          </BrandLink>
        </div>
      </div>
    </Section>
  );
}
