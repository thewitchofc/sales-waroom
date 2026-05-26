"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Waveform } from "@/components/ui/waveform";

interface SessionReplayProps {
  progress?: number;
  synced?: boolean;
}

export function SessionReplay({ progress: externalProgress, synced = false }: SessionReplayProps) {
  const [internalProgress, setInternalProgress] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (synced || externalProgress !== undefined) return;
    if (!playing) return;
    const interval = setInterval(() => {
      setInternalProgress((p) => (p >= 100 ? 0 : p + 0.5));
    }, 100);
    return () => clearInterval(interval);
  }, [playing, synced, externalProgress]);

  const progress = externalProgress ?? internalProgress;
  const currentTime = formatTime(Math.floor((progress / 100) * 104));

  return (
    <div className="glass-premium metallic-border os-panel-glow relative min-h-[280px] overflow-hidden p-6 md:p-8">
      <div className="pointer-events-none absolute inset-0 command-grid opacity-20" />
      <div className="ai-scan-line pointer-events-none absolute inset-0 opacity-15" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.03] via-transparent to-transparent" />

      <div className="relative">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-brand text-[10px] tracking-widest text-accent">
              SESSION REPLAY
            </div>
            <div className="mt-1 text-base font-medium text-white">
              סימולציה #2847 — לקוח קשה
            </div>
          </div>
          <div className="flex items-center gap-3">
            {synced && (
              <motion.span
                className="flex items-center gap-1.5 border border-green-500/20 px-2 py-1 text-[9px] text-green-400"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="size-1 rounded-full bg-green-400" />
                SYNCED
              </motion.span>
            )}
            <button
              type="button"
              onClick={() => setPlaying(!playing)}
              className="flex size-11 items-center justify-center border border-white/10 bg-white/5 transition-colors hover:border-accent/30 hover:bg-accent/10"
              aria-label={playing ? "השהה" : "נגן"}
            >
              {playing ? (
                <svg className="size-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="size-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <span className="font-brand text-sm text-white">{currentTime}</span>
            <span className="font-brand text-xs text-muted-foreground">/ 01:44</span>
          </div>
        </div>

        <Waveform bars={72} intense active={playing} className="mb-6 h-20 md:h-24" />

        <div className="relative mb-5 h-2 bg-white/5">
          <motion.div
            className="absolute inset-y-0 end-0 bg-gradient-to-l from-red-500 via-accent to-green-500"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute top-1/2 size-3.5 -translate-y-1/2 rounded-full border-2 border-black bg-accent glow-accent"
            style={{ insetInlineEnd: `${progress}%`, transform: "translate(50%, -50%)" }}
          />
          {[25, 50, 75].map((mark) => (
            <div
              key={mark}
              className="absolute top-0 h-full w-px bg-white/10"
              style={{ insetInlineEnd: `${mark}%` }}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { label: "התנגדות: מחיר", time: "01:04", color: "border-red-500/30 text-red-400", at: 60 },
            { label: "משוב Coach", time: "01:06", color: "border-blue-400/30 text-blue-400", at: 62 },
            { label: "איבוד פריים", time: "01:44", color: "border-accent/30 text-accent", at: 95 },
          ].map((marker) => (
            <span
              key={marker.label}
              className={`border bg-black/40 px-3 py-1.5 text-[11px] transition-all ${
                progress >= marker.at ? marker.color + " glow-accent" : "border-white/5 text-white/30"
              }`}
            >
              {marker.time} · {marker.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
