"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { BrandLink } from "@/components/brand/brand-link";
import { cn } from "@/lib/utils";
import { SectionAtmosphere } from "@/components/ui/cinematic-bg";

const plans = [
  {
    id: "solo",
    accessLevel: "רמה 1",
    operatorClass: "מחלקת מפעיל",
    name: "מפעיל עצמאי",
    subtitle: "SOLO OPERATOR",
    price: "₪179",
    period: "/חודש",
    description: "לנציג שמתאמן לבד. ללא הזירה. ללא דירוג.",
    features: [
      "סימולציות AI ללא הגבלה",
      "אימון קולי תחת לחץ",
      "ניתוח ביצועים אישי",
    ],
    cta: "פתיחת גישה",
    highlighted: false,
  },
  {
    id: "warroom",
    accessLevel: "רמה 2",
    operatorClass: "חטיבה עילית",
    name: "גישת Warroom",
    subtitle: "WAR ROOM ACCESS",
    price: "₪549",
    period: "/חודש",
    description: "כאן נמצאים כל מי שרציני. הזירה. הדירוג. הלחץ.",
    features: [
      "הזירה המדורגת + טורנירים שבועיים",
      "לוח דירוג חי + עונות ורצף ניצחונות",
      "תגים עילית + סימולציות מתקדמות",
    ],
    cta: "כניסה ל-Warroom",
    highlighted: true,
    liveUsers: true,
  },
  {
    id: "command",
    accessLevel: "רמה 3",
    operatorClass: "סיווג מפקד",
    name: "מרכז פיקוד",
    subtitle: "COMMAND CENTER",
    price: "מותאם",
    period: "",
    description: "לצוותים ומנהלים. שליטה, מדידה, הטמעה.",
    features: [
      "ניהול מפעילים + אנליטיקת ביצועים",
      "דשבורד פיקוד למנהלי מכירות",
      "SSO + הטמעה ארגונית מלאה",
    ],
    cta: "בקשת סיווג ארגוני",
    highlighted: false,
  },
];

function HudChip({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-0.5 font-brand text-[8px] tracking-[0.12em]",
        accent
          ? "border-accent/30 bg-accent/10 text-accent"
          : "border-white/10 bg-white/[0.02] text-white/40"
      )}
    >
      {children}
    </span>
  );
}

function LiveUsersCounter() {
  const [count, setCount] = useState(847);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(840 + Math.floor(Math.random() * 18));
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-5 flex items-center gap-2 border-t border-accent/15 pt-4">
      <span className="pressure-pulse size-1.5 rounded-full bg-accent" />
      <span className="font-brand text-[9px] text-accent/90">
        {count} מפעילים פעילים עכשיו
      </span>
    </div>
  );
}

export function Pricing({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <Section id="pricing" atmosphere className="py-20 sm:py-28 md:py-36">
      <SectionAtmosphere />
      {showHeader && (
        <div className="mb-16 text-center sm:mb-20">
          <p className="font-brand text-[10px] tracking-[0.2em] text-accent">רמות גישה</p>
          <h2 className="mt-4 font-display text-3xl font-black text-white sm:text-4xl">
            בחרו סיווג. היכנסו למערכת.
          </h2>
        </div>
      )}

      <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <HudChip accent>רמת גישה</HudChip>
        <HudChip>סטטוס סיווג</HudChip>
        <HudChip>מחלקת מפעיל</HudChip>
        <HudChip accent>דירוג חי</HudChip>
        <HudChip>חטיבה עילית</HudChip>
      </div>

      <div className="grid items-stretch gap-10 lg:grid-cols-3 lg:gap-8 xl:gap-10">
        {plans.map((plan, i) => (
          <GlassCard
            key={plan.id}
            delay={i * 0.12}
            hover={!plan.highlighted}
            premium={plan.highlighted}
            className={cn(
              "relative flex flex-col !p-8 sm:!p-10",
              plan.highlighted &&
                "pricing-tier-active z-10 lg:scale-[1.05] glow-accent-strong border-accent/35 lg:-my-4"
            )}
          >
            {plan.highlighted && (
              <>
                <div className="pricing-tier-sweep pointer-events-none absolute inset-0" aria-hidden />
                <motion.div
                  className="absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -top-4 start-1/2 -translate-x-1/2 border border-accent/40 bg-accent px-4 py-1 font-brand text-[9px] text-black"
                  animate={{
                    boxShadow: [
                      "0 0 16px rgba(212,175,85,0.35)",
                      "0 0 40px rgba(212,175,85,0.55)",
                      "0 0 16px rgba(212,175,85,0.35)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  הכי פעיל
                </motion.div>
                <div className="absolute end-4 top-4 flex items-center gap-1.5">
                  <span className="pressure-pulse size-1.5 rounded-full bg-accent" />
                  <span className="font-brand text-[8px] text-accent/80">חי</span>
                </div>
              </>
            )}

            <div className="mb-6 flex flex-wrap gap-2">
              <HudChip accent={plan.highlighted}>{plan.accessLevel}</HudChip>
              <HudChip>{plan.operatorClass}</HudChip>
            </div>

            <p className="font-brand text-[9px] tracking-[0.15em] text-white/30" dir="ltr">
              {plan.subtitle}
            </p>
            <h3 className="mt-2 font-display text-2xl font-black text-white sm:text-3xl">
              {plan.name}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/45">{plan.description}</p>

            <div className="my-8 flex items-baseline gap-1 border-b border-white/5 pb-8 sm:my-10">
              <span className="font-display text-4xl font-black text-white sm:text-5xl">
                {plan.price}
              </span>
              {plan.period && (
                <span className="text-sm text-white/35">{plan.period}</span>
              )}
            </div>

            <ul className="mb-10 flex flex-1 flex-col gap-5 sm:mb-12">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-base text-white/80">
                  <span className="mt-2 size-1.5 shrink-0 bg-accent" />
                  {feature}
                </li>
              ))}
            </ul>

            {plan.liveUsers && <LiveUsersCounter />}

            <BrandLink
              href={plan.highlighted ? "/dashboard" : plan.id === "command" ? "/login" : "/login"}
              variant={plan.highlighted ? "command" : "secondary"}
              size="lg"
              className="mt-6 w-full justify-center"
            >
              {plan.cta}
            </BrandLink>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
