"use client";

import { motion } from "framer-motion";
import { Waveform } from "@/components/ui/waveform";
import { HudFrame } from "@/components/ui/hud-elements";
import { LiveTranscript } from "@/components/product/live-transcript";
import { ScoreMetersPanel } from "@/components/product/score-meters";
import { AICoachPanel } from "@/components/product/ai-coach-panel";
import { ConversationTimeline } from "@/components/product/conversation-timeline";
import { ObjectionAnalysisPanel } from "@/components/product/objection-analysis-panel";
import { FloatingActiveStats } from "@/components/product/active-users-bar";
import {
  ClientPersonaBadge,
  PressureLevelBadge,
  PersonaTraits,
} from "@/components/product/client-persona-badge";
import { BehaviorModeBadge } from "@/components/product/frame-control-indicator";
import { useSimulationOptional } from "@/components/product/simulation-provider";
import { useLiveDemo } from "@/hooks/use-live-demo";
import { TIMELINE_EVENTS } from "@/components/product/demo-data";

export function LiveCallInterface({ compact = false }: { compact?: boolean }) {
  const contextDemo = useSimulationOptional();
  const localDemo = useLiveDemo();
  const demo = contextDemo ?? localDemo;

  return (
    <div className="relative">
      {!contextDemo && <FloatingActiveStats />}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="glass-premium glass-reflection glass-shimmer metallic-border glow-accent-strong os-panel-glow relative overflow-hidden"
      >
        <div className="ai-scan-line pointer-events-none absolute inset-0 opacity-10" />

        <HudFrame label="ממשק שיחה חיה" className="relative bg-black/90 p-5 md:p-6">
          {/* Call header */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div className="flex items-center gap-4">
              <motion.div
                className="flex items-center gap-2 border border-red-500/30 bg-red-500/10 px-3 py-1.5"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(239,68,68,0)",
                    "0 0 20px rgba(239,68,68,0.2)",
                    "0 0 0 rgba(239,68,68,0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.span
                  className="size-2 rounded-full bg-red-500"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="font-brand text-[10px] text-red-400">חי</span>
              </motion.div>
              <div>
                <div className="text-sm font-semibold text-white">
                  {demo.persona?.title ?? "סימולציה פסיכולוגית · עסקה גבוהה"}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="font-brand text-[10px] text-muted-foreground">
                    סשן #2847 · FIELD TRAINING
                  </span>
                  {demo.behaviorMode && <BehaviorModeBadge mode={demo.behaviorMode} />}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              {demo.persona && <ClientPersonaBadge persona={demo.persona} />}
              {demo.pressureLevel && <PressureLevelBadge level={demo.pressureLevel} />}
              <div className="text-start">
                <motion.div
                  key={demo.formatElapsed()}
                  className="font-brand text-2xl font-bold text-white"
                >
                  {demo.formatElapsed()}
                </motion.div>
                <div className="text-[10px] text-muted-foreground">משך שיחה</div>
              </div>
              <div className="flex size-12 items-center justify-center border border-accent/20 bg-accent/5">
                <Waveform
                  bars={8}
                  intense={demo.isSpeaking || demo.isThinking}
                  active={demo.waveformActive}
                  className="h-6 w-12"
                />
              </div>
            </div>
          </div>

          {demo.persona && (
            <div className="mb-5 border border-white/5 bg-black/40 px-4 py-3">
              <PersonaTraits persona={demo.persona} />
            </div>
          )}

          <div
            className={
              compact
                ? "space-y-5"
                : "grid gap-5 lg:grid-cols-5 lg:items-stretch lg:gap-6"
            }
          >
            <div
              className={
                compact ? "" : "flex flex-col gap-5 lg:col-span-3 lg:min-h-[520px]"
              }
            >
              <div className="shrink-0 border border-white/5 bg-black/50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">טונality · סמכות Analysis</span>
                  <motion.span
                    className="font-brand text-[9px] text-green-400"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ● מיקרופון פעיל
                  </motion.span>
                </div>
                <Waveform
                  bars={compact ? 40 : 56}
                  intense={demo.isSpeaking || demo.isThinking}
                  active={demo.waveformActive}
                  className="h-16 md:h-20"
                />
              </div>

              <div className="flex min-h-[280px] flex-1 flex-col border border-white/5 bg-black/50 p-4 sm:min-h-[320px]">
                <LiveTranscript
                  messages={demo.visibleMessages}
                  isThinking={demo.isThinking}
                  activeId={demo.activeId}
                />
              </div>
            </div>

            {!compact && (
              <div className="flex flex-col gap-5 lg:col-span-2 lg:min-h-[520px]">
                <ScoreMetersPanel scores={demo.scores} behaviorMode={demo.behaviorMode ?? "leading"} />
                <ObjectionAnalysisPanel live />
                <div className="flex min-h-[180px] flex-1 flex-col border border-white/5 bg-black/40 p-4">
                  <ConversationTimeline
                    events={TIMELINE_EVENTS}
                    activeIndex={demo.timelineIndex}
                  />
                </div>
              </div>
            )}
          </div>

          {!compact && demo.visibleFeedback.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-5 border-t border-white/5 pt-5"
            >
              <AICoachPanel feedback={demo.visibleFeedback} />
            </motion.div>
          )}
        </HudFrame>
      </motion.div>
    </div>
  );
}

export function LiveCallInterfaceCompact() {
  return <LiveCallInterface compact />;
}
