"use client";

import { useSimulation } from "@/components/product/simulation-provider";
import { Waveform } from "@/components/ui/waveform";
import { BehaviorModeBadge } from "@/components/product/frame-control-indicator";
import { PressureLevelBadge } from "@/components/product/client-persona-badge";
import { BEHAVIOR_LABELS } from "@/components/product/demo-data";

const phaseLabels = {
  connecting: { label: "מתחבר", color: "text-white/45" },
  live: { label: "סימולציה פעילה", color: "text-white/70" },
  analyzing: { label: "ניתוח", color: "text-white/60" },
  coaching: { label: "מאמן", color: "text-white/60" },
  idle: { label: "ממתין", color: "text-white/35" },
};

export function SimulationStatusBar({
  minimalTelemetry = false,
}: {
  minimalTelemetry?: boolean;
}) {
  const demo = useSimulation();
  const phase = phaseLabels[demo.phase];
  const behavior = BEHAVIOR_LABELS[demo.behaviorMode];

  if (minimalTelemetry) {
    return (
      <div className="flex flex-wrap items-center gap-4 border-y border-white/[0.04] py-4 text-sm">
        <span className={`font-brand text-[10px] ${phase.color}`}>
          {phase.label}
        </span>
        <span className="text-white/30">·</span>
        <span className="font-brand text-[10px] text-white/45">
          {demo.formatElapsed()}
        </span>
        <BehaviorModeBadge mode={demo.behaviorMode} />
      </div>
    );
  }

  return (
    <div className="panel-surface mb-8 border border-white/[0.06] p-4 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2">
            <span className={`size-1.5 rounded-full bg-white/40`} />
            <span className={`font-brand text-[10px] ${phase.color}`}>
              {phase.label}
            </span>
          </div>

          <div className="hidden h-4 w-px bg-white/10 sm:block" />

          <span className="font-brand text-sm text-white/70">
            {demo.formatElapsed()}
          </span>

          <BehaviorModeBadge mode={demo.behaviorMode} />

          {demo.pressureLevel && (
            <PressureLevelBadge level={demo.pressureLevel} />
          )}

          <div className="hidden items-center gap-2 md:flex">
            <span className="font-brand text-[9px] text-white/30">FRAME</span>
            <span
              className={`font-brand text-sm ${
                demo.scores.frameControl < 45
                  ? "text-red-400/80"
                  : "text-white/70"
              }`}
            >
              {demo.scores.frameControl}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] text-white/35">{behavior.labelHe}</span>
          <Waveform
            bars={12}
            intense={demo.isSpeaking || demo.isThinking}
            active={demo.waveformActive}
            className="h-4 w-16"
          />
        </div>
      </div>
    </div>
  );
}
