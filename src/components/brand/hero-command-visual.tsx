"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Waveform } from "@/components/ui/waveform";

const previewLines = [
  { speaker: "לקוח", text: "זה יקר מדי בשבילנו. יש לכם משהו זול יותר?", tone: "text-white/70" },
  { speaker: "את/ה", text: "השאלה היא לא המחיר, אלא מה עולה לכם לא לפתור את זה עכשיו.", tone: "text-accent" },
  { speaker: "מאמן שטח", text: "שמירה על פריים. אל תתנצל/י על המחיר.", tone: "text-amber-400/90" },
];

const previewScores = [
  { label: "פריים", value: 86, trend: "+4" },
  { label: "סמכות", value: 84, trend: "+2" },
  { label: "ודאות", value: 89, trend: "+6" },
];

const topClosers = [
  { rank: 1, name: "אורי ש.", score: 984 },
  { rank: 2, name: "נועה ג.", score: 971 },
  { rank: 3, name: "יוסי ל.", score: 956 },
];

export function HeroCommandVisual() {
  return (
    <div className="hero-preview-shell relative mx-auto w-full max-w-xl lg:max-w-none">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="absolute -top-3 start-0 z-20 hidden border border-white/10 bg-black/80 px-3 py-2 backdrop-blur-md sm:block"
      >
        <div className="font-brand text-[8px] text-muted-foreground">מובילים השבוע</div>
        <div className="mt-1 flex gap-3">
          {topClosers.map((c) => (
            <span key={c.rank} className="text-[10px] text-white/70">
              <span className="text-accent">#{c.rank}</span> {c.name}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="hero-preview-card relative overflow-hidden rounded-sm border border-white/10"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-white/20 to-transparent" />

        <div className="border-b border-white/5 bg-black/60 px-5 py-4 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <motion.span
                className="size-2 rounded-full bg-red-500"
                animate={{ opacity: [1, 0.35, 1], scale: [1, 1.15, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <span className="font-brand text-[10px] text-red-400">סימולציה חיה</span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/arena"
                className="font-brand text-[9px] text-accent transition-colors hover:text-white"
              >
                אתגר שבועי · CFO
              </Link>
              <span className="font-brand text-[10px] text-muted-foreground">סשן #2847</span>
            </div>
          </div>
          <p className="mt-3 font-display text-base font-bold text-white sm:text-lg">
            קונה דומיננטי · עסקה גבוהה
          </p>
        </div>

        <div className="space-y-4 p-5 sm:p-6">
          <div className="relative overflow-hidden border border-white/5 bg-black/50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">טונality · סמכות</span>
              <span className="font-brand text-[9px] text-green-400/90">● מיקרופון פעיל</span>
            </div>
            <Waveform bars={48} active intense className="h-16 sm:h-[4.5rem]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <div className="space-y-3 border border-white/5 bg-black/40 p-4">
            {previewLines.map((line, i) => (
              <motion.div
                key={line.speaker}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.12 }}
                className="text-sm leading-relaxed"
              >
                <span className="font-brand text-[9px] text-muted-foreground">{line.speaker}</span>
                <p className={`mt-1 ${line.tone}`}>{line.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {previewScores.map((score, i) => (
              <motion.div
                key={score.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.08 }}
                className="border border-white/5 bg-black/50 px-3 py-3 text-center"
              >
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-display text-xl font-black text-white sm:text-2xl">
                    {score.value}
                  </span>
                  <span className="font-brand text-[9px] text-green-400">{score.trend}</span>
                </div>
                <div className="mt-0.5 text-[10px] text-muted-foreground">{score.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/5 bg-black/70 px-5 py-3">
          <span className="font-brand text-[9px] text-muted-foreground">ציון לחץ</span>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-20 overflow-hidden bg-white/5">
              <motion.div
                className="h-full bg-gradient-to-l from-red-500 to-accent"
                initial={{ width: 0 }}
                animate={{ width: "68%" }}
                transition={{ duration: 1.2, delay: 1 }}
              />
            </div>
            <span className="font-display text-sm font-black text-white">68</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute -bottom-2 -end-2 z-20 border border-accent/20 bg-black/90 px-3 py-2 backdrop-blur-md sm:-end-4"
      >
        <div className="font-brand text-[8px] text-accent">לוחמים מחוברים</div>
        <div className="mt-0.5 text-xs font-semibold text-white">847 פעילים עכשיו</div>
      </motion.div>
    </div>
  );
}
