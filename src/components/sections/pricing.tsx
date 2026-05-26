"use client";

import { Section } from "@/components/ui/section";
import { BrandLink } from "@/components/brand/brand-link";
import { cn } from "@/lib/utils";
import { SectionAtmosphere } from "@/components/ui/cinematic-bg";

const plans = [
  {
    id: "solo",
    level: "רמה 1",
    name: "מפעיל עצמאי",
    subtitle: "SOLO OPERATOR",
    price: "₪189",
    period: "/חודש",
    description: "תיאוריה בלי הגבלה. 90 דקות אימון קולי בחודש. בלי זירה.",
    idealFor: "מי שרוצה ללמוד יסודות, לזכור תשובות, ולהתאמן בקול בקצב שלו.",
    features: [
      "90 דקות אימון קולי בחודש. כמה שיחות שתרצו, עד שנגמר הזמן",
      "מבחן תיאוריה ללא הגבלה. תשובות אמריקאיות על התנגדויות",
      "איך פותחים שיחה, מה הטעות במשפט, מה התשובה הנכונה",
      "חוזרים על שאלות עד שזוכרים. עם ציון והתקדמות",
      "סימולטור התנגדויות. מחיר, זמן, \"תשלח לי פרטים\"",
      "מאמן AI. משוב על בחירות ותשובות",
      "ניתוח ביצועים אישי + היסטוריית תרגול",
      "תמיכה בעברית",
    ],
    limitations: [
      "90 דקות קול בחודש. נגמר הזמן? רכישת דקות נוספת",
      "עד 15 דקות לשיחה",
      "ללא הזירה, דירוג וטורנירים",
      "משתמש יחיד",
    ],
    cta: "פתיחת גישה",
    highlighted: false,
  },
  {
    id: "warroom",
    level: "רמה 2",
    name: "גישת Warroom",
    subtitle: "WAR ROOM ACCESS",
    price: "₪559",
    period: "/חודש",
    description: "כל האימון. בתוך זירה חיה. כאן נמדדים באמת.",
    idealFor: "מוכר שרציני, נציג שרוצה לעלות דירוג, או מי שמחפש לחץ אמיתי.",
    features: [
      "כל מה שברמה 1, עם יותר זמן קול",
      "360 דקות אימון קולי בחודש. 6 שעות, לפי דקות בפועל",
      "עד 20 דקות לשיחה",
      "הזירה המדורגת. לוח חי, עולים או יורדים",
      "אתגר שבועי, שליטה בפריים. אותו תרחיש לכולם",
      "טורנירים שבועיים, רצף ניצחונות ותגים עילית",
      "פרסונות קונים מתקדמות. קונה סמכותי, רכש עוין, יזם",
      "סימולציות קרב + רמות לחץ 1 עד 5",
      "ניתוח מתקדם. פריים, טון, התנגדויות, סגירה",
      "השוואה לממוצע בזירה + דירוג ציבורי",
    ],
    limitations: [
      "360 דקות קול בחודש. נגמר הזמן? רכישת דקות נוספת",
    ],
    cta: "כניסה ל Warroom",
    highlighted: true,
  },
  {
    id: "command",
    level: "רמה 3",
    name: "מרכז פיקוד",
    subtitle: "COMMAND CENTER",
    price: "מותאם",
    period: "",
    description: "לצוות שלם. שליטה, מדידה, והטמעה ארגונית.",
    idealFor: "צוות מכירות, מנהל מכירות, או ארגון שרוצה סטנדרט אחיד.",
    features: [
      "כל מה שברמה 2. לכל המפעילים בצוות",
      "מושבים לפי גודל צוות. ללא הגבלה בתוכנית ארגונית",
      "דשבורד פיקוד. סמכות, לחץ, ביצועי קו, מגמות",
      "ניהול מפעילים. הקצאת אימונים, יעדים, מעקב",
      "אנליטיקת צוות + דוחות למנהלים",
      "אינטגרציות. HubSpot, Salesforce, Gong",
      "SSO + SAML + הטמעה ארגונית מלאה",
      "מנהל תיק ייעודי, SLA, והדרכת הטמעה",
    ],
    cta: "בקשת סיווג ארגוני",
    highlighted: false,
  },
];

