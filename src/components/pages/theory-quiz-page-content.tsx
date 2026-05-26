"use client";

import Link from "next/link";
import { TheoryQuiz } from "@/components/theory/theory-quiz";
import { PageGuide } from "@/components/ui/page-guide";
import { BrandLink } from "@/components/brand/brand-link";

export function TheoryQuizPageContent() {
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <header className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-brand text-[10px] tracking-[0.2em] text-accent">
              מבחן תיאוריה
            </p>
            <h1 className="mt-2 font-display text-2xl font-black text-white sm:text-3xl">
              שאלון אמריקאי
            </h1>
          </div>
          <BrandLink href="/dashboard" variant="ghost" className="text-xs">
            לתרגול קולי
          </BrandLink>
        </div>
        <PageGuide title="מה זה נותן?">
          4 תשובות לכל שאלה. משוב מיידי והסבר. חוזרים על סבבים עד שהידע נשאר.
          פתוח בכל החבילות, בלי הגבלה.
        </PageGuide>
      </header>

      <TheoryQuiz showIntro={false} />

      <p className="border border-white/5 bg-black/30 px-4 py-3 text-center text-xs text-muted-foreground">
        מוכנים לשיחה אמיתית?{" "}
        <Link href="/dashboard" className="text-accent hover:underline">
          עברו לאימון קולי
        </Link>
      </p>
    </div>
  );
}
