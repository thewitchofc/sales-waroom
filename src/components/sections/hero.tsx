"use client";

import { motion } from "framer-motion";
import { BrandLink } from "@/components/brand/brand-link";
import { HeroCommandVisual } from "@/components/brand/hero-command-visual";
import { CinematicBackground } from "@/components/ui/cinematic-bg";
import { ClassifiedBadge, HudFrame } from "@/components/ui/hud-elements";
import { Waveform } from "@/components/ui/waveform";
import { fadeUp } from "@/components/ui/section";

const stats = [
  { value: "2,847", label: "לוחמים פעילים" },
  { value: "#1", label: "Weekly Arena" },
  { value: "12🔥", label: "Streak Record" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[120vh] items-center overflow-hidden pt-32 pb-28">
      <CinematicBackground intense />

      {/* HUD viewport frame */}
      <div className="pointer-events-none absolute inset-6 border border-white/[0.04] lg:inset-10">
        <span className="hud-corner hud-corner-tl !top-0 !start-0 !size-6" />
        <span className="hud-corner hud-corner-tr !top-0 !end-0 !size-6" />
        <span className="hud-corner hud-corner-bl !bottom-0 !start-0 !size-6" />
        <span className="hud-corner hud-corner-br !bottom-0 !end-0 !size-6" />
      </div>

      <div className="relative mx-auto w-full max-w-[90rem] px-6 lg:px-12">
        <div className="grid items-center gap-20 lg:grid-cols-2 lg:gap-24 xl:gap-32">
          {/* Copy column */}
          <div className="relative z-10 flex flex-col">
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
              <ClassifiedBadge />
            </motion.div>

            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-10 flex items-center gap-4"
            >
              <motion.span
                className="relative flex size-2.5"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-40" />
                <span className="relative inline-flex size-2.5 rounded-full bg-green-400" />
              </motion.span>
              <span className="font-brand text-[10px] tracking-[0.3em] text-white/50">
                SYSTEM ONLINE // WAR ROOM ACTIVE
              </span>
              <span className="hidden h-px flex-1 max-w-24 bg-gradient-to-l from-accent/40 to-transparent sm:block" />
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="hero-headline font-display text-[3.25rem] font-black leading-[0.95] tracking-[-0.02em] md:text-7xl lg:text-[5.75rem] xl:text-[6.5rem]"
            >
              תתאמנו
              <br />
              כמו{" "}
              <span className="gradient-text block mt-1">קלוזרים עילית</span>
            </motion.h1>

            {/* Ambient waveform under headline */}
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="relative my-8 h-12 overflow-hidden opacity-30"
            >
              <Waveform bars={56} intense className="h-12" />
              <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-black" />
            </motion.div>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="max-w-lg text-xl leading-[1.75] text-white/55 md:text-2xl md:leading-[1.7]"
            >
              סימולציות AI שמבחנות frame control, authority ו-certainty —
              {" "}
              <span className="text-white/80">תחת לחץ פסיכולוגי. בלי רחמים. בלי עידוד.</span>
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-14 flex flex-wrap items-center gap-5"
            >
              <BrandLink href="/arena" variant="command" size="lg">
                להיכנס ל-Arena
                <svg className="size-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </BrandLink>
              <BrandLink href="/demo" variant="secondary" size="lg">
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                לצפייה בדמו
              </BrandLink>
            </motion.div>

            {/* Stats — command readout style */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-24"
            >
              <HudFrame label="PERFORMANCE READOUT" className="border border-white/5 bg-black/40 p-6 md:p-8">
                <div className="grid grid-cols-3 gap-8">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + i * 0.15, duration: 0.8 }}
                    >
                      <div className="font-display text-3xl font-black text-white md:text-4xl lg:text-5xl">
                        {stat.value}
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-white/40 md:text-sm">
                        {stat.label}
                      </div>
                      <div className="mt-3 h-px w-full bg-gradient-to-l from-accent/30 to-transparent" />
                    </motion.div>
                  ))}
                </div>
              </HudFrame>
            </motion.div>
          </div>

          {/* Command visual */}
          <div className="relative z-10 lg:pe-4">
            <HeroCommandVisual />
          </div>
        </div>
      </div>

      {/* Cinematic bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 start-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        animate={{ opacity: [0.3, 0.7, 0.3], y: [0, 6, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <span className="font-brand text-[9px] tracking-[0.3em] text-white/30">SCROLL</span>
        <div className="h-8 w-px bg-gradient-to-b from-accent/50 to-transparent" />
      </motion.div>
    </section>
  );
}
