"use client";

import { motion } from "framer-motion";
import { BrandLink } from "@/components/brand/brand-link";
import { HeroCommandVisual } from "@/components/brand/hero-command-visual";
import { CinematicBackground } from "@/components/ui/cinematic-bg";
import { fadeUp } from "@/components/ui/section";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24">
      <CinematicBackground />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="relative z-10 flex flex-col">
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-6 font-brand text-[10px] tracking-[0.2em] text-accent"
            >
              AI SALES PLATFORM
            </motion.p>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-display text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.5rem] lg:leading-[1.08]"
            >
              סימולציות מכירה AI
              <span className="mt-2 block text-white/90">עם אימון תחת לחץ</span>
              <span className="mt-1 block text-lg font-semibold text-accent sm:text-xl md:text-2xl">
                ודירוגים חיים
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-6 max-w-lg text-base leading-relaxed text-white/60 sm:mt-8 sm:text-lg"
            >
              תרגלו שיחות קשות, קבלו ניתוח פסיכולוגי בזמן אמת, והתחרו בהזירה,
              במערכת SaaS אחת לצוותי מכירות רציניים.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
            >
              <BrandLink href="/dashboard" variant="command" size="lg" className="w-full sm:w-auto">
                התחילו עכשיו
                <svg className="size-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </BrandLink>
              <BrandLink href="/demo" variant="secondary" size="lg" className="w-full sm:w-auto">
                צפייה בדמו
              </BrandLink>
            </motion.div>

            <motion.p
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-4 text-xs text-muted-foreground"
            >
              14 יום ניסיון · ללא כרטיס אשראי
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative z-10 hidden md:block"
          >
            <HeroCommandVisual />
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
