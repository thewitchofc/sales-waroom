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
    code: "SIM",
    title: "סימולציית לחץ",
    description: "קונים דומיננטיים, רמות INTENSE/COMBAT, בדיקות frame ו-authority בזמן אמת.",
  },
  {
    code: "PSYCH",
    title: "ניתוח פסיכולוגי",
    description: "Frame dominance, emotional control, reactive vs leading, מדידה חיה בשיחה.",
  },
  {
    code: "COACH",
    title: "FIELD COACH",
    description: "משוב חד ולא מתנחם. חושף איבוד פריים, certainty ו-tonality, ברגע שזה קורה.",
  },
  {
    code: "CMD",
    title: "מרכז פיקוד",
    description: "Authority metrics, pressure response, replay, ביצועי צוות תחת אש.",
  },
  {
    code: "VOX",
    title: "Tonality Engine",
    description: "Certainty, authority ו-emotional control בקול, לפני שהלקוח מרגיש חולשה.",
  },
  {
    code: "INT",
    title: "אינטגרציות",
    description: "HubSpot, Salesforce, Gong, סנכרון pipeline ו-performance data.",
  },
];

const stack = [
  { layer: "L1", name: "Voice & Speech AI", status: "ACTIVE" },
  { layer: "L2", name: "Conversation Intelligence", status: "ACTIVE" },
  { layer: "L3", name: "Coaching Engine", status: "ACTIVE" },
  { layer: "L4", name: "Command Analytics", status: "ACTIVE" },
];

export function PlatformPageContent() {
  return (
    <>
      <PageHero
        label="PLATFORM OVERVIEW"
        title="מערכת הפעלה למכירות. לא עוד כלי."
        description="Sales Waroom מחבר סימולציה, ניתוח, Coach ופיקוד, בפלטפורמה אחת שמרגישה כמו חדר מלחמה אמיתי."
      />

      <Section atmosphere>
        <SectionAtmosphere />
        <SectionHeader
          label="CORE MODULES"
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
            <HudFrame label="ARCHITECTURE STACK">
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
            <span className="font-brand text-[10px] text-accent">LIVE SYSTEM</span>
            <Waveform bars={64} intense className="my-8 h-24" />
            <p className="text-lg leading-relaxed text-white/70">
              הפלטפורמה רצה 24/7 עם סימולציות חיות, ניתוח AI ו-coaching בזמן אמת, כמו מוצר
              enterprise שכבר בשימוש.
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
