"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { BrandLink } from "@/components/brand/brand-link";
import { productRoutes } from "@/config/navigation";
import { fadeUp } from "@/components/ui/section";

export function ProductPreviewGrid() {
  return (
    <Section className="py-24 md:py-32">
      <div className="mb-16 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-4 font-brand text-[10px] tracking-[0.3em] text-accent"
        >
          PLATFORM MODULES
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl font-black text-white md:text-5xl"
        >
          מערכת הפעלה שלמה. לא עמוד אחד.
        </motion.h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {productRoutes.map((route, i) => (
          <motion.div
            key={route.href}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link
              href={route.href}
              className="group glass-premium metallic-border os-panel-glow block h-full border border-white/5 p-8 transition-all hover:border-accent/25"
            >
              <span className="font-brand text-[10px] tracking-widest text-accent">
                {route.label}
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold text-white group-hover:text-accent transition-colors">
                {route.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {route.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm text-accent opacity-0 transition-opacity group-hover:opacity-100">
                כניסה למודול
                <svg className="size-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <BrandLink href="/dashboard" variant="command" size="lg">
          להיכנס לדשבורד
        </BrandLink>
      </div>
    </Section>
  );
}
