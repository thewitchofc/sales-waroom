"use client";

import { motion } from "framer-motion";
import { CinematicBackground } from "@/components/ui/cinematic-bg";
import { fadeUp } from "@/components/ui/section";

interface PageHeroProps {
  label: string;
  title: string;
  description: string;
  compact?: boolean;
}

export function PageHero({ label, title, description, compact = false }: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden border-b border-white/5 pt-28 sm:pt-32 ${
        compact ? "pb-10 sm:pb-12" : "pb-14 sm:pb-16 md:pb-20"
      }`}
    >
      <CinematicBackground />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-4 font-brand text-[10px] tracking-[0.2em] text-accent"
        >
          {label}
        </motion.p>
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="max-w-3xl font-display text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl text-balance"
        >
          {title}
        </motion.h1>
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-5 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
