"use client";

import { motion } from "framer-motion";
import { useSimulation } from "@/components/product/simulation-provider";
import { Waveform } from "@/components/ui/waveform";
import { TacticalScanLine, TacticalSignalBars } from "@/components/ui/tactical-signal";
import { BehaviorModeBadge } from "@/components/product/frame-control-indicator";
import { PressureLevelBadge } from "@/components/product/client-persona-badge";
import { BEHAVIOR_LABELS } from "@/components/product/demo-data";

const phaseLabels = {
  connecting: { label: "מתחבר...", color: "text-yellow-400", dot: "bg-yellow-400" },
  live: { label: "סימולציה פעילה", color: "text-green-400", dot: "bg-green-400" },
  analyzing: { label: "ניתוח פסיכולוגי", color: "text-red-400", dot: "bg-red-400" },
  coaching: { label: "מאמן שטח", color: "text-red-400", dot: "bg-red-400" },
  idle: { label: "ממתין לסימולציה", color: "text-muted-foreground", dot: "bg-muted-foreground" },
};

export function SimulationStatusBar({ minimalTelemetry = false }: { minimalTelemetry?: boolean }) {
  const demo = useSimulation();
  const phase = phaseLabels[demo.phase];
  const behavior = BEHAVIOR_LABELS[demo.behaviorMode];

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-premium metallic-border relative mb-8 overflow-hidden border border-white/5 bg-black/70 p-4 backdrop-blur-xl md:p-5"
    >
      <div className="ai-scan-line pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2">
            <motion.span
              className={`size-2 rounded-full ${phase.dot}`}
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className={`font-brand text-[10px] tracking-widest ${phase.color}`}>
              {phase.label.toUpperCase()}
            </span>
          </div>

          <div className="hidden h-4 w-px bg-white/10 sm:block" />

          <div className="flex items-center gap-2">
            <span className="font-brand text-[9px] text-muted-foreground">SESSION</span>
            <span className="font-brand text-sm text-white">#2847</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-brand text-[9px] text-muted-foreground">ELAPSED</span>
            <motion.span
              key={demo.formatElapsed()}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              className="font-brand text-sm text-accent"
            >
              {demo.formatElapsed()}
            </motion.span>
          </div>

          <BehaviorModeBadge mode={demo.behaviorMode} />

          {demo.pressureLevel && (
            <PressureLevelBadge level={demo.pressureLevel} />
          )}

          <div className="hidden items-center gap-2 border border-white/5 px-3 py-1 md:flex">
            <span className="font-brand text-[9px] text-muted-foreground">FRAME</span>
            <span className={`font-brand text-sm ${demo.scores.frameControl < 45 ? "text-red-400" : "text-green-400"}`}>
              {demo.scores.frameControl}
            </span>
          </div>

          {demo.activeObjection && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-red-500/30 bg-red-500/10 px-3 py-1"
            >
              <span className="text-[10px] text-red-400">
                {demo.activeObjection}
              </span>
            </motion.div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {demo.isThinking && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-brand text-[9px] text-red-400"
            >
              ניתוח פסיכולוגי...
            </motion.span>
          )}
          <span className={`hidden font-brand text-[9px] sm:inline ${behavior.color}`}>
            {behavior.label}
          </span>
          {minimalTelemetry ? (
            <TacticalSignalBars
              active={demo.waveformActive}
              intense={demo.isSpeaking || demo.isThinking}
              className="w-10"
            />
          ) : (
            <Waveform
              bars={16}
              intense={demo.isSpeaking || demo.isThinking}
              active={demo.waveformActive}
              className="h-6 w-20"
            />
          )}
          <div className="flex items-center gap-2 border border-green-500/20 px-3 py-1">
            <motion.span
              className="size-1.5 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-[10px] text-green-400">247 חי</span>
          </div>
        </div>
      </div>
      {minimalTelemetry && <TacticalScanLine className="mt-4" />}
    </motion.div>
  );
}
