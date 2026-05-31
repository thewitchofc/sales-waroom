"use client";

import { useState } from "react";
import { useArenaSimulation } from "@/hooks/use-arena-simulation";
import {
  ARENA_SIMULATION_LEVELS,
  type ArenaSimulationLevel,
} from "@/config/arena-simulation-prompt";
import { cn } from "@/lib/utils";

const metrics = [
  { key: "authority", label: "סמכות" },
  { key: "pressure", label: "לחץ" },
  { key: "qualification", label: "העמקה" },
  { key: "tonality", label: "טונציה" },
  { key: "emotional_control", label: "שליטה רגשית" },
  { key: "positioning", label: "מיצוב" },
  { key: "pricing_confidence", label: "ביטחון מחיר" },
  { key: "follow_up_authority", label: "מעקב סמכותי" },
  { key: "urgency", label: "דחיפות" },
  { key: "procrastination_handling", label: "דחיינות" },
] as const;

function MetricRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const weak = value < 45;

  return (
    <div className="flex items-center gap-4 py-2">
      <span className="w-24 shrink-0 text-sm text-white/50">{label}</span>
      <div className="h-px flex-1 bg-white/[0.08]">
        <div
          className={cn("h-px transition-all duration-500", weak ? "bg-red-400/80" : "bg-white/50")}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
      <span
        className={cn(
          "w-8 text-end font-display text-base font-bold tabular-nums",
          weak ? "text-red-400" : "text-white",
        )}
      >
        {value}
      </span>
    </div>
  );
}

