"use client";

import {
  CURRENT_SEASON,
  CURRENT_USER,
  RANK_TIERS,
  LIVE_TOURNAMENT,
  getTierConfig,
  getXpProgress,
  getRankMovement,
  type RankTier,
} from "@/config/arena-data";
import { XpProgressBar } from "@/components/arena/ranking-card";
import { RankMovement } from "@/components/arena/rank-tier-badge";
import { TournamentCountdown } from "@/components/arena/season-banner";

const TIER_SIGILS: Record<RankTier, string> = {
  bronze: "◇",
  silver: "◆",
  gold: "✦",
  elite: "⬡",
  war_master: "★",
};

function SeasonDivisionLadder({ currentTier }: { currentTier: RankTier }) {
  const currentIndex = RANK_TIERS.findIndex((t) => t.id === currentTier);

  return (
    <div className="season-ladder">
      <div className="flex items-center gap-1 sm:gap-1.5">
        {RANK_TIERS.map((tier, i) => {
          const isCurrent = tier.id === currentTier;
          const isComplete = i < currentIndex;
          return (
            <div
              key={tier.id}
              className="flex flex-1 flex-col items-center gap-2.5"
            >
              <div
                className={[
                  "season-ladder-segment h-0.5 w-full rounded-full transition-colors",
                  isCurrent && "season-ladder-segment-active",
                  isComplete && "season-ladder-segment-complete",
                  !isCurrent && !isComplete && "season-ladder-segment-future",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
              <span
                className={`font-brand text-[8px] tracking-wide sm:text-[9px] ${
                  isCurrent
                    ? tier.color
                    : isComplete
                      ? "text-white/35"
                      : "text-white/20"
                }`}
              >
                {tier.labelHe}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HeroStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="season-hero-stat">
      <div
        className={`font-display text-xl font-black tabular-nums sm:text-2xl ${
          accent ? "text-accent" : "text-white/90"
        }`}
      >
        {value}
      </div>
      <div className="mt-1 font-brand text-[8px] tracking-wider text-white/30">
        {label}
      </div>
    </div>
  );
}

export function SeasonHero() {
  const tierCfg = getTierConfig(CURRENT_USER.tier);
  const progress = getXpProgress(CURRENT_USER.xp);
  const movement = getRankMovement(
    CURRENT_USER.rank,
    CURRENT_USER.previousRank,
  );
  const xpToNext = progress.next - progress.current;

  return (
    <section className="season-hero relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 80% 0%, rgba(212,175,85,0.08) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 10% 100%, rgba(239,68,68,0.05) 0%, transparent 50%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-white/10 to-transparent" />

      <div className="relative grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
        <div className="lg:col-span-7">
          <div className="mb-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="inline-flex items-center gap-2 font-brand text-[9px] tracking-[0.12em] text-red-400/70">
              <span className="size-1.5 rounded-full bg-red-500/60" />
              עונה פעילה
            </span>
            <span className="h-3 w-px bg-white/10" />
            <span className="font-brand text-[9px] text-white/35">
              עונה {CURRENT_SEASON.id}, {CURRENT_SEASON.daysRemaining} ימים
              לסיום
            </span>
          </div>

          <h1 className="font-display text-3xl font-black leading-tight text-white sm:text-4xl md:text-[2.75rem]">
            {CURRENT_SEASON.nameHe}
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/40">
            {CURRENT_SEASON.tagline}
          </p>

          <div className="mt-10">
            <div className="mb-4 flex items-end justify-between gap-4">
              <span className="font-brand text-[9px] tracking-[0.12em] text-white/30">
                מסלול דירוג
              </span>
              <span className="font-brand text-[9px] text-white/35">
                {xpToNext.toLocaleString()} XP לדרגה הבאה
              </span>
            </div>
            <SeasonDivisionLadder currentTier={CURRENT_USER.tier} />
          </div>

          <div className="mt-8 max-w-md">
            <XpProgressBar xp={CURRENT_USER.xp} subtle />
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="season-hero-rank-panel">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-brand text-[9px] tracking-[0.12em] text-white/30">
                  דירוג עונתי
                </p>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-display text-5xl font-black text-white sm:text-6xl">
                    #{CURRENT_USER.rank}
                  </span>
                  <RankMovement delta={movement} />
                </div>
              </div>
              <div className="text-end">
                <span
                  className={`season-tier-sigil inline-flex size-11 items-center justify-center text-lg ${tierCfg.color}`}
                >
                  {TIER_SIGILS[CURRENT_USER.tier]}
                </span>
                <p
                  className={`mt-2 font-display text-sm font-bold ${tierCfg.color}`}
                >
                  {tierCfg.labelHe}
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/[0.05] pt-6">
              <HeroStat
                label="קרבות"
                value={CURRENT_SEASON.totalBattles.toLocaleString()}
              />
              <HeroStat
                label="לוחמים"
                value={CURRENT_SEASON.activePlayers.toLocaleString()}
              />
              <HeroStat
                label="ימים נותרו"
                value={String(CURRENT_SEASON.daysRemaining)}
                accent
              />
            </div>

            <div className="mt-6 border-t border-white/[0.05] pt-6">
              <TournamentCountdown
                target={LIVE_TOURNAMENT.startsAt}
                label="סיבוב אליפות"
                atmospheric
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SeasonTierGrid() {
  const currentTier = CURRENT_USER.tier;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {RANK_TIERS.map((tier) => {
        const isActive = tier.id === currentTier;
        return (
          <div
            key={tier.id}
            className={[
              "season-tier-card",
              isActive && "season-tier-card-active",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span className={`season-tier-sigil text-base ${tier.color}`}>
              {TIER_SIGILS[tier.id]}
            </span>
            <p
              className={`mt-3 font-display text-sm font-bold ${isActive ? tier.color : "text-white/75"}`}
            >
              {tier.labelHe}
            </p>
            <p className="mt-1.5 font-brand text-[9px] leading-relaxed text-white/30">
              {tier.minXp.toLocaleString()}
              {" עד "}
              {tier.maxXp === 99999 ? "∞" : tier.maxXp.toLocaleString()} XP
            </p>
          </div>
        );
      })}
    </div>
  );
}
