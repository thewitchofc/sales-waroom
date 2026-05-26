"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BrandLink } from "@/components/brand/brand-link";
import { HeroCommandVisual } from "@/components/brand/hero-command-visual";
import { CinematicBackground } from "@/components/ui/cinematic-bg";
import { fadeUp } from "@/components/ui/section";

const liveSignals = [
  { label: "לוחמים פעילים", value: "847", pulse: true },
  { label: "דירוג שבועי", value: "#7", href: "/leaderboard" },
  { label: "לחץ ממוצע", value: "68" },
  { label: "הזירה", value: "חי", href: "/arena", accent: true },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
      <CinematicBackground intense />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 72% 42%, rgba(212,175,85,0.07) 0%, transparent 65%), radial-gradient(ellipse 40% 35% at 20% 60%, rgba(255,255,255,0.02) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          <div className="relative z-10 flex flex-col lg:col-span-5">
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-5 font-brand text-[10px] tracking-[0.25em] text-accent"
            >
              SALES WAROOM · מערכת הפעלה AI
            </motion.p>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="hero-headline font-display text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem] lg:leading-[1.06]"
            >
              <span className="hero-headline-accent">סימולציות מכירה AI</span>
              <span className="mt-3 block text-white/95">עם אימון תחת לחץ</span>
              <span className="mt-2 block text-base font-semibold tracking-wide text-accent/90 sm:text-lg">
                ודירוגים חיים
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-6 max-w-md text-base leading-relaxed text-white/55 sm:mt-7 sm:text-lg"
            >
              תרגלו שיחות קשות, קבלו ניתוח פסיכולוגי בזמן אמת, והתחרו בהזירה,
              במערכת אחת לצוותי מכירות רציניים.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4"
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

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/5 pt-5"
            >
              {liveSignals.map((signal) => {
                const inner = (
                  <>
                    <span className="font-brand text-[9px] text-muted-foreground">{signal.label}</span>
                    <span
                      className={`font-display text-sm font-black ${signal.accent ? "text-red-400" : "text-white"}`}
                    >
                      {signal.pulse && (
                        <motion.span
                          className="me-1.5 inline-block size-1.5 rounded-full bg-red-500"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.4, repeat: Infinity }}
                        />
                      )}
                      {signal.value}
                    </span>
                  </>
                );

                if (signal.href) {
                  return (
                    <Link
                      key={signal.label}
                      href={signal.href}
                      className="interactive-surface flex flex-col gap-0.5 transition-colors hover:text-accent"
                    >
                      {inner}
                    </Link>
                  );
                }

                return (
                  <div key={signal.label} className="flex flex-col gap-0.5">
                    {inner}
                  </div>
                );
              })}
            </motion.div>

            <motion.p
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-4 text-xs text-muted-foreground"
            >
              14 יום ניסיון · ללא כרטיס אשראי
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative z-10 lg:col-span-7 lg:ps-4 xl:ps-8"
          >
            <HeroCommandVisual />
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent" />
    </section>
  );
}