export function ArenaSimulationDashboard() {
  const sim = useArenaSimulation("hard");
  const [mobilePanel, setMobilePanel] = useState<"chat" | "analysis">("chat");

  const hasInsights = Boolean(sim.objection || sim.correction);
  const sessionActive = sim.status !== "idle";

  return (
    <div className="arena-simulation mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-[1400px] flex-col bg-black text-white lg:min-h-[calc(100dvh-4rem)]">
      <header className="shrink-0 px-4 py-5 sm:px-8 sm:py-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs text-red-400/90">סימולציית AI</p>
            <h1 className="mt-1 font-display text-3xl font-black tracking-tight sm:text-4xl">
              חדר האימון
            </h1>
            <p className="mt-2 text-base leading-relaxed text-white/50">
              שיחה אחת במרכז. לקוח קשה. ניתוח רק כשצריך.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {sessionActive && (
              <div className="text-center sm:text-start">
                <p className="text-xs text-white/35">זמן</p>
                <p className="font-display text-2xl font-bold tabular-nums">
                  {sim.formatTimer()}
                </p>
              </div>
            )}

            <div>
              <p className="mb-1 text-xs text-white/35">רמה</p>
              <select
                value={sim.level}
                disabled={sessionActive}
                onChange={(event) =>
                  sim.setLevel(event.target.value as ArenaSimulationLevel)
                }
                className="min-w-[120px] border border-white/10 bg-black px-3 py-2 text-sm outline-none disabled:opacity-50"
              >
                {(Object.keys(ARENA_SIMULATION_LEVELS) as ArenaSimulationLevel[]).map(
                  (key) => (
                    <option key={key} value={key} className="bg-black">
                      {ARENA_SIMULATION_LEVELS[key].label}
                    </option>
                  ),
                )}
              </select>
            </div>

            {!sessionActive ? (
              <button
                type="button"
                onClick={() => void sim.startSession()}
                className="mt-5 w-full bg-red-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-500 sm:mt-0 sm:w-auto"
              >
                התחילי שיחה
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={sim.resetSession}
                  className="border border-white/10 px-4 py-2.5 text-sm text-white/60 hover:text-white"
                >
                  סיום
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setMobilePanel("chat")}
            className={cn(
              "flex-1 py-2.5 text-sm transition-colors",
              mobilePanel === "chat"
                ? "bg-white text-black"
                : "border border-white/10 text-white/60",
            )}
          >
            שיחה
          </button>
          <button
            type="button"
            onClick={() => setMobilePanel("analysis")}
            className={cn(
              "flex-1 py-2.5 text-sm transition-colors",
              mobilePanel === "analysis"
                ? "bg-white text-black"
                : "border border-white/10 text-white/60",
            )}
          >
            ניתוח
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-6 px-4 pb-6 sm:px-8 sm:pb-8 lg:flex-row lg:gap-8">
        <section
          className={cn(
            "flex min-h-0 min-h-[420px] flex-1 flex-col lg:min-h-[520px] lg:max-w-[760px]",
            mobilePanel !== "chat" && "hidden lg:flex",
          )}
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium text-white/70">השיחה</h2>
            {sim.status === "thinking" && (
              <span className="text-xs text-white/40">לקוח מגיב...</span>
            )}
            {sim.status === "live" && (
              <span className="text-xs text-red-400">● חי</span>
            )}
          </div>

          <div className="flex min-h-0 flex-1 flex-col border border-white/[0.08] bg-white/[0.02]">
            <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
              {!sessionActive && sim.transcript.length === 0 && (
                <div className="flex h-full min-h-[280px] flex-col items-center justify-center px-4 text-center">
                  <p className="max-w-sm text-lg leading-relaxed text-white/55">
                    לחצי &quot;התחילי שיחה&quot;. הלקוח יפתח קשה. את עונים קצר
                    ומוביל.
                  </p>
                </div>
              )}

              {sim.transcript.length > 0 && (
                <div className="space-y-5">
                  {sim.transcript.map((entry) => (
                    <article
                      key={entry.id}
                      className={cn(
                        "max-w-[85%]",
                        entry.speaker === "user" ? "ms-auto text-start" : "text-start",
                      )}
                    >
                      <p className="mb-1.5 text-xs text-white/35">
                        {entry.speaker === "user" ? "את/ה" : "לקוח"} · {entry.time}
                      </p>
                      <p
                        className={cn(
                          "text-base leading-relaxed sm:text-[17px]",
                          entry.speaker === "user" ? "text-white/90" : "text-white",
                        )}
                      >
                        {entry.text}
                      </p>
                    </article>
                  ))}
                </div>
              )}

              {sessionActive && sim.transcript.length === 0 && sim.status === "thinking" && (
                <p className="text-sm text-white/40">הלקוח עונה...</p>
              )}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                void sim.sendMessage(sim.input);
              }}
              className="border-t border-white/[0.08] p-4 sm:p-5"
            >
              <textarea
                value={sim.input}
                onChange={(event) => sim.setInput(event.target.value)}
                rows={2}
                disabled={!sessionActive || sim.status === "thinking"}
                placeholder={
                  sessionActive
                    ? "כתבי את התשובה שלך..."
                    : "התחילי שיחה כדי להקליד"
                }
                className="w-full resize-none bg-transparent text-base leading-relaxed text-white outline-none placeholder:text-white/25 disabled:opacity-40"
              />
              {sim.error && (
                <p className="mt-2 text-sm text-red-400">{sim.error}</p>
              )}
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={
                    !sessionActive ||
                    sim.status === "thinking" ||
                    !sim.input.trim()
                  }
                  className="bg-white px-5 py-2.5 text-sm font-medium text-black disabled:opacity-30"
                >
                  שליחה
                </button>
              </div>
            </form>
          </div>
        </section>

        <aside
          className={cn(
            "flex w-full shrink-0 flex-col lg:w-[340px]",
            mobilePanel !== "analysis" && "hidden lg:flex",
          )}
        >
          <h2 className="mb-3 text-sm font-medium text-white/70">ניתוח</h2>

          <div className="flex flex-col gap-4">
            {!sessionActive ? (
              <div className="border border-white/[0.08] p-5 text-sm leading-relaxed text-white/50">
                {sim.levelMeta.description}
              </div>
            ) : (
              <div className="border border-white/[0.08] p-4 sm:p-5">
                {metrics.map(({ key, label }) => (
                  <MetricRow
                    key={key}
                    label={label}
                    value={sim.scores[key]}
                  />
                ))}
              </div>
            )}

            {hasInsights && (
              <div className="space-y-4">
                {sim.correction && (
                  <div className="border-s-2 border-red-500 bg-red-500/[0.06] p-4 sm:p-5">
                    <p className="mb-2 text-xs font-medium text-red-400">תיקון</p>
                    <p className="text-sm leading-relaxed text-white/85">
                      {sim.correction}
                    </p>
                  </div>
                )}

                {sim.objection && (
                  <div className="border border-white/[0.08] p-4 sm:p-5">
                    <p className="mb-2 text-xs text-white/40">התנגדות</p>
                    <p className="text-sm leading-relaxed text-white/70">
                      {sim.objection}
                    </p>
                  </div>
                )}
              </div>
            )}

            {sessionActive && !hasInsights && (
              <p className="px-1 text-sm text-white/35">
                אחרי התשובה הראשונה יופיעו ציונים, התנגדות ותיקון.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
