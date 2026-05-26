"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { fadeUp } from "@/components/ui/section";

const entryPoints = [
  {
    title: "דמו חי",
    href: "/demo",
    label: "דמו חי",
    description: "שיחת AI בעברית, תמלול, מאמן וניתוח בזמן אמת. הכניסה הכי מהירה למערכת.",
    featured: true,
  },
  {
    title: "מרכז פיקוד",
    href: "/dashboard",
    label: "פיקוד",
    description: "סימולציות, פיקוד צוות ותובנות, לעבודה יומיומית.",
    featured: false,
  },
  {
    title: "סקירת פלטפורמה",
    href: "/platform",
    label: "סקירה",
    description: "ארכיטקטורה, מודולים ויכולות, לפני שמתחילים.",
    featured: false,
  },
] as const;

export function ProductPreviewGrid() {
  const [featured, ...rest] = entryPoints;

  return (
    <Section className="border-t border-white/5 bg-black py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4 lg:pt-2">
          <p className="mb-3 font-brand text-[10px] tracking-[0.2em] text-accent">מתחילים</p>
          <h2 className="font-display text-3xl font-black leading-tight text-white sm:text-4xl">
            שלוש דלתות
            <span className="mt-1 block text-white/50">למערכת</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/45">
            לא עוד ניווט אינסופי. בחרו נקודת כניסה והתחילו לעבוד.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 lg:col-span-8 lg:grid-cols-2">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Link
              href={featured.href}
              className="hero-preview-card group relative block overflow-hidden border border-accent/15 p-7 transition-all hover:border-accent/30 sm:p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-accent/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="font-brand text-[9px] tracking-widest text-accent">{featured.label}</span>
              <h3 className="mt-3 font-display text-2xl font-black text-white sm:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {featured.description}
              </p>
              <span className="mt-6 inline-block font-brand text-[10px] text-accent/80 group-hover:text-accent">
                כניסה ←
              </span>
            </Link>
          </motion.div>

          {rest.map((route, i) => (
            <motion.div
              key={route.href}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link
                href={route.href}
                className="panel-surface group block h-full border border-white/5 p-6 transition-all hover:border-white/12 hover:bg-white/[0.02] sm:p-7"
              >
                <span className="font-brand text-[9px] tracking-widest text-accent">{route.label}</span>
                <h3 className="mt-3 font-display text-xl font-bold text-white">{route.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{route.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
