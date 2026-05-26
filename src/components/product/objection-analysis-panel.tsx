"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSimulationOptional } from "@/components/product/simulation-provider";
import { SCENARIO_COMBAT_INTEL } from "@/config/training-combat-data";
import type { ObjectionScenario } from "@/components/product/demo-data";

const severityColors = {
  HIGH: "text-red-400 border-red-500/30 bg-red-500/5",
  MED: "text-accent border-accent/30 bg-accent/5",
  CRIT: "text-red-500 border-red-500/50 bg-red-500/10",
};

const severityLabels = {
  HIGH: "גבוה",
  MED: "בינוני",
  CRIT: "קריטי",
};

interface ObjectionAnalysisPanelProps {
  scenario?: ObjectionScenario | null;
  live?: boolean;
  combat?: boolean;
}

export function ObjectionAnalysisPanel({
  scenario,
  live = false,
  combat = false,
}: ObjectionAnalysisPanelProps) {
  const simulation = useSimulationOptional();
  const activeObjection = live ? simulation?.activeObjection : scenario?.type;
  const isAnalyzing = live && simulation?.isThinking;
  const intel = scenario ? SCENARIO_COMBAT_INTEL[scenario.id] : null;

  return (
    <div
      className={cn(
        "glass-premium metallic-border relative overflow-hidden bg-black/60 p-5 md:p-6",
        combat && scenario?.severity === "CRIT" && "border-red-500/25"
      )}
    >
      <div className="ai-scan-line pointer-events-none absolute inset-0 opacity-20" />
      {combat && (
        <div className="pointer-events-none absolute inset-0 analytics-classified-scan opacity-25" />
      )}

      <div className="relative">
        <div className="mb-5 flex items-center justify-between">
          <span className="font-brand text-[10px] tracking-widest text-accent">
            {combat ? "ניתוח פסיכולוגי · סיווג" : "פסיכולוגיית התנגדות"}
          </span>
          <motion.span
            className={cn(
              "flex items-center gap-1.5 text-[10px]",
              isAnalyzing ? "text-accent" : "text-red-400"
            )}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span
              className={cn(
                "size-1.5 rounded-full pressure-pulse",
                isAnalyzing ? "bg-accent" : "bg-red-500"
              )}
            />
            {isAnalyzing ? "AI מנתח..." : "● מאמן פעיל"}
          </motion.span>
        </div>

        {scenario ? (
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {combat && intel && (
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="border border-red-500/20 bg-red-500/[0.04] p-4">
                  <p className="font-brand text-[8px] text-red-400/70">התנהגות מזוהה</p>
                  <p className="mt-2 font-display text-lg font-bold text-white">{intel.behavior}</p>
                </div>
                <div className="border border-red-500/25 bg-red-500/[0.06] p-4">
                  <p className="font-brand text-[8px] text-red-400/70">תווית איום</p>
                  <p className="mt-2 font-display text-lg font-bold text-red-400">{intel.threat}</p>
                </div>
              </div>
            )}

            <div className="border border-white/5 bg-white/[0.02] p-4">
              <p className="text-base leading-relaxed text-white/90">
                &laquo;{scenario.text}&raquo;
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="border border-accent/20 px-2 py-0.5 text-xs text-accent">
                  {scenario.type}
                </span>
                <span
                  className={cn(
                    "border px-2 py-0.5 font-brand text-[9px]",
                    severityColors[scenario.severity]
                  )}
                >
                  {severityLabels[scenario.severity]}
                </span>
                {combat && (
                  <span className="border border-red-500/20 px-2 py-0.5 font-brand text-[8px] text-red-400/80">
                    סיווג · פעיל
                  </span>
                )}
              </div>
            </div>

            <div className="border border-red-500/10 bg-red-500/[0.03] p-4">
              <div className="mb-2 font-brand text-[9px] text-red-400/70">פסיכולוגיה</div>
              <p className="text-sm leading-relaxed text-red-400/90">{scenario.psychology}</p>
            </div>

            <div>
              <div className="mb-2 font-brand text-[9px] text-white/35">ניתוח סמכות</div>
              <p className="text-sm leading-relaxed text-white/75">{scenario.analysis}</p>
            </div>

            {combat && intel && (
              <div className="border border-red-500/20 bg-red-500/[0.04] p-4">
                <div className="mb-2 font-brand text-[9px] text-red-400">תיקון AI</div>
                <p className="text-sm font-medium leading-relaxed text-white/85">
                  {intel.correction}
                </p>
              </div>
            )}

            <div className="border border-green-500/20 bg-green-500/5 p-4">
              <div className="mb-2 font-brand text-[9px] text-green-400">תגובה משופרת</div>
              <p className="text-sm leading-relaxed text-white/85">
                {scenario.suggestedResponse}
              </p>
            </div>

            <div className="flex items-center justify-between border border-white/5 px-4 py-3">
              <span className="text-xs text-white/40">השפעה על ציון</span>
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
                ? "מנתח בדיקת פריים ו-תגובה ללחץ..."
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
