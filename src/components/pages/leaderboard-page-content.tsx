"use client";

import { useState } from "react";
import { LeaderboardTable, LeaderboardPodium } from "@/components/arena/leaderboard-table";
import { CURRENT_USER, CURRENT_SEASON } from "@/config/arena-data";
import { RankingCard } from "@/components/arena/ranking-card";
import { PremiumGate } from "@/components/arena/premium-gate";

const tabs = [
  { id: "week", label: "השבוע" },
  { id: "season", label: "עונה" },
  { id: "all", label: "כל הזמנים" },
] as const;

export function LeaderboardPageContent() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("week");

  return (
    <div className="arena-page pb-12">
      <header className="mb-12 sm:mb-16">
        <p className="font-brand text-[10px] tracking-[0.2em] text-accent/70">ליגת הזירה</p>
        <h1 className="mt-4 font-display text-3xl font-black text-white sm:text-4xl md:text-5xl">
          לוח דירוג
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-white/40">
          {CURRENT_SEASON.nameHe} · דירוג חי
        </p>
      </header>

      <div className="mb-14 flex flex-wrap gap-1 border-b border-white/[0.04] pb-px sm:mb-16">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`border-b-2 px-4 py-3 text-xs font-medium transition-colors ${
              tab === t.id
                ? "border-accent/80 text-accent"
                : "border-transparent text-white/35 hover:text-white/60"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <section className="mb-16 sm:mb-20 lg:mb-24">
        <p className="mb-8 font-brand text-[9px] tracking-[0.15em] text-white/30">
          אלופי השבוע
        </p>
        <LeaderboardPodium champion />
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-display text-lg font-bold text-white/90 sm:text-xl">כל המפעילים</h2>
          <span className="font-brand text-[9px] text-white/30">מדורג 4+</span>
        </div>
        <LeaderboardTable
          highlightId={CURRENT_USER.id}
          liveScores
          minimal
          skipTop={3}
        />
      </section>

      {!CURRENT_USER.isPremium && (
        <div className="relative mt-16 min-h-[140px] sm:mt-20">
          <PremiumGate
            title="מעקב דירוג חי"
            description="עדכוני דירוג בזמן אמת והתראות ירידה — גישת Warroom."
          >
            <RankingCard player={CURRENT_USER} highlight minimal />
          </PremiumGate>
        </div>
      )}
    </div>
  );
}
