"use client";

import { BrandLink } from "@/components/brand/brand-link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { CinematicBackground } from "@/components/ui/cinematic-bg";

const steps = [
  "מדברים עם AI שמדמה לקוח אמיתי",
  "מקבלים משוב תוך כדי השיחה",
  "משתפרים ועולים בדירוג",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 sm:pt-28 sm:pb-28 md:pt-32">
      <CinematicBackground intense />

      <div
        className="pointer-events-none absolute inset-x-0 top-1/3 h-64 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(212,175,85,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <div className="mb-10 flex justify-center sm:mb-12 md:mb-14">
          <BrandLogo variant="hero" priority className="mx-auto" />
        </div>

        <p className="mx-auto max-w-lg text-base leading-relaxed text-white/50 sm:text-lg">
          תרגלו שיחות מכירה עם AI, קבלו משוב בזמן אמת, והתחרו בדירוג.
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
