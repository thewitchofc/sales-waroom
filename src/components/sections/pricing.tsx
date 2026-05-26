"use client";

import { Section } from "@/components/ui/section";
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
    liveUsers: 847,
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

      <div className="grid items-center gap-6 lg:grid-cols-3 lg:gap-8 xl:gap-10">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "relative flex flex-col border border-white/[0.06] p-8 transition-all sm:p-10",
              plan.highlighted
                ? "pricing-tier-active z-10 lg:scale-[1.06] lg:-my-2"
                : "pricing-tier-muted"
            )}
          >
            {plan.highlighted && (
              <div className="absolute end-4 top-4 flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-accent/80" />
                <span className="font-brand text-[8px] text-accent/80">חי</span>
              </div>
            )}

            <div className="mb-6 flex flex-wrap gap-2">
              <HudChip accent={plan.highlighted}>{plan.accessLevel}</HudChip>
              <HudChip>{plan.operatorClass}</HudChip>
            </div>

            <p
              className={cn(
                "font-brand text-[9px] tracking-[0.15em]",
                plan.highlighted ? "text-white/45" : "text-white/25"
              )}
              dir="ltr"
            >
              {plan.subtitle}
            </p>
            <h3
              className={cn(
                "mt-2 font-display text-2xl font-black sm:text-3xl",
                plan.highlighted ? "text-white" : "text-white/55"
              )}
            >
              {plan.name}
            </h3>
            <p
              className={cn(
                "mt-4 text-sm leading-relaxed",
                plan.highlighted ? "text-white/55" : "text-white/30"
              )}
            >
              {plan.description}
            </p>

            <div
              className={cn(
                "my-8 flex items-baseline gap-1 border-b pb-8 sm:my-10",
                plan.highlighted ? "border-white/10" : "border-white/[0.04]"
              )}
            >
              <span
                className={cn(
                  "font-display text-4xl font-black sm:text-5xl",
                  plan.highlighted ? "text-white" : "text-white/45"
                )}
              >
                {plan.price}
              </span>
              {plan.period && (
                <span className={plan.highlighted ? "text-white/40" : "text-white/25"}>
                  {plan.period}
                </span>
              )}
            </div>

            <ul className="mb-10 flex flex-1 flex-col gap-5 sm:mb-12">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className={cn(
                    "flex items-start gap-3 text-base",
                    plan.highlighted ? "text-white/85" : "text-white/35"
                  )}
                >
                  <span
                    className={cn(
                      "mt-2 size-1.5 shrink-0",
                      plan.highlighted ? "bg-accent" : "bg-white/20"
                    )}
                  />
                  {feature}
                </li>
              ))}
            </ul>

            {plan.liveUsers && (
              <div className="mt-5 flex items-center gap-2 border-t border-accent/15 pt-4">
                <span className="size-1.5 rounded-full bg-accent/80" />
                <span className="font-brand text-[9px] text-accent/90">
                  {plan.liveUsers} מפעילים פעילים עכשיו
                </span>
              </div>
            )}

            <BrandLink
              href={plan.highlighted ? "/dashboard" : "/login"}
              variant={plan.highlighted ? "command" : "secondary"}
              size="lg"
              className={cn(
                "mt-6 w-full justify-center",
                !plan.highlighted && "opacity-70"
              )}
            >
              {plan.cta}
            </BrandLink>
          </div>
        ))}
      </div>
    </Section>
  );
}
