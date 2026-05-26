"use client";

import { motion, type Variants } from "framer-motion";

const cinematicEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.14,
      duration: 1,
      ease: cinematicEase,
    },
  }),
};

export const reveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: cinematicEase },
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
      className={`relative px-6 py-36 md:py-48 lg:px-12 ${className}`}
    >
      {atmosphere && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>
      )}
      <div className="relative mx-auto max-w-7xl">{children}</div>
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
      viewport={{ once: true, margin: "-120px" }}
      className={`mb-24 flex max-w-4xl flex-col ${alignClass}`}
    >
      {label && (
        <motion.div custom={0} variants={fadeUp} className="mb-8 flex items-center gap-4">
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-accent/50" />
          <span className="font-brand text-[10px] tracking-[0.25em] text-accent">
            {label}
          </span>
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-accent/50" />
        </motion.div>
      )}
      <motion.h2
        custom={1}
        variants={fadeUp}
        className="font-display text-4xl font-black leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          custom={2}
          variants={fadeUp}
          className="mt-8 max-w-2xl text-lg leading-[1.75] text-white/50 md:text-xl"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
