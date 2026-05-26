"use client";

import {
  LEADERBOARD_PLAYERS,
  CURRENT_USER,
  CURRENT_SEASON,
} from "@/config/arena-data";
import { SeasonHero, SeasonTierGrid } from "@/components/arena/season-hero";
import { LeaderboardTable } from "@/components/arena/leaderboard-table";
import { XpProgressBar } from "@/components/arena/ranking-card";
import { RankTierBadge } from "@/components/arena/rank-tier-badge";
import { PremiumGate } from "@/components/arena/premium-gate";
import { PageGuide } from "@/components/ui/page-guide";

export function SeasonPageContent() {
  const seasonStandings = LEADERBOARD_PLAYERS.slice(0, 8);

  return (
    <div className="arena-page season-page mx-auto max-w-4xl pb-12">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-black text-white sm:text-3xl">עונה</h1>
        <PageGuide title="מה זה?">
          כל כמה חודשים יש &quot;עונה&quot; חדשה. צוברים נקודות, עולים בדרגות,
          ורואים מי מוביל. למטה — ההתקדמות שלכם והדירוג הנוכחי.
        </PageGuide>
      </header>

      <SeasonHero />

      <section className="mt-16 sm:mt-20 lg:mt-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="font-brand text-[9px] tracking-[0.12em] text-white/30">
                  דירוג עונתי
                </p>
                <h2 className="mt-2 font-display text-lg font-bold text-white/90 sm:text-xl">
                  מובילי העונה
                </h2>
              </div>
              <span className="font-brand text-[9px] text-white/25">עדכון חי</span>
            </div>
            <LeaderboardTable
              players={seasonStandings}
              highlightId={CURRENT_USER.id}
              minimal
            />
          </div>

          <aside className="space-y-5 lg:col-span-4">
            <div className="season-panel">
              <p className="font-brand text-[9px] tracking-[0.1em] text-white/30">
                התקדמות אישית
              </p>
              <div className="mt-4">
                <XpProgressBar xp={CURRENT_USER.xp} subtle />
              </div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <RankTierBadge tier={CURRENT_USER.tier} plain />
                <span className="font-brand text-xs text-white/50">
                  דירוג #{CURRENT_USER.rank}
                </span>
              </div>
            </div>

            <div className="season-panel season-panel-accent">
              <p className="font-brand text-[9px] tracking-[0.1em] text-accent/70">
                פרסי העונה
              </p>
              <ul className="mt-4 space-y-3">
                {CURRENT_SEASON.rewards.map((reward) => (
                  <li
                    key={reward}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-white/60"
                  >
                    <span className="mt-0.5 text-accent/60">·</span>
                    {reward}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="mt-16 sm:mt-20 lg:mt-24">
        <div className="mb-8">
          <p className="font-brand text-[9px] tracking-[0.12em] text-white/30">
            מערכת דירוג
          </p>
          <h2 className="mt-2 font-display text-lg font-bold text-white/90 sm:text-xl">
            דרגות העונה
          </h2>
        </div>
        <SeasonTierGrid />
      </section>

      {!CURRENT_USER.isPremium && (
        <div className="relative mt-16 min-h-[140px] sm:mt-20">
          <PremiumGate
            title="אליפות העונה"
            description="כניסה לטורניר העונה, פרסים בלעדיים ופרסונות עילית — פרימיום בלבד."
          />
        </div>
      )}
    </div>
  );
}
