"use client";

import { motion } from "framer-motion";
import { BrandLink } from "@/components/brand/brand-link";
import { SectionAtmosphere } from "@/components/ui/cinematic-bg";
import { fadeUp } from "@/components/ui/section";

const arenaFeatures = [
  {
    tag: "טורנירים",
    title: "קרבות שבועיים",
    body: "אתגר CFO. לחץ אמיתי. תוצאות על הלוח.",
  },
  {
    tag: "חטיבות",
    title: "דירוג מדורג",
    body: "עולים, יורדים, או נעלמים. אין אמצע.",
  },
  {
    tag: "עונות",
    title: "פרסי עונה",
    body: "כל עונה מאפסת ego ופותחת מרוץ חדש.",
  },
  {
    tag: "רצף",
    title: "רצף ניצחונות",
    body: "כל סגירה בונה מומנטום. כל כישלון נרשם.",
  },
  {
    tag: "תגים",
    title: "תגים עילית",
    body: "סימון ויזואלי למי ששרד את הלחץ.",
  },
  {
    tag: "דירוג",
    title: "לוח חי",
    body: "847 מפעילים רואים איפה אתה עומד. עכשיו.",
  },
];

const urgencyRules = [
  "רק מנויים נכנסים לקרבות מדורגים",
  "הלוח הציבורי מתעדכן כל שבוע",
  "מובילי העונה פותחים סימולציות פרטיות",
  "הגישה נסגרת עם פתיחת העונה",
];

export function PricingArenaSection() {
  return (
    <>
      <section className="relative px-5 py-24 sm:px-8 sm:py-32 md:py-36 lg:px-12">
        <SectionAtmosphere />
        <div
          className="pointer-events-none absolute inset-0 command-grid opacity-[0.05]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <motion.p custom={0} variants={fadeUp} className="font-brand text-[10px] tracking-[0.2em] text-accent">
                האקו-סистемה
              </motion.p>
              <motion.h2
                custom={1}
                variants={fadeUp}
                className="mt-4 font-display text-3xl font-black text-white sm:text-4xl md:text-5xl"
              >
                הזירה
              </motion.h2>
              <motion.p
                custom={2}
                variants={fadeUp}
                className="mt-5 max-w-xl text-base leading-relaxed text-white/50 sm:text-lg"
              >
                לא משחק. תחרות. אי-ספורט של מכירות, עם לחץ, דירוגים, ותוצאות
                שאי אפשר לזייף.
              </motion.p>
            </div>
            <motion.div custom={3} variants={fadeUp}>
              <BrandLink href="/arena" variant="command">
                כניסה להזירה
              </BrandLink>
            </motion.div>
          </motion.div>

          <div className="grid gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
            {arenaFeatures.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group relative bg-black p-8 sm:p-10"
              >
                <span className="inline-flex border border-accent/20 bg-accent/5 px-2 py-0.5 font-brand text-[8px] tracking-[0.15em] text-accent/80">
                  {item.tag}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-white transition-colors group-hover:text-accent">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/45">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(239,68,68,0.04) 0%, transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl">
          <p className="font-brand text-[10px] tracking-[0.2em] text-red-400/70">
            דחיפות גישה
          </p>
          <h3 className="mt-4 font-display text-2xl font-black text-white sm:text-3xl">
            לא קונים תוכנה.
            <span className="mt-2 block text-white/50">נכנסים למערכת תחרותית.</span>
          </h3>

          <ul className="mt-10 space-y-0 border border-white/8">
            {urgencyRules.map((rule, i) => (
              <li
                key={rule}
                className="flex items-center gap-5 border-b border-white/5 px-6 py-5 last:border-b-0 sm:px-8 sm:py-6"
              >
                <span className="font-brand text-xs text-accent/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-display text-base font-semibold text-white/75 sm:text-lg">
                  {rule}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <BrandLink href="/dashboard" variant="command" size="lg">
              קבלו גישה עכשיו
            </BrandLink>
            <BrandLink href="/demo" variant="secondary" size="lg">
              צפו בדמו לפני כניסה
            </BrandLink>
          </div>
        </div>
      </section>
    </>
  );
}
