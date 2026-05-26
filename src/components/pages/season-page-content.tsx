"use client";

import { motion } from "framer-motion";
import {
  CURRENT_SEASON,
  RANK_TIERS,
  LEADERBOARD_PLAYERS,
  CURRENT_USER,
} from "@/config/arena-data";
import { SeasonBanner, TournamentCountdown } from "@/components/arena/season-banner";
import { LeaderboardTable } from "@/components/arena/leaderboard-table";
import { RankTierBadge } from "@/components/arena/rank-tier-badge";
import { XpProgressBar } from "@/components/arena/ranking-card";
import { LIVE_TOURNAMENT } from "@/config/arena-data";
import { PremiumGate } from "@/components/arena/premium-gate";
import { BrandLogoLink } from "@/components/brand/brand-logo";

export function SeasonPageContent() {
  const seasonStandings = LEADERBOARD_PLAYERS.slice(0, 8);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <BrandLogoLink href="/" variant="arena" hoverGlow className="mt-1 hidden md:inline-flex" />
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-2 font-brand text-[10px] tracking-[0.3em] text-red-400"
            >
              SEASON {CURRENT_SEASON.id}
            </motion.div>
            <h1 className="font-display text-3xl font-black text-white sm:text-4xl md:text-5xl">
              {CURRENT_SEASON.nameHe}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{CURRENT_SEASON.tagline}</p>
          </div>
        </div>
      </div>

      <SeasonBanner />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-4 font-brand text-[10px] text-accent">דירוג העונה</div>
          <LeaderboardTable players={seasonStandings} highlightId={CURRENT_USER.id} />
        </div>

        <div className="space-y-5">
          <TournamentCountdown
            target={LIVE_TOURNAMENT.startsAt}
            label="סיבוב אליפות"
          />

          <div className="border border-white/5 bg-black/60 p-5">
            <div className="mb-4 font-brand text-[10px] text-accent">ההתקדמות שלך בעונה</div>
            <XpProgressBar xp={CURRENT_USER.xp} />
            <div className="mt-4 flex items-center justify-between">
              <RankTierBadge tier={CURRENT_USER.tier} />
              <span className="font-brand text-sm text-white">דירוג #{CURRENT_USER.rank}</span>
            </div>
          </div>

          <div className="border border-accent/20 bg-accent/5 p-5">
            <div className="mb-3 font-brand text-[10px] text-accent">פרסי העונה</div>
            <ul className="space-y-2">
              {CURRENT_SEASON.rewards.map((reward) => (
                <li key={reward} className="flex items-start gap-2 text-sm text-white/75">
                  <span className="text-accent">◆</span>
                  {reward}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-4 font-brand text-[10px] text-muted-foreground">דרגות דירוג</div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {RANK_TIERS.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`arena-rank-card border p-4 ${tier.border}`}
              style={{ boxShadow: `0 0 16px ${tier.glow}` }}
            >
              <RankTierBadge tier={tier.id} size="md" />
              <div className="mt-3 font-brand text-[10px] text-muted-foreground">
                {tier.minXp.toLocaleString()} עד {tier.maxXp === 99999 ? "∞" : tier.maxXp.toLocaleString()} XP
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {!CURRENT_USER.isPremium && (
        <div className="relative min-h-[180px]">
          <PremiumGate
            title="אליפות העונה"
            description="כניסה לטורניר העונה, פרסים בלעדיים ו-פרסונות עילית, פרימיום בלבד."
          />
        </div>
      )}
    </div>
  );
}
