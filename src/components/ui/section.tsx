"use client";

import { motion, type Variants } from "framer-motion";

const cinematicEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.65,
      ease: cinematicEase,
    },
  }),
};

export const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: cinematicEase },
  },
};

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  atmosphere?: boolean;
}

export function Section({
  children,
  className = "",
  id,
  atmosphere = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative px-5 py-16 sm:px-8 sm:py-24 md:py-28 lg:px-12 ${className}`}
    >
      {atmosphere && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/80" />
        </div>
      )}
      <div className="relative mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
}

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  const alignClass =
    align === "center" ? "text-center mx-auto items-center" : "text-start items-start";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`mb-10 flex max-w-3xl flex-col sm:mb-14 md:mb-16 ${alignClass}`}
    >
      {label && (
        <motion.p custom={0} variants={fadeUp} className="mb-4 font-brand text-[10px] tracking-[0.2em] text-accent">
          {label}
        </motion.p>
      )}
      <motion.h2
        custom={1}
        variants={fadeUp}
        className="font-display text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-5xl text-balance"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          custom={2}
          variants={fadeUp}
          className="mt-4 max-w-2xl text-base leading-relaxed text-white/55 sm:mt-5 sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
