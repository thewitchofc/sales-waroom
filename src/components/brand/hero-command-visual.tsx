"use client";

import { motion } from "framer-motion";
import { Waveform } from "@/components/ui/waveform";

const previewLines = [
  { speaker: "לקוח", text: "זה יקר מדי בשבילנו. יש לכם משהו זול יותר?", tone: "text-white/70" },
  { speaker: "את/ה", text: "השאלה היא לא המחיר, אלא מה עולה לכם לא לפתור את זה עכשיו.", tone: "text-accent" },
  { speaker: "FIELD COACH", text: "שמירה על פריים. אל תתנצל/י על המחיר.", tone: "text-amber-400/90" },
];

const previewScores = [
  { label: "Frame", value: 86 },
  { label: "Authority", value: 84 },
  { label: "Certainty", value: 89 },
];

export function HeroCommandVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="panel-surface overflow-hidden border border-white/10 bg-black/80"
      >
        <div className="border-b border-white/5 px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-red-500/80" />
              <span className="font-brand text-[10px] text-red-400">PREVIEW</span>
            </div>
            <span className="font-brand text-[10px] text-muted-foreground">SESSION #2847</span>
          </div>
          <p className="mt-3 text-sm font-semibold text-white">סימולציה · קונה דומיננטי</p>
        </div>

        <div className="space-y-5 p-5">
          <div className="border border-white/5 bg-black/50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">Tonality · Authority</span>
              <span className="font-brand text-[9px] text-green-400/80">● MIC</span>
            </div>
            <Waveform bars={40} active className="h-14 opacity-80" />
          </div>

          <div className="space-y-3 border border-white/5 bg-black/50 p-4">
            {previewLines.map((line) => (
              <div key={line.speaker} className="text-sm leading-relaxed">
                <span className="font-brand text-[9px] text-muted-foreground">{line.speaker}</span>
                <p className={`mt-1 ${line.tone}`}>{line.text}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {previewScores.map((score) => (
              <div key={score.label} className="border border-white/5 bg-black/40 px-3 py-2.5 text-center">
                <div className="font-display text-lg font-black text-white">{score.value}</div>
                <div className="mt-0.5 text-[10px] text-muted-foreground">{score.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
