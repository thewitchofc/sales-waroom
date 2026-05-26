"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { HudFrame } from "@/components/ui/hud-elements";
import { BrandLink } from "@/components/brand/brand-link";
import { PageHero } from "@/components/pages/page-hero";
import { Waveform } from "@/components/ui/waveform";

const modules = [
  {
    code: "סמ",
    title: "סימולציית לחץ",
    description: "קונים דומיננטיים, רמות אינטנסיבי/קרבי, בדיקות פריים וסמכות בזמן אמת.",
    status: "חי",
  },
  {
    code: "פס",
    title: "ניתוח פסיכולוגי",
    description: "שליטה בפריים, שליטה רגשית, ריאקטיבי מול מוביל, מדידה חיה בשיחה.",
    status: "מנוטר",
  },
  {
    code: "מא",
    title: "מאמן שטח",
    description: "משוב חד ולא מתנחם. חושף איבוד פריים, ודאות וטון, ברגע שזה קורה.",
    status: "פעיל",
  },
  {
    code: "פק",
    title: "מרכז פיקוד",
    description: "מדדי סמכות, תגובה ללחץ, השמעת קרב, ביצועי צוות תחת אש.",
    status: "חי",
  },
  {
    code: "קו",
    title: "מנוע טון",
    description: "ודאות, סמכות ושליטה רגשית בקול, לפני שהלקוח מרגיש חולשה.",
    status: "מנוטר",
  },
  {
    code: "אי",
    title: "אינטגרציות",
    description: "HubSpot, Salesforce, Gong, סנכרון צינור ונתוני ביצועים.",
    status: "מוכן",
  },
];

const stack = [
  { layer: "L1", name: "AI קול ודיבור", status: "פעיל" },
  { layer: "L2", name: "אינטליגנציית שיחה", status: "פעיל" },
  { layer: "L3", name: "מנוע אימון", status: "פעיל" },
  { layer: "L4", name: "אנליטיקת פיקוד", status: "פעיל" },
];

const liveSignals = [
  { label: "מודולים", value: "6/6" },
  { label: "סימולציות", value: "42" },
  { label: "מפעילים", value: "847" },
  { label: "AI", value: "מחובר" },
];