const minuteTopUps = [
  { minutes: 30, price: "₪59" },
  { minutes: 60, price: "₪99" },
  { minutes: 120, price: "₪169" },
];

function HudChip({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-0.5 font-brand text-[8px] tracking-[0.12em]",
        accent
          ? "border-accent/30 bg-accent/10 text-accent"
          : "border-white/10 bg-white/[0.02] text-white/40",
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
          <p className="font-brand text-[10px] tracking-[0.2em] text-accent">
            רמות גישה
          </p>
          <h2 className="mt-4 font-display text-3xl font-black text-white sm:text-4xl">
            בחרו רמה. היכנסו למערכת.
          </h2>
        </div>
      )}

      <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-8 xl:gap-10">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "relative flex flex-col border border-white/[0.06] p-8 transition-all sm:p-10",
              plan.highlighted
                ? "pricing-tier-active z-10 lg:scale-[1.03] lg:-my-1"
                : "pricing-tier-muted",
            )}
          >
            <div className="mb-6">
              <HudChip accent={plan.highlighted}>{plan.level}</HudChip>
            </div>

            <p
              className={cn(
                "font-brand text-[9px] tracking-[0.15em]",
                plan.highlighted ? "text-white/45" : "text-white/40",
              )}
              dir="ltr"
            >
              {plan.subtitle}
            </p>
            <h3
              className={cn(
                "mt-2 font-display text-2xl font-black sm:text-3xl",
                plan.highlighted ? "text-white" : "text-white/85",
              )}
            >
              {plan.name}
            </h3>
            <p
              className={cn(
                "mt-4 text-sm leading-relaxed",
                plan.highlighted ? "text-white/55" : "text-white/50",
              )}
            >
              {plan.description}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-white/35">
              {plan.idealFor}
            </p>

            <div
              className={cn(
                "my-7 flex items-baseline gap-1 border-b pb-7 sm:my-8",
                plan.highlighted ? "border-white/10" : "border-white/[0.08]",
              )}
            >
              <span
                className={cn(
                  "font-display text-4xl font-black sm:text-5xl",
                  plan.highlighted ? "text-white" : "text-white/75",
                )}
              >
                {plan.price}
              </span>
              {plan.period && (
                <span className="text-white/40">{plan.period}</span>
              )}
            </div>

            <p className="mb-3 font-brand text-[9px] tracking-[0.12em] text-accent/70">
              מה כלול
            </p>
            <ul className="flex flex-1 flex-col gap-3">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className={cn(
                    "flex items-start gap-2.5 text-sm leading-relaxed",
                    plan.highlighted ? "text-white/80" : "text-white/58",
                  )}
                >
                  <span
                    className={cn(
                      "mt-2 size-1.5 shrink-0",
                      plan.highlighted ? "bg-accent" : "bg-white/35",
                    )}
                  />
                  {feature}
                </li>
              ))}
            </ul>

            {"limitations" in plan && plan.limitations && (
              <div className="mt-6 border-t border-white/[0.06] pt-5">
                <p className="mb-3 font-brand text-[9px] tracking-[0.12em] text-white/30">
                  לא כלול
                </p>
                <ul className="flex flex-col gap-2">
                  {plan.limitations.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs leading-relaxed text-white/35"
                    >
                      <span className="mt-1.5 size-1 shrink-0 bg-white/20" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <BrandLink
              href={plan.highlighted ? "/dashboard" : "/login"}
              variant={plan.highlighted ? "command" : "secondary"}
              size="lg"
              className="mt-8 w-full justify-center"
            >
              {plan.cta}
            </BrandLink>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-14 max-w-3xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
        <h3 className="font-display text-lg font-bold text-white sm:text-xl">
          נגמר הזמן? דקות נוספות
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/45">
          רכישה חד פעמית. נוסף ליתרה שלך מיד. לכל רמות המנוי.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {minuteTopUps.map((pack) => (
            <div
              key={pack.minutes}
              className="border border-white/[0.08] bg-black/40 p-4 text-center"
            >
              <p className="font-display text-2xl font-black text-white">{pack.minutes}</p>
              <p className="text-xs text-white/40">דקות קול</p>
              <p className="mt-2 font-display text-lg font-bold text-accent">{pack.price}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
