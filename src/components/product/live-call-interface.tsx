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
        className="glass-premium glass-reflection metallic-border glow-accent-strong os-panel-glow relative overflow-hidden"
      >
        <div className="ai-scan-line pointer-events-none absolute inset-0 opacity-10" />

        <HudFrame label="LIVE CALL INTERFACE" className="relative bg-black/90 p-5 md:p-6">
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
                <span className="font-brand text-[10px] text-red-400">LIVE</span>
              </motion.div>
              <div>
                <div className="text-sm font-semibold text-white">סימולציית לקוח קשה</div>
                <div className="font-brand text-[10px] text-muted-foreground">
                  SESSION #2847 · ENTERPRISE PROSPECT
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
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

          <div className={compact ? "space-y-5" : "grid gap-5 lg:grid-cols-5 lg:gap-6"}>
            <div className={compact ? "" : "lg:col-span-3 space-y-5"}>
              <div className="border border-white/5 bg-black/50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">AI Voice Analysis</span>
                  <motion.span
                    className="font-brand text-[9px] text-green-400"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ● MIC ACTIVE
                  </motion.span>
                </div>
                <Waveform
                  bars={compact ? 40 : 56}
                  intense={demo.isSpeaking || demo.isThinking}
                  active={demo.waveformActive}
                  className="h-16 md:h-20"
                />
              </div>

              <LiveTranscript
                messages={demo.visibleMessages}
                isThinking={demo.isThinking}
                activeId={demo.activeId}
              />
            </div>

            {!compact && (
              <div className="lg:col-span-2 space-y-5">
                <ScoreMetersPanel
                  confidence={demo.scores.confidence}
                  objection={demo.scores.objection}
                  pressure={demo.scores.pressure}
                />
                <ObjectionAnalysisPanel live />
                <div className="border border-white/5 bg-black/40 p-4">
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
