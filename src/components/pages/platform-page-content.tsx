"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionAtmosphere } from "@/components/ui/cinematic-bg";
import { HudFrame } from "@/components/ui/hud-elements";
import { BrandLink } from "@/components/brand/brand-link";
import { PageHero } from "@/components/pages/page-hero";
import { Waveform } from "@/components/ui/waveform";

const modules = [
  {
    code: "סמ",
    title: "סימולציית לחץ",
    description: "קונים דומיננטיים, רמות אינטנסיבי/קרבי, בדיקות פריים ו-סמכות בזמן אמת.",
  },
  {
    code: "פס",
    title: "ניתוח פסיכולוגי",
    description: "שליטה בפריים, שליטה רגשית, ריאקטיבי מול מוביל, מדידה חיה בשיחה.",
  },
  {
    code: "מא",
    title: "מאמן שטח",
    description: "משוב חד ולא מתנחם. חושף איבוד פריים, ודאות ו-טונality, ברגע שזה קורה.",
  },
  {
    code: "פק",
    title: "מרכז פיקוד",
    description: "מדדי סמכות, תגובה ללחץ, השמעה חוזרת, ביצועי צוות תחת אש.",
  },
  {
    code: "קו",
    title: "מנוע טונality",
    description: "ודאות, סמכות ו-שליטה רגשית בקול, לפני שהלקוח מרגיש חולשה.",
  },
  {
    code: "אי",
    title: "אינטגרציות",
    description: "HubSpot, Salesforce, Gong, סנכרון צינור ו-נתוני ביצועים.",
  },
];

const stack = [
  { layer: "L1", name: "AI קול ודיבור", status: "פעיל" },
  { layer: "L2", name: "אינטליגנציית שיחה", status: "פעיל" },
  { layer: "L3", name: "מנוע אימון", status: "פעיל" },
  { layer: "L4", name: "אנליטיקת פיקוד", status: "פעיל" },
];

export function PlatformPageContent() {
  return (
    <>
      <PageHero
        label="סקירת פלטפורמה"
        title="מערכת הפעלה למכירות. לא עוד כלי."
        description="Sales Waroom מחבר סימולציה, ניתוח, מאמן ופיקוד, בפלטפורמה אחת שמרגישה כמו חדר מלחמה אמיתי."
      />

      <Section atmosphere>
        <SectionAtmosphere />
        <SectionHeader
          label="מודולי ליבה"
          title="כל מה שקלוזר עילית צריך"
          description="שש שכבות. מערכת אחת. אפס פשרות."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod, i) => (
            <GlassCard key={mod.code} delay={i * 0.08} premium>
              <span className="font-brand text-2xl font-bold text-accent/30">{mod.code}</span>
              <h3 className="mt-4 font-display text-xl font-bold text-white">{mod.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{mod.description}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section className="py-24">
        <div className="grid gap-10 lg:grid-cols-2">
          <GlassCard hover={false} premium className="p-8">
            <HudFrame label="מחסנית ארכיטקטורה">
              <div className="space-y-4">
                {stack.map((item, i) => (
                  <motion.div
                    key={item.layer}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between border border-white/5 bg-black/40 px-5 py-4"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-brand text-xs text-accent">{item.layer}</span>
                      <span className="text-sm text-white">{item.name}</span>
                    </div>
                    <span className="font-brand text-[9px] text-green-400">{item.status}</span>
                  </motion.div>
                ))}
              </div>
            </HudFrame>
          </GlassCard>

          <div className="glass-premium metallic-border flex flex-col justify-center p-8 md:p-10">
            <span className="font-brand text-[10px] text-accent">מערכת חיה</span>
            <Waveform bars={64} intense className="my-8 h-24" />
            <p className="text-lg leading-relaxed text-white/70">
              הפלטפורמה רצה 24/7 עם סימולציות חיות, ניתוח AI ואימון בזמן אמת, כמו מוצר
              ארגוני שכבר בשימוש.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <BrandLink href="/demo" variant="command">
                לדמו החי
              </BrandLink>
              <BrandLink href="/dashboard" variant="secondary">
                לדשבורד
              </BrandLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