function PlatformLiveStrip() {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setPulse((p) => !p), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative border-b border-white/5">
      <div className="platform-section-bridge pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-5 py-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className={`size-1.5 rounded-full bg-accent ${pulse ? "pressure-pulse" : ""}`} />
            <span className="font-brand text-[9px] tracking-[0.15em] text-accent/80">
              מערכת הפעלה · פעילה
            </span>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {liveSignals.map((sig) => (
              <div key={sig.label} className="flex items-center gap-2">
                <span className="font-brand text-[8px] text-white/30">{sig.label}</span>
                <span className="font-brand text-[9px] text-white/70">{sig.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PlatformPageContent() {
  const [signalLevel, setSignalLevel] = useState(72);

  useEffect(() => {
    const id = setInterval(() => {
      setSignalLevel(68 + Math.floor(Math.random() * 12));
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="platform-os-shell relative">
      <div className="platform-os-atmosphere pointer-events-none absolute inset-0" aria-hidden />

      <PageHero
        compact
        label="מערכת הפעלה · SALES WAROOM"
        title="מערכת הפעלה למכירות. לא עוד כלי."
        description="Sales Waroom מחבר סימולציה, ניתוח, מאמן ופיקוד, בתשתית AI חיה שמרגישה כמו חדר מלחמה."
      />

      <PlatformLiveStrip />

      {/* Modules */}
      <section className="relative px-5 py-12 sm:px-8 sm:py-14 lg:px-12">
        <div className="platform-section-bridge pointer-events-none absolute inset-x-0 top-0 h-24" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-3 sm:mb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-brand text-[10px] tracking-[0.2em] text-accent">מודולי ליבה</p>
              <h2 className="mt-3 font-display text-2xl font-black text-white sm:text-3xl md:text-4xl">
                תשתית AI טקטית
              </h2>
            </div>
            <p className="max-w-sm text-sm text-white/40">שש שכבות · מערכת אחת · אפס פשרות</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
            {modules.map((mod, i) => (
              <GlassCard
                key={mod.code}
                delay={i * 0.06}
                premium
                className="platform-module-card group !p-6 sm:!p-7"
              >
                <div className="platform-module-sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-brand text-2xl font-bold text-accent/35 transition-colors group-hover:text-accent/55">
                      {mod.code}
                    </span>
                    <span className="flex items-center gap-1.5 border border-white/8 bg-black/40 px-2 py-0.5 font-brand text-[8px] text-accent/80">
                      <span className="size-1 rounded-full bg-accent pressure-pulse" />
                      {mod.status}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-white transition-colors group-hover:text-accent/90 sm:text-xl">
                    {mod.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/45">{mod.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Waveform + stack — cinematic centerpiece */}
      <section className="relative px-5 pb-14 pt-4 sm:px-8 sm:pb-16 lg:px-12">
        <div className="platform-section-bridge pointer-events-none absolute inset-x-0 top-0 h-px" />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <GlassCard hover={false} premium className="platform-module-card lg:col-span-5 !p-6 sm:!p-7">
              <HudFrame label="מחסנית ארכיטקטורה">
                <div className="space-y-3">
                  {stack.map((item, i) => (
                    <motion.div
                      key={item.layer}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center justify-between border border-white/6 bg-black/50 px-4 py-3.5 transition-colors hover:border-accent/15 sm:px-5 sm:py-4"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <span className="font-brand text-xs text-accent">{item.layer}</span>
                        <span className="text-sm text-white">{item.name}</span>
                      </div>
                      <span className="flex items-center gap-1.5 font-brand text-[9px] text-green-400">
                        <span className="size-1 rounded-full bg-green-400 pressure-pulse" />
                        {item.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </HudFrame>
            </GlassCard>

            <div className="platform-waveform-center relative overflow-hidden lg:col-span-7">
              <div className="pointer-events-none absolute inset-0 ai-scan-line opacity-20" />
              <div className="pointer-events-none absolute inset-0 analytics-radar-glow" />
              <div className="platform-module-sheen pointer-events-none absolute inset-0 opacity-40" />

              <div className="relative flex h-full flex-col justify-center p-6 sm:p-8 md:p-10">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="font-brand text-[10px] text-accent">אות חי · AI</span>
                    <p className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
                      תשתית פיקוד פעילה
                    </p>
                  </div>
                  <div className="text-end">
                    <p className="font-brand text-[8px] text-white/35">עוצמת אות</p>
                    <motion.p
                      key={signalLevel}
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: 1 }}
                      className="font-display text-2xl font-black text-accent"
                    >
                      {signalLevel}%
                    </motion.p>
                  </div>
                </div>

                <Waveform bars={72} intense active className="mb-6 h-20 sm:h-28 md:h-32" />

                <div className="mb-6 flex flex-wrap gap-2">
                  {["ניתוח פעיל", "קול מזוהה", "לחץ מנוטר", "מאמן AI"].map((tag) => (
                    <span
                      key={tag}
                      className="border border-white/8 bg-black/40 px-2.5 py-1 font-brand text-[8px] text-white/45"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="max-w-lg text-base leading-relaxed text-white/55">
                  הפלטפורמה רצה 24/7 עם סימולציות חיות, ניתוח AI ואימון בזמן אמת, תשתית
                  פיקוד שלא מרגישה כמו SaaS.
                </p>

                <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
                  <BrandLink href="/demo" variant="command" size="lg">
                    לדמו החי
                  </BrandLink>
                  <BrandLink href="/dashboard" variant="secondary" size="lg">
                    למרכז פיקוד
                  </BrandLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
