"use client";

import { motion } from "framer-motion";
import { BrandLink } from "@/components/brand/brand-link";

export function FinalCTA() {
  return (
    <section className="relative border-t border-white/5 px-5 py-20 sm:px-8 sm:py-28">
      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 font-brand text-[10px] tracking-[0.2em] text-accent">
            GET STARTED
          </p>

          <h2 className="font-display text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
            מוכנים לאמן כמו צוות
            <span className="mt-2 block text-white/80">שסוגר עסקאות?</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            היכנסו למערכת, הריצו סימולציה, ועלו בדירוג, היום.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">
            <BrandLink href="/demo" variant="command" size="lg" className="w-full sm:w-auto">
              צפו בדמו החי
            </BrandLink>
            <BrandLink href="/pricing" variant="secondary" size="lg" className="w-full sm:w-auto">
              תמחור
            </BrandLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
