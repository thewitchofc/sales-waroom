"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TranscriptMessage } from "@/components/product/demo-data";
import { AIThinkingIndicator } from "@/components/product/ai-thinking-indicator";

const typeStyles: Record<
  TranscriptMessage["type"],
  { border: string; bg: string; label: string; labelColor: string }
> = {
  prospect: {
    border: "border-white/10",
    bg: "bg-white/[0.03]",
    label: "לקוח",
    labelColor: "text-white/70",
  },
  user: {
    border: "border-accent/20",
    bg: "bg-accent/5",
    label: "אתה",
    labelColor: "text-accent",
  },
  coach: {
    border: "border-blue-400/30",
    bg: "bg-blue-500/5",
    label: "AI Coach",
    labelColor: "text-blue-400",
  },
  analysis: {
    border: "border-red-500/30",
    bg: "bg-red-500/5",
    label: "AI Analysis",
    labelColor: "text-red-400",
  },
};

interface LiveTranscriptProps {
  messages: TranscriptMessage[];
  isThinking?: boolean;
  activeId?: number;
}

export function LiveTranscript({ messages, isThinking, activeId }: LiveTranscriptProps) {
  return (
    <div className="flex h-[320px] flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.span
            className="size-2 rounded-full bg-red-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="font-brand text-[10px] text-red-400">TRANSCRIPT LIVE</span>
        </div>
        <span className="text-[10px] text-muted-foreground">ניתוח שיחה בזמן אמת</span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pe-1 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const style = typeStyles[msg.type];
            const isActive = msg.id === activeId;

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: 20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={cn(
                  "relative border p-3 transition-all",
                  style.border,
                  style.bg,
                  isActive && "ring-1 ring-accent/30 glow-accent"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="transcript-active"
                    className="absolute inset-y-0 start-0 w-0.5 bg-accent"
                  />
                )}
                <div className="mb-1.5 flex items-center justify-between">
                  <span className={cn("text-xs font-semibold", style.labelColor)}>
                    {msg.speaker}
                  </span>
                  <span className="font-brand text-[9px] text-muted-foreground">
                    {msg.timestamp}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-white/90">{msg.text}</p>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isThinking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AIThinkingIndicator />
          </motion.div>
        )}
      </div>
    </div>
  );
}
