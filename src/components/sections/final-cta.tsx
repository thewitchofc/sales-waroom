"use client";

import { motion } from "framer-motion";
import { BrandLink } from "@/components/brand/brand-link";
import { CinematicBackground } from "@/components/ui/cinematic-bg";
import { ClassifiedBadge } from "@/components/ui/hud-elements";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-40 lg:px-10">
      <div className="absolute inset-0">
        <CinematicBackground />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="mb-10 flex justify-center">
            <ClassifiedBadge />
          </div>

          <h2 className="font-display text-5xl font-black leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl">
            העסקה הבאה שלכם
            <br />
            <span className="gradient-text">נסגרת בחדר המלחמה</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            הפסיקו להפסיד עסקאות על התנגדויות שלא תרגלתם.
            היכנסו למערכת. התאמנו כמו 1% העליונים.
          </p>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-5">
            <BrandLink href="/dashboard" variant="command" size="lg">
              להיכנס לחדר המלחמה
              <svg className="size-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </BrandLink>
            <BrandLink href="/demo" variant="secondary" size="lg">
              לתיאום דמו
            </BrandLink>
          </div>

          <p className="mt-8 font-brand text-[10px] tracking-widest text-muted-foreground">
            14 DAY TRIAL // NO CREDIT CARD // INSTANT ACCESS
          </p>
        </motion.div>
      </div>
    </section>
  );
}
