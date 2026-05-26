"use client";

import { ANALYTICS_SESSION } from "@/config/analytics-intelligence-data";

/** Minimal session context — no animated HUD strip. */
export function AnalyticsLiveHud() {
  return (
    <section className="border-b border-white/[0.04] px-5 py-6 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <p className="font-brand text-[9px] tracking-wider text-white/35">
          {ANALYTICS_SESSION.label}
        </p>
        <p className="text-sm text-white/60">ניתוח פסיכולוגי · AI</p>
      </div>
    </section>
  );
}
