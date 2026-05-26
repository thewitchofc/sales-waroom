"use client";

import Link from "next/link";
import { BrandLink } from "@/components/brand/brand-link";
import { HeroCommandVisual } from "@/components/brand/hero-command-visual";
import { CinematicBackground } from "@/components/ui/cinematic-bg";

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24">
      <CinematicBackground />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <div className="relative z-10 flex flex-col lg:col-span-5">
            <p className="mb-5 font-brand text-[10px] tracking-[0.15em] text-accent/70">
              SALES WAROOM · מערכת הפעלה AI
            </p>

            <h1 className="hero-headline font-display text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem] lg:leading-[1.06]">
              <span className="hero-headline-accent">סימולציות מכירה AI</span>
              <span className="mt-3 block text-white/95">עם אימון תחת לחץ</span>
              <span className="mt-2 block text-base font-semibold tracking-wide text-white/50 sm:text-lg">
                ודירוגים חיים
              </span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-relaxed text-white/50 sm:text-lg">
              תרגלו שיחות קשות, קבלו ניתוח פסיכולוגי בזמן אמת, והתחרו בהזירה,
              במערכת אחת לצוותי מכירות רציניים.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <BrandLink href="/dashboard" variant="command" size="lg" className="w-full sm:w-auto">
                התחילו עכשיו
                <svg className="size-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </BrandLink>
              <BrandLink href="/demo" variant="secondary" size="lg" className="w-full sm:w-auto">
                צפייה בדמו
              </BrandLink>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/[0.04] pt-6">
              <Link href="/leaderboard" className="text-xs text-white/40 hover:text-white/65">
                לוח דירוג
              </Link>
              <Link href="/arena" className="text-xs text-white/40 hover:text-white/65">
                הזירה
              </Link>
            </div>

            <p className="mt-5 text-xs text-white/35">14 יום ניסיון · ללא כרטיס אשראי</p>
          </div>

          <div className="relative z-10 lg:col-span-7 lg:ps-4 xl:ps-8">
            <HeroCommandVisual />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent" />
    </section>
  );
}
