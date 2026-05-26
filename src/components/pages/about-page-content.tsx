"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionAtmosphere } from "@/components/ui/cinematic-bg";
import { BrandLink } from "@/components/brand/brand-link";
import { PageHero } from "@/components/pages/page-hero";

const values = [
  {
    title: "לחץ אמיתי",
    body: "אימון בלי רחמים. כי בשטח אף אחד לא ירחם עליכם.",
  },
  {
    title: "AI שלא מקל",
    body: "Coach שמזהה כל טעות — לפני שהלקוח מרגיש חולשה.",
  },
  {
    title: "DNA עילית",
    body: "לא טיפים. מערכת הפעלה שמטמיעה הרגלי סגירה של top 1%.",
  },
];

const timeline = [
  { year: "2023", event: "הקמת Sales Waroom — חזון: AI war room למכירות" },
  { year: "2024", event: "100+ צוותי enterprise מאמנים על הפלטפורמה" },
  { year: "2025", event: "מנוע Coach בעברית + ניתוח פריים בזמן אמת" },
  { year: "2026", event: "Command Center — מערכת הפעלה מלאה לקלוזרים" },
];

export function AboutPageContent() {
  return (
    <>
      <PageHero
        label="ABOUT SALES WAROOM"
        title="בנינו את מה שחסר לנו בשטח"
        description="Sales Waroom נולד מתוך frustration — כלים generic שלא מכינים אותך ללקוח עוין, לדדליין, או ל-'תשלח לי פרטים'."
      />

      <Section atmosphere>
        <SectionAtmosphere />
        <SectionHeader
          label="MISSION"
          title="להפוך כל קלוזר ל-operating system"
          description="לא עוד קורסים. לא עוד scripts. מערכת שרצה בכל שיחה."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <GlassCard key={v.title} delay={i * 0.1} premium>
              <h3 className="font-display text-xl font-bold text-white">{v.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section className="py-24">
        <SectionHeader
          label="TIMELINE"
          title="הדרך ל-Command Center"
          align="start"
        />
        <div className="relative space-y-0">
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex gap-8 border-s border-white/10 py-8 ps-8"
            >
              <span className="absolute -start-1.5 top-8 size-3 rounded-full border-2 border-black bg-accent" />
              <span className="font-brand text-sm text-accent">{item.year}</span>
              <p className="text-base leading-relaxed text-white/80">{item.event}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12">
          <BrandLink href="/demo" variant="command" size="lg">
            לראות את הפלטפורמה בפעולה
          </BrandLink>
        </div>
      </Section>
    </>
  );
}
