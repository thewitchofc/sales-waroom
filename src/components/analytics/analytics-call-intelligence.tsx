"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Waveform } from "@/components/ui/waveform";
import { HudFrame } from "@/components/ui/hud-elements";
import {
  ANALYTICS_SESSION,
  CALL_TIMELINE_EVENTS,
} from "@/config/analytics-intelligence-data";

const eventColors: Record<string, string> = {
  drop: "border-red-500/30 text-red-400",
  panic: "border-red-500/40 text-red-400",
  hesitation: "border-orange-400/30 text-orange-300",
  recovery: "border-green-500/30 text-green-400",
  momentum: "border-accent/40 text-accent",
  spike: "border-accent/30 text-accent",
};

export function AnalyticsCallIntelligence() {
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.35));
    }, 100);
    return () => clearInterval(id);
  }, [playing]);

  const currentSeconds = Math.floor((progress / 100) * 198);
  const currentTime = formatTime(currentSeconds);

  return (
    <section className="relative border-y border-white/5 px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="pointer-events-none absolute inset-0 command-grid opacity-[0.04]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-brand text-[10px] tracking-[0.2em] text-accent">מודיעין שיחה</p>
            <h2 className="mt-3 font-display text-3xl font-black text-white sm:text-4xl">
              השמעת קרב · {ANALYTICS_SESSION.label}
            </h2>
            <p className="mt-4 max-w-lg text-sm text-white/45 sm:text-base">
              AI משחזר את השיחה. כל ירידת סמכות, כל היסוס, כל קפיצת מומנטום, חשוף.
            </p>
          </div>
          <div className="flex items-center gap-2 border border-red-500/20 bg-red-500/5 px-3 py-2">
            <span className="pressure-pulse size-1.5 rounded-full bg-red-500" />
            <span className="font-brand text-[9px] text-red-400/90">ניתוח חי פעיל</span>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <HudFrame label="גל קול">
              <div className="analytics-replay-panel relative overflow-hidden p-6 sm:p-8">
                <div className="pointer-events-none absolute inset-0 ai-scan-line opacity-15" />
                <div className="relative">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="font-brand text-[9px] text-white/40">סימולציה · קונה עוין</p>
                      <p className="mt-1 font-display text-lg font-bold text-white">
                        שיחה #{ANALYTICS_SESSION.id}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setPlaying(!playing)}
                        className="flex size-10 items-center justify-center border border-white/10 bg-white/5 hover:border-accent/30"
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
                      <span className="font-brand text-xs text-white/35">/ {ANALYTICS_SESSION.duration}</span>
                    </div>
                  </div>

                  <Waveform bars={72} intense active={playing} className="mb-6 h-20 md:h-24" />

                  <div className="relative mb-2 h-2 bg-white/5">
                    <motion.div
                      className="absolute inset-y-0 end-0 bg-gradient-to-l from-red-500 via-accent to-green-500"
                      style={{ width: `${progress}%` }}
                    />
                    {CALL_TIMELINE_EVENTS.map((ev) => {
                      const at = timeToPercent(ev.time);
                      return (
                        <div
                          key={ev.id}
                          className={`absolute top-1/2 size-2 -translate-y-1/2 rounded-full border border-black ${
                            progress >= at ? "bg-red-400" : "bg-white/20"
                          }`}
                          style={{ insetInlineEnd: `${at}%` }}
                          title={ev.label}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </HudFrame>
          </div>

          <div className="lg:col-span-5">
            <p className="mb-4 font-brand text-[9px] tracking-[0.15em] text-white/40">
              ציר זמן · אירועים
            </p>
            <div className="space-y-0 border border-white/8">
              {CALL_TIMELINE_EVENTS.map((ev, i) => {
                const at = timeToPercent(ev.time);
                const active = progress >= at;
                return (
                  <motion.div
                    key={ev.id}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className={`flex items-center gap-4 border-b border-white/5 px-5 py-4 last:border-b-0 sm:px-6 sm:py-5 ${
                      active ? "bg-red-500/[0.04]" : ""
                    }`}
                  >
                    <span
                      className={`font-brand text-xs ${active ? "text-accent" : "text-white/30"}`}
                      dir="ltr"
                    >
                      {ev.time}
                    </span>
                    <span className="text-white/20">—</span>
                    <span
                      className={`flex-1 text-sm font-medium ${
                        active ? "text-white" : "text-white/50"
                      }`}
                    >
                      {ev.label}
                    </span>
                    {active && (
                      <span className="pressure-pulse size-1.5 rounded-full bg-red-500" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {CALL_TIMELINE_EVENTS.map((ev) => {
            const at = timeToPercent(ev.time);
            return (
              <span
                key={ev.id}
                className={`border px-3 py-1.5 text-[11px] transition-all ${
                  progress >= at
                    ? `${eventColors[ev.type]} analytics-event-active`
                    : "border-white/5 text-white/25"
                }`}
              >
                {ev.time} · {ev.label}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function timeToPercent(time: string) {
  const [m, s] = time.split(":").map(Number);
  const total = 3 * 60 + 18;
  const seconds = m * 60 + s;
  return (seconds / total) * 100;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
