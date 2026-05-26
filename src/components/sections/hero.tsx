"use client";

import { BrandLink } from "@/components/brand/brand-link";
import { CinematicBackground } from "@/components/ui/cinematic-bg";

const steps = [
  "מדברים עם AI שמדמה לקוח אמיתי",
  "מקבלים משוב תוך כדי השיחה",
  "משתפרים ועולים בדירוג",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28">
      <CinematicBackground />

      <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
        <p className="mb-4 text-sm text-accent/80">Sales Waroom</p>

        <h1 className="font-display text-4xl font-black leading-tight text-white sm:text-5xl">
          תרגלו שיחות מכירה
          <span className="mt-2 block text-white/70">עם AI שמאמן אתכם</span>
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/50 sm:text-lg">
          לא עוד סרטונים או תיאוריה. כאן מתרגלים שיחה אמיתית, מקבלים תיקונים,
          ורואים איך אתם משתפרים.
        </p>

        <ul className="mx-auto mt-10 max-w-md space-y-3 text-start text-sm text-white/55">
          {steps.map((step, i) => (
            <li key={step} className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center border border-white/10 text-xs text-accent/80">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <BrandLink href="/demo" variant="command" size="lg" className="w-full sm:w-auto">
            נסו דמו חינם
          </BrandLink>
          <BrandLink href="/pricing" variant="secondary" size="lg" className="w-full sm:w-auto">
            ראו חבילות
          </BrandLink>
        </div>

        <p className="mt-6 text-xs text-white/35">14 יום ניסיון · בלי כרטיס אשראי</p>
      </div>
    </section>
  );
}
