"use client";

import { Waveform } from "@/components/ui/waveform";
import { LiveTranscript } from "@/components/product/live-transcript";
import { ScoreMetersPanel } from "@/components/product/score-meters";
import { AICoachPanel } from "@/components/product/ai-coach-panel";
import { ConversationTimeline } from "@/components/product/conversation-timeline";
import { ObjectionAnalysisPanel } from "@/components/product/objection-analysis-panel";
import {
  ClientPersonaBadge,
  PressureLevelBadge,
  PersonaTraits,
} from "@/components/product/client-persona-badge";
import { BehaviorModeBadge } from "@/components/product/frame-control-indicator";
import { useSimulationOptional } from "@/components/product/simulation-provider";
import { useLiveDemo } from "@/hooks/use-live-demo";
import { TIMELINE_EVENTS } from "@/components/product/demo-data";

export function LiveCallInterface({
  compact = false,
  focusedWaveform = false,
  simple = false,
}: {
  compact?: boolean;
  focusedWaveform?: boolean;
  simple?: boolean;
}) {
  const contextDemo = useSimulationOptional();
  const localDemo = useLiveDemo();
  const demo = contextDemo ?? localDemo;
  const isCompact = compact || simple;

  if (simple) {
    return (
      <div className="border border-white/[0.06] bg-black/40">
        <div className="flex items-center justify-between border-b border-white/[0.04] px-4 py-3 sm:px-5">
          <div>
            <p className="text-sm font-medium text-white">שיחת תרגול</p>
            <p className="text-xs text-white/40">
              {demo.persona?.title ?? "לקוח AI, עסקה לדוגמה"}
            </p>
          </div>
          <p className="font-brand text-lg text-white/80">
            {demo.formatElapsed()}
          </p>
        </div>
        <div className="min-h-[320px] p-4 sm:p-5">
          <p className="mb-3 text-xs text-white/35">תמלול השיחה</p>
          <LiveTranscript
            messages={demo.visibleMessages}
            isThinking={demo.isThinking}
            activeId={demo.activeId}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="glass-premium relative overflow-hidden">
        <div className="relative bg-black/90 p-5 md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.04] pb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 border border-red-500/15 bg-red-500/5 px-3 py-1.5">
                <span className="size-2 rounded-full bg-red-500/70" />
                <span className="font-brand text-[10px] text-red-400/80">
                  חי
                </span>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  {demo.persona?.title ?? "סימולציה, עסקה גבוהה"}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  {demo.behaviorMode && (
                    <BehaviorModeBadge mode={demo.behaviorMode} />
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              {demo.persona && <ClientPersonaBadge persona={demo.persona} />}
              {demo.pressureLevel && (
                <PressureLevelBadge level={demo.pressureLevel} />
              )}
              <div className="text-start">
                <div className="font-brand text-2xl font-bold text-white">
                  {demo.formatElapsed()}
                </div>
                <div className="text-[10px] text-white/35">משך שיחה</div>
              </div>
              {focusedWaveform ? (
                <div className="flex flex-col items-center gap-1 border border-white/8 bg-black/50 px-2 py-1.5">
                  <span
                    className={`size-2 rounded-full ${
                      demo.waveformActive ? "bg-accent/70" : "bg-white/25"
                    }`}
                  />
                </div>
              ) : (
                <div className="flex size-12 items-center justify-center border border-white/[0.08]">
                  <Waveform
                    bars={8}
                    intense={demo.isSpeaking || demo.isThinking}
                    active={demo.waveformActive}
                    className="h-6 w-12"
                  />
                </div>
              )}
            </div>
          </div>

          {demo.persona && !isCompact && (
            <div className="mb-5 border border-white/[0.05] bg-black/40 px-4 py-3">
              <PersonaTraits persona={demo.persona} />
            </div>
          )}

          <div
            className={
              isCompact
                ? "space-y-5"
                : "grid gap-5 lg:grid-cols-5 lg:items-stretch lg:gap-6"
            }
          >
            <div
              className={
                isCompact
                  ? ""
                  : "flex flex-col gap-5 lg:col-span-3 lg:min-h-[520px]"
              }
            >
              {!isCompact && (
                <div
                  className={
                    focusedWaveform
                      ? "demo-waveform-hero shrink-0 border border-white/[0.06] bg-black/50 p-5 md:p-6"
                      : "shrink-0 border border-white/[0.05] bg-black/50 p-4"
                  }
                >
                  <Waveform
                    bars={focusedWaveform ? 64 : 56}
                    intense={demo.isSpeaking || demo.isThinking}
                    active={demo.waveformActive}
                    className={
                      focusedWaveform ? "h-24 md:h-32 lg:h-36" : "h-16 md:h-20"
                    }
                  />
                </div>
              )}

              <div className="flex min-h-[280px] flex-1 flex-col border border-white/[0.05] bg-black/50 p-4 sm:min-h-[320px]">
                <LiveTranscript
                  messages={demo.visibleMessages}
                  isThinking={demo.isThinking}
                  activeId={demo.activeId}
                />
              </div>
            </div>

            {!isCompact && (
              <div className="flex flex-col gap-5 lg:col-span-2 lg:min-h-[520px]">
                <ScoreMetersPanel
                  scores={demo.scores}
                  behaviorMode={demo.behaviorMode ?? "leading"}
                />
                <ObjectionAnalysisPanel live />
                <div className="flex min-h-[180px] flex-1 flex-col border border-white/[0.05] bg-black/40 p-4">
                  <ConversationTimeline
                    events={TIMELINE_EVENTS}
                    activeIndex={demo.timelineIndex}
                  />
                </div>
              </div>
            )}
          </div>

          {!isCompact && demo.visibleFeedback.length > 0 && (
            <div className="mt-5 border-t border-white/[0.05] pt-5">
              <AICoachPanel feedback={demo.visibleFeedback} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function LiveCallInterfaceCompact() {
  return <LiveCallInterface compact />;
}
