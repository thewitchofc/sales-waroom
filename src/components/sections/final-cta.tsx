"use client";

import { motion } from "framer-motion";
import { BrandLink } from "@/components/brand/brand-link";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 px-5 py-20 sm:px-8 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(212,175,85,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="cta-exclusivity-panel grid gap-8 border border-accent/10 p-8 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-12"
        >
          <div className="text-start">
            <div className="mb-4 inline-flex items-center gap-2 border border-accent/25 bg-accent/5 px-3 py-1">
              <span className="size-1.5 rounded-full bg-accent" />
              <span className="font-brand text-[9px] tracking-[0.2em] text-accent">גישה מוגבלת</span>
            </div>

            <h2 className="font-display text-3xl font-black leading-[1.08] text-white sm:text-4xl">
              נכנסים למערכת.
              <span className="mt-2 block text-white/55">לא צופים מבחוץ.</span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Sales Waroom בנוי לצוותים שמתאמנים ברצינות. מקומות מוגבלים. דירוגים פתוחים. האימון מתחיל
              ברגע שנכנסים.
            </p>

            <p className="mt-4 font-brand text-[10px] text-red-400/90">
              847 לוחמים פעילים השבוע · אתגר CFO נסגר בימים הקרובים
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:items-stretch">
            <BrandLink href="/dashboard" variant="command" size="lg" className="w-full justify-center">
              כניסה למערכת
              <svg className="size-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </BrandLink>
            <BrandLink href="/demo" variant="secondary" size="lg" className="w-full justify-center">
              צפו בדמו לפני כניסה
            </BrandLink>
            <BrandLink href="/pricing" variant="ghost" size="lg" className="w-full justify-center text-muted-foreground">
              תמחור ורמות גישה
            </BrandLink>
            <p className="text-center text-[10px] text-muted-foreground lg:text-start">
              14 יום ניסיון · ללא כרטיס אשראי · ביטול בכל עת
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
