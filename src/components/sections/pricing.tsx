"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { BrandButton } from "@/components/brand/brand-button";
import { cn } from "@/lib/utils";
import { SectionAtmosphere } from "@/components/ui/cinematic-bg";

const plans = [
  {
    name: "סוכן עצמאי",
    code: "SOLO",
    price: "₪179",
    period: "/חודש",
    description: "לנציגים שמסרבים לעמוד במקום.",
    features: [
      "סימולציות AI ללא הגבלה",
      "אימון קולי וניקוד",
      "דשבורד אנליטיקה אישי",
      "50+ תרחישי התנגדות",
      "ניתוח הקלטות שיחה",
    ],
    cta: "התחילו להתאמן",
    highlighted: false,
  },
  {
    name: "חדר מלחמה",
    code: "WAR ROOM",
    price: "₪549",
    period: "/חודש",
    description: "מרכז הפיקוד המלא לקלוזרים רציניים.",
    features: [
      "הכל בסוכן עצמאי",
      "מצבי לחץ מתקדמים",
      "פרסונות קונה מותאמות",
      "כרטיסי קרב תחרותיים",
      "מודלי AI בעדיפות",
      "דוחות ביצועים שבועיים",
    ],
    cta: "להיכנס לחדר המלחמה",
    highlighted: true,
  },
  {
    name: "ארגוני",
    code: "ENTERPRISE",
    price: "מותאם",
    period: "",
    description: "הטמעת DNA עילית בכל הארגון.",
    features: [
      "הכל בחדר מלחמה",
      "לוחות מובילים ותרגילי צוות",
      "דשבורד פיקוד למנהלים",
      "SSO ואינטגרציות מותאמות",
      "מנהל הצלחה ייעודי",
      "נתוני אימון AI מותאמים",
    ],
    cta: "צרו קשר עם המכירות",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <Section id="pricing" atmosphere>
      <SectionAtmosphere />
      <SectionHeader
        label="ACCESS LEVELS"
        title="השקיעו במיומנות שמדפיסה הכנסות"
        description="14 יום ניסיון חינם. ללא כרטיס אשראי. גישה מיידית למערכת."
      />

      <div className="grid gap-8 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <GlassCard
            key={plan.name}
            delay={i * 0.12}
            hover={!plan.highlighted}
            premium={plan.highlighted}
            className={cn(
              "relative flex flex-col",
              plan.highlighted && "lg:scale-[1.04] glow-accent-strong border-accent/30"
            )}
          >
            {plan.highlighted && (
              <>
                <motion.div
                  className="absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -top-4 start-1/2 -translate-x-1/2 border border-accent/30 bg-accent px-5 py-1 font-brand text-[10px] text-black"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(212,175,85,0.3)",
                      "0 0 50px rgba(212,175,85,0.5)",
                      "0 0 20px rgba(212,175,85,0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  MOST DEPLOYED
                </motion.div>
              </>
            )}

            <div className="mb-2 font-brand text-[10px] tracking-widest text-muted-foreground">
              {plan.code}
            </div>
            <h3 className="font-display text-2xl font-bold text-white">{plan.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {plan.description}
            </p>

            <div className="my-8 flex items-baseline gap-1 border-b border-white/5 pb-8">
              <span className="font-display text-5xl font-black text-white">
                {plan.price}
              </span>
              {plan.period && (
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              )}
            </div>

            <ul className="mb-10 flex flex-1 flex-col gap-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-white/75">
                  <span className="mt-1.5 size-1 shrink-0 bg-accent" />
                  {feature}
                </li>
              ))}
            </ul>

            <BrandButton
              variant={plan.highlighted ? "command" : "secondary"}
              size="lg"
              className="w-full"
            >
              {plan.cta}
            </BrandButton>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
