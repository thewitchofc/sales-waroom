"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";

const testimonials = [
  {
    quote:
      "Sales Waroom קיצר לי את ההתאקלמות בחצי. מהיסוס על מחיר, לסגירת enterprise תוך 6 שבועות.",
    author: "מרקוס חן",
    role: "AE Enterprise",
    company: "SaaS Series B",
    metric: "2.4x CLOSE RATE",
    rank: "ELITE",
  },
  {
    quote:
      "סימולציית הלחץ אכזרית. בדיוק מה שהיינו צריכים. הצוות מתמודד עם לקוחות עוינים בביטחון.",
    author: "שרה לוי",
    role: "VP מכירות",
    company: "Fintech Unicorn",
    metric: "94% ADOPTION",
    rank: "COMMANDER",
  },
  {
    quote:
      "ניסיתי הכל. זו הפלטפורמה היחידה שמרגישה כמו שיחה אמיתית. ה-AI לא מקל.",
    author: "ג'יימס אוקונקו",
    role: "מנהל מכירות",
    company: "Enterprise גלובלי",
    metric: "+$2.1M PIPELINE",
    rank: "OPERATOR",
  },
];

export function Testimonials() {
  return (
    <Section id="testimonials" className="border-t border-white/5">
      <SectionHeader
        label="TESTIMONIALS"
        title="מה אומרים צוותי מכירות"
        description="תוצאות אמיתיות מצוותים שמתאמנים על הפלטפורמה."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
        {testimonials.map((t, i) => (
          <GlassCard key={t.author} delay={i * 0.1} className="flex flex-col border border-white/5">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-brand text-[10px] text-accent">{t.metric}</span>
              <span className="border border-white/10 px-2 py-0.5 font-brand text-[9px] text-muted-foreground">
                {t.rank}
              </span>
            </div>

            <div className="mb-6 font-display text-5xl leading-none text-accent/20">&ldquo;</div>

            <blockquote className="mb-8 flex-1 text-lg leading-[1.7] text-white/90">
              {t.quote}
            </blockquote>

            <div className="flex items-center gap-4 border-t border-white/5 pt-6">
              <div className="relative flex size-12 items-center justify-center border border-accent/20 bg-accent/5">
                <span className="text-sm font-bold text-accent">
                  {t.author.split(" ").map((n) => n[0]).join("")}
                </span>
                <motion.div
                  className="absolute inset-0 border border-accent/30"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                />
              </div>
              <div>
                <div className="font-semibold text-white">{t.author}</div>
                <div className="text-xs text-muted-foreground">
                  {t.role} · {t.company}
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
