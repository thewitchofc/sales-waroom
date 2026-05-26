"use client";

import { motion } from "framer-motion";
import { SessionReplay } from "@/components/product/session-replay";
import { ConversationTimeline } from "@/components/product/conversation-timeline";
import { Waveform } from "@/components/ui/waveform";
import { HudFrame } from "@/components/ui/hud-elements";
import { useSimulationOptional } from "@/components/product/simulation-provider";
import { DEMO_TRANSCRIPT, TIMELINE_EVENTS } from "@/components/product/demo-data";

export function PlatformCommandPanel() {
  const simulation = useSimulationOptional();
  const timelineIndex = simulation?.timelineIndex ?? 0;
  const replayProgress = simulation?.replayProgress ?? 0;
  const isThinking = simulation?.isThinking ?? false;
  const visibleMessages = simulation?.visibleMessages ?? [];

  const highlightMessages =
    visibleMessages.length > 0
      ? visibleMessages.filter((m) => ["prospect", "coach", "analysis"].includes(m.type))
      : DEMO_TRANSCRIPT.filter((m) =>
          ["prospect", "coach", "analysis"].includes(m.type)
        ).slice(-4);

  return (
    <div className="flex min-h-[520px] flex-col gap-5">
      <SessionReplay progress={replayProgress} synced />

      <div className="grid flex-1 gap-5 md:grid-cols-2">
        <HudFrame
          label="TIMELINE"
          className="glass-premium metallic-border os-panel-glow min-h-[220px] bg-black/60 p-5"
        >
          <ConversationTimeline events={TIMELINE_EVENTS} activeIndex={timelineIndex} />
        </HudFrame>

        <HudFrame
          label="TRANSCRIPT"
          className="glass-premium metallic-border os-panel-glow flex min-h-[220px] flex-col bg-black/60 p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="font-brand text-[10px] tracking-widest text-muted-foreground">
              KEY MOMENTS
            </span>
            <motion.span
              className="text-[10px] text-accent"
              animate={isThinking ? { opacity: [1, 0.4, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {isThinking ? "AI מנתח..." : "ניתוח שיחה בזמן אמת"}
            </motion.span>
          </div>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto scrollbar-hide">
            {highlightMessages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`border bg-white/[0.02] p-3 transition-all ${
                  msg.id === simulation?.activeId
                    ? "border-accent/30 glow-accent ring-1 ring-accent/20"
                    : "border-white/5"
                }`}
              >
                <div className="mb-1.5 flex items-center justify-between">
                  <span
                    className={`text-xs font-semibold ${
                      msg.type === "coach"
                        ? "text-blue-400"
                        : msg.type === "analysis"
                          ? "text-red-400"
                          : "text-white/70"
                    }`}
                  >
                    {msg.speaker}
                  </span>
                  <span className="font-brand text-[9px] text-muted-foreground">
                    {msg.timestamp}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-white/80">{msg.text}</p>
              </motion.div>
            ))}
          </div>
        </HudFrame>
      </div>

      <div className="border border-white/5 bg-black/40 px-4 py-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-brand text-[9px] text-muted-foreground">
            AUDIO SIGNATURE
          </span>
          <motion.span
            className="text-[10px] text-green-400"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ● LIVE ANALYSIS
          </motion.span>
        </div>
        <Waveform
          bars={72}
          intense={simulation?.waveformActive ?? true}
          active={simulation?.waveformActive ?? true}
          className="h-10 opacity-70"
        />
      </div>
    </div>
  );
}
