"use client";

import { motion } from "framer-motion";
import { CinematicBackground } from "@/components/ui/cinematic-bg";
import { fadeUp } from "@/components/ui/section";

interface PageHeroProps {
  label: string;
  title: string;
  description: string;
}

export function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28">
      <CinematicBackground />
      <div className="pointer-events-none absolute inset-6 border border-white/[0.04] lg:inset-10">
        <span className="hud-corner hud-corner-tl !top-0 !start-0 !size-6" />
        <span className="hud-corner hud-corner-tr !top-0 !end-0 !size-6" />
        <span className="hud-corner hud-corner-bl !bottom-0 !start-0 !size-6" />
        <span className="hud-corner hud-corner-br !bottom-0 !end-0 !size-6" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-6 flex items-center gap-4"
        >
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-accent/50" />
          <span className="font-brand text-[10px] tracking-[0.25em] text-accent">{label}</span>
        </motion.div>
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="hero-headline max-w-4xl font-display text-3xl font-black leading-[1.08] text-white sm:text-4xl md:text-6xl lg:text-7xl text-balance"
        >
          {title}
        </motion.h1>
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-8 max-w-2xl text-lg leading-relaxed text-white/50 md:text-xl"
        >
          {description}
        </motion.p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
