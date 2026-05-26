"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { fadeUp } from "@/components/ui/section";

const entryPoints = [
  {
    title: "דמו חי",
    href: "/demo",
    label: "LIVE DEMO",
    description: "שיחת AI בעברית, תמלול, Coach וניתוח בזמן אמת, בלי הרשמה.",
  },
  {
    title: "מרכז פיקוד",
    href: "/dashboard",
    label: "COMMAND",
    description: "סימולציות, פיקוד צוות ו-insights, לעבודה יומיומית.",
  },
  {
    title: "סקירת פלטפורמה",
    href: "/platform",
    label: "OVERVIEW",
    description: "ארכיטקטורה, מודולים ויכולות, לפני שמתחילים.",
  },
] as const;

export function ProductPreviewGrid() {
  return (
    <Section className="border-t border-white/5 bg-black">
      <div className="mb-10 max-w-2xl sm:mb-12">
        <p className="mb-3 font-brand text-[10px] tracking-[0.2em] text-accent">
          GET STARTED
        </p>
        <h2 className="font-display text-3xl font-black text-white sm:text-4xl">
          איפה מתחילים?
        </h2>
        <p className="mt-3 text-base text-white/55">
          שלוש נקודות כניסה, בלי לחזור על מה שכבר בניווט.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
        {entryPoints.map((route, i) => (
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
              className="panel-surface group block h-full border border-white/5 p-6 transition-colors hover:border-white/10 sm:p-7"
            >
              <span className="font-brand text-[9px] tracking-widest text-accent">
                {route.label}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold text-white sm:text-2xl">
                {route.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {route.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
