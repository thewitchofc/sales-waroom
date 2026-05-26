"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { HudFrame } from "@/components/ui/hud-elements";
import { SectionAtmosphere } from "@/components/ui/cinematic-bg";
import { CoachingInsightsPanel } from "@/components/product/coaching-insights-panel";
import { COACHING_INSIGHTS } from "@/components/product/demo-data";

const chartData = [40, 55, 45, 70, 65, 80, 75, 90, 85, 94];
const skills = [
  { name: "טיפול בהתנגדויות", score: 94, trend: "+12%" },
  { name: "טכניקות סגירה", score: 87, trend: "+8%" },
  { name: "שאלות גילוי", score: 91, trend: "+15%" },
  { name: "הצגת ערך", score: 82, trend: "+6%" },
];

export function AnalyticsDashboard() {
  return (
    <Section id="analytics" atmosphere>
      <SectionAtmosphere />
      <SectionHeader
        label="PERFORMANCE COMMAND"
        title="מרכז הפיקוד לשליטה מוחלטת"
        description="כל מדד. כל חולשה. כל הזדמנות. לפני שהיא הופכת לעסקה אבודה."
      />

      <div className="grid gap-8 lg:grid-cols-3">
        <GlassCard className="lg:col-span-2" hover={false} premium>
          <HudFrame label="CONFIDENCE TREND">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <h3 className="font-display text-2xl font-bold text-white">מגמת ביטחון</h3>
                <p className="mt-1 text-sm text-muted-foreground">10 האימונים האחרונים</p>
              </div>
              <div className="text-start">
                <div className="font-display text-4xl font-black text-accent">+34%</div>
                <div className="font-brand text-[10px] text-green-400">VS LAST MONTH</div>
              </div>
            </div>

            <div className="relative flex h-56 items-end gap-1 md:gap-2">
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="h-px w-full bg-white/[0.03]" />
                ))}
              </div>
              {chartData.map((value, i) => (
                <div key={i} className="group relative flex h-full flex-1 flex-col justify-end">
                  <div className="absolute -top-10 start-1/2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="border border-accent/20 bg-black px-2 py-0.5 font-brand text-[10px] text-accent">
                      {value}
                    </span>
                  </div>
                  <motion.div
                    className="relative w-full bg-gradient-to-t from-accent/10 via-accent/40 to-accent/80 transition-all group-hover:from-accent/20 group-hover:to-white/60"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${value}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: i * 0.06,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-white/30" />
                  </motion.div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between font-brand text-[10px] text-muted-foreground">
              <span>SESSION 10</span>
              <span>SESSION 01</span>
            </div>
          </HudFrame>
        </GlassCard>

        <div className="flex flex-col gap-5">
          {skills.map((skill, i) => (
            <GlassCard key={skill.name} delay={i * 0.1} premium>
              <div className="flex items-center justify-between gap-4">
                <div className="relative size-16 shrink-0">
                  <svg className="size-16 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="#d4af55"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray={`${skill.score} 100`}
                      initial={{ strokeDasharray: "0 100" }}
                      whileInView={{ strokeDasharray: `${skill.score} 100` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.1 }}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-brand text-xs text-white">
                    {skill.score}
                  </span>
                </div>
                <div className="flex-1 text-start">
                  <div className="text-sm text-muted-foreground">{skill.name}</div>
                  <div className="mt-1 font-brand text-sm text-green-400">{skill.trend}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-10"
      >
        <GlassCard hover={false} premium className="p-6">
          <CoachingInsightsPanel insights={COACHING_INSIGHTS} />
        </GlassCard>
      </motion.div>
    </Section>
  );
}
