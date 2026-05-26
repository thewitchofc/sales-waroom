"use client";

import { Section } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";

const operatorReports = [
  {
    logId: "OP 2847",
    session: "קרבי, 12 דק'",
    outcome: "סגירת Enterprise",
    delta: "פריים +12, סמכות +9",
    metric: "פי 2.4 בסגירות",
    quote:
      "דוח מבצעי: מעבר מהיסוס על מחיר לשליטה בפריים. סגירה תוך 6 שבועות לאחר 14 סשנים.",
    operator: "מרקוס חן",
    unit: "יחידת Enterprise",
    tier: "עילית",
    featured: true,
  },
  {
    logId: "OP 1902",
    session: "אינטנסיבי, 9 דק'",
    outcome: "94% אימוץ צוות",
    delta: "ירידת לחץ 18, ביטחון +22",
    metric: "847 סשנים צוות",
    quote:
      "לוג אימון: הצוות עבר מריאקטיביות לשליטה תחת לקוחות עוינים. אימוץ מלא תוך רבעון.",
    operator: "שרה לוי",
    unit: "VP מכירות, Fintech",
    tier: "מפקדת",
    featured: false,
  },
  {
    logId: "OP 3311",
    session: "עילית, 11 דק'",
    outcome: "+2.1M$ צינור",
    delta: "ודאות +14, התנגדות +8",
    metric: "דירוג #4 → #2",
    quote:
      "דוח ביצועים: ה AI חשף חולשות לפני שהלקוח הרגיש. לא עוד תסריטים. שיחות אמיתיות.",
    operator: "ג'יימס אוקונקו",
    unit: "ארגוני גלובלי",
    tier: "לוחם",
    featured: false,
  },
];

function ReportCard({
  report,
  index,
  className,
}: {
  report: (typeof operatorReports)[number];
  index: number;
  className?: string;
}) {
  return (
    <GlassCard
      delay={index * 0.08}
      className={`flex flex-col border border-white/5 bg-black/40 ${className ?? ""}`}
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2 border-b border-white/5 pb-4">
        <div>
          <div className="font-brand text-[9px] text-muted-foreground">
            דוח לוחם, {report.logId}
          </div>
          <div className="mt-1 text-xs text-accent">{report.session}</div>
        </div>
        <span className="border border-white/10 px-2 py-0.5 font-brand text-[9px] text-muted-foreground">
          {report.tier}
        </span>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 text-[10px]">
        <div className="border border-white/5 bg-white/[0.02] px-3 py-2">
          <div className="text-muted-foreground">תוצאה</div>
          <div className="mt-0.5 font-semibold text-white">
            {report.outcome}
          </div>
        </div>
        <div className="border border-white/5 bg-white/[0.02] px-3 py-2">
          <div className="text-muted-foreground">שינוי</div>
          <div className="mt-0.5 font-semibold text-green-400/90">
            {report.delta}
          </div>
        </div>
      </div>

      <p className="mb-6 flex-1 text-sm leading-[1.75] text-white/80 sm:text-base">
        {report.quote}
      </p>

      <div className="flex items-center justify-between border-t border-white/5 pt-4">
        <div>
          <div className="text-sm font-semibold text-white">
            {report.operator}
          </div>
          <div className="text-[10px] text-muted-foreground">{report.unit}</div>
        </div>
        <span className="font-brand text-[10px] text-accent">
          {report.metric}
        </span>
      </div>
    </GlassCard>
  );
}

export function Testimonials() {
  const featured = operatorReports.find((r) => r.featured)!;
  const rest = operatorReports.filter((r) => !r.featured);

  return (
    <Section
      id="testimonials"
      className="border-t border-white/5 py-16 sm:py-20"
    >
      <div className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="mb-2 font-brand text-[10px] tracking-[0.2em] text-accent">
            דוחות לוחמים
          </p>
          <h2 className="font-display text-3xl font-black text-white sm:text-4xl">
            לא המלצות.
            <span className="mt-1 block text-white/50">תוצאות שטח.</span>
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground lg:col-span-5 lg:text-end">
          לוגים אמיתיים מלוחמים שעברו אימון תחת לחץ והעלו ביצועים.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
        <ReportCard
          report={featured}
          index={0}
          className="lg:col-span-7 lg:min-h-[320px]"
        />
        <div className="flex flex-col gap-5 lg:col-span-5">
          {rest.map((report, i) => (
            <ReportCard key={report.logId} report={report} index={i + 1} />
          ))}
        </div>
      </div>
    </Section>
  );
}
