"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { BrandLink } from "@/components/brand/brand-link";
import { PageHero } from "@/components/pages/page-hero";

const modules = [
  {
    code: "סמ",
    title: "סימולציית לחץ",
    description: "קונים דומיננטיים, רמות אינטנסיבי/קרבי, בדיקות פריים וסמכות בזמן אמת.",
  },
  {
    code: "פס",
    title: "ניתוח פסיכולוגי",
    description: "שליטה בפריים, שליטה רגשית, ריאקטיבי מול מוביל, מדידה חיה בשיחה.",
  },
  {
    code: "מא",
    title: "מאמן שטח",
    description: "משוב חד ולא מתנחם. חושף איבוד פריים, ודאות וטון, ברגע שזה קורה.",
  },
  {
    code: "פק",
    title: "מרכז פיקוד",
    description: "מדדי סמכות, תגובה ללחץ, השמעת קרב, ביצועי צוות תחת אש.",
  },
  {
    code: "קו",
    title: "מנוע טון",
    description: "ודאות, סמכות ושליטה רגשית בקול, לפני שהלקוח מרגיש חולשה.",
  },
  {
    code: "אי",
    title: "אינטגרציות",
    description: "HubSpot, Salesforce, Gong, סנכרון צינור ונתוני ביצועים.",
  },
];

export function PlatformPageContent() {
  return (
    <>
      <PageHero
        compact
        label="פלטפורמה · SALES WAROOM"
        title="מערכת הפעלה למכירות"
        description="שש שכבות AI: סימולציה, ניתוח, מאמן, פיקוד, טון, ואינטגרציות — במערכת אחת."
      />

      <section className="px-5 py-12 sm:px-8 sm:py-14 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod, i) => (
              <GlassCard key={mod.code} delay={i * 0.04} className="!p-6">
                <span className="font-brand text-xl font-bold text-accent/40">{mod.code}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-white">{mod.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">{mod.description}</p>
              </GlassCard>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <BrandLink href="/demo" variant="command">
              לדמו החי
            </BrandLink>
            <BrandLink href="/pricing" variant="secondary">
              חבילות ותמחור
            </BrandLink>
          </div>
        </div>
      </section>
    </>
  );
}
