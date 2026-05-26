"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LeaderboardTable, LeaderboardPodium } from "@/components/arena/leaderboard-table";
import { SeasonBanner } from "@/components/arena/season-banner";
import { RankingCard } from "@/components/arena/ranking-card";
import { CURRENT_USER } from "@/config/arena-data";
import { PremiumGate } from "@/components/arena/premium-gate";
import { BrandLogoLink } from "@/components/brand/brand-logo";

const tabs = [
  { id: "week", label: "This Week", labelHe: "השבוע" },
  { id: "season", label: "Season", labelHe: "עונה" },
  { id: "all", label: "All Time", labelHe: "כל הזמנים" },
] as const;

export function LeaderboardPageContent() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("week");

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <BrandLogoLink href="/" variant="arena" hoverGlow className="mt-1 hidden md:inline-flex" />
          <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-2 font-brand text-[10px] tracking-[0.3em] text-accent"
        >
          GLOBAL RANKINGS
        </motion.div>
        <h1 className="font-display text-3xl font-black text-white sm:text-4xl">
          Leaderboard
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          דירוג חי · תנועת rank · streaks · badges — כל קלוזר נמדד. כל שיחה נספרת.
        </p>
          </div>
        </div>
      </div>

      <SeasonBanner />

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`interactive-surface border px-4 py-2 text-xs font-semibold transition-all ${
              tab === t.id
                ? "border-accent/40 bg-accent/10 text-accent"
                : "border-white/5 text-muted-foreground hover:text-white"
            }`}
          >
            {t.labelHe} · {t.label}
          </button>
        ))}
      </div>

      <LeaderboardPodium />

      <LeaderboardTable highlightId={CURRENT_USER.id} liveScores />

      {!CURRENT_USER.isPremium && (
        <div className="relative min-h-[200px]">
          <PremiumGate
            title="LIVE RANK TRACKING"
            description="עדכוני דירוג בזמן אמת, התראות עלירידה ב-rank ו-analytics מתקדם — Premium."
          >
            <RankingCard player={CURRENT_USER} highlight />
          </PremiumGate>
        </div>
      )}
    </div>
  );
}
