"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSimulationOptional } from "@/components/product/simulation-provider";
import type { ObjectionScenario } from "@/components/product/demo-data";

const severityColors = {
  HIGH: "text-red-400 border-red-500/30",
  MED: "text-accent border-accent/30",
  CRIT: "text-red-500 border-red-500/50",
};

interface ObjectionAnalysisPanelProps {
  scenario?: ObjectionScenario | null;
  live?: boolean;
}

export function ObjectionAnalysisPanel({ scenario, live = false }: ObjectionAnalysisPanelProps) {
  const simulation = useSimulationOptional();
  const activeObjection = live ? simulation?.activeObjection : scenario?.type;
  const isAnalyzing = live && simulation?.isThinking;

  return (
    <div className="glass-premium metallic-border relative overflow-hidden bg-black/60 p-5 md:p-6">
      <div className="ai-scan-line pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative">
        <div className="mb-5 flex items-center justify-between">
          <span className="font-brand text-[10px] tracking-widest text-accent">
            OBJECTION PSYCHOLOGY
          </span>
          <motion.span
            className={cn(
              "flex items-center gap-1.5 text-[10px]",
              isAnalyzing ? "text-accent" : "text-green-400"
            )}
            animate={isAnalyzing ? { opacity: [1, 0.4, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                isAnalyzing ? "bg-accent" : "bg-green-400"
              )}
            />
            {isAnalyzing ? "מנתח..." : "● פעיל"}
          </motion.span>
        </div>

        {scenario ? (
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="border border-white/5 bg-white/[0.02] p-4">
              <p className="text-base leading-relaxed text-white/90">
                &laquo;{scenario.text}&raquo;
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="border border-accent/20 px-2 py-0.5 text-xs text-accent">
                  {scenario.type}
                </span>
                <span
                  className={cn(
                    "border px-2 py-0.5 font-brand text-[9px]",
                    severityColors[scenario.severity]
                  )}
                >
                  {scenario.severity}
                </span>
              </div>
            </div>

            <div>
              <div className="mb-2 font-brand text-[9px] text-muted-foreground">
                PSYCHOLOGY
              </div>
              <p className="text-sm leading-relaxed text-red-400/90">{scenario.psychology}</p>
            </div>

            <div>
              <div className="mb-2 font-brand text-[9px] text-muted-foreground">
                AUTHORITY ANALYSIS
              </div>
              <p className="text-sm leading-relaxed text-white/75">{scenario.analysis}</p>
            </div>

            <div className="border border-green-500/20 bg-green-500/5 p-4">
              <div className="mb-2 font-brand text-[9px] text-green-400">
                SUGGESTED RESPONSE
              </div>
              <p className="text-sm leading-relaxed text-white/85">
                {scenario.suggestedResponse}
              </p>
            </div>

            <div className="flex items-center justify-between border border-white/5 px-4 py-3">
              <span className="text-xs text-muted-foreground">השפעה על ציון</span>
              <span className="font-display text-lg font-bold text-red-400">
                {scenario.scoreImpact}
              </span>
            </div>
          </motion.div>
        ) : live && activeObjection ? (
          <motion.div
            key={activeObjection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="h-2 flex-1 overflow-hidden bg-white/5"
                animate={isAnalyzing ? { opacity: [0.5, 1, 0.5] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <motion.div
                  className="h-full bg-gradient-to-l from-red-500 to-accent"
                  animate={{ width: ["20%", "85%", "60%"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <span className="font-brand text-sm text-white">{activeObjection}</span>
            </div>
            <p className="text-sm text-white/60">
              {isAnalyzing
                ? "מנתח frame test ו-pressure response..."
                : "מעקב אחר התנגדות פעילה · בדיקת dominance"}
            </p>
          </motion.div>
        ) : (
          <p className="text-sm text-muted-foreground">בחר התנגדות לניתוח AI</p>
        )}
      </div>
    </div>
  );
}
