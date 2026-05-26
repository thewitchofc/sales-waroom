"use client";

import { useState } from "react";
import {
  LeaderboardTable,
  LeaderboardPodium,
} from "@/components/arena/leaderboard-table";
import { CURRENT_USER } from "@/config/arena-data";
import { RankingCard } from "@/components/arena/ranking-card";
import { PremiumGate } from "@/components/arena/premium-gate";
import { PageGuide } from "@/components/ui/page-guide";

export function LeaderboardPageContent() {
  return (
    <div className="arena-page mx-auto max-w-4xl pb-12">
      <header className="mb-10">
        <h1 className="font-display text-2xl font-black text-white sm:text-3xl">
          דירוג
        </h1>
        <PageGuide title="מה זה?">
          רשימת כל המתרגלים לפי ציון. למעלה. שלושת המובילים השבוע. הטבלה מראה את
          שאר המשתתפים. השורה שלך מסומנת.
        </PageGuide>
      </header>

      <section className="mb-12">
        <h2 className="mb-6 text-sm font-medium text-white/60">
          שלושה ראשונים
        </h2>
        <LeaderboardPodium champion />
      </section>

      <section>
        <h2 className="mb-6 text-sm font-medium text-white/60">כל המשתתפים</h2>
        <LeaderboardTable
          highlightId={CURRENT_USER.id}
          liveScores
          minimal
          skipTop={3}
        />
      </section>

      {!CURRENT_USER.isPremium && (
        <div className="relative mt-12 min-h-[120px]">
          <PremiumGate
            title="עדכוני דירוג בזמן אמת"
            description="זמין במנוי פרימיום."
          >
            <RankingCard player={CURRENT_USER} highlight minimal />
          </PremiumGate>
        </div>
      )}
    </div>
  );
}
