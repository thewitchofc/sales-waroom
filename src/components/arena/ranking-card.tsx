"use client";

import { cn } from "@/lib/utils";
import { getXpProgress, getTierForXp, getTierConfig, type ArenaPlayer } from "@/config/arena-data";
import { RankTierBadge } from "@/components/arena/rank-tier-badge";

export function XpProgressBar({
  xp,
  showLabel = true,
  subtle = false,
}: {
  xp: number;
  showLabel?: boolean;
  subtle?: boolean;
}) {
  const progress = getXpProgress(xp);
  const tierCfg = getTierForXp(xp);

  return (
    <div>
      {showLabel && (
        <div className="mb-2 flex items-center justify-between">
          <RankTierBadge tier={tierCfg.id} size="sm" plain={subtle} />
          {!subtle && (
            <span className="font-brand text-[10px] text-white/35">
              {progress.current.toLocaleString()} / {progress.next.toLocaleString()} XP
            </span>
          )}
        </div>
      )}
      <div className="relative h-1 overflow-hidden bg-white/5">
        <div
          className="h-full bg-accent/50"
          style={{ width: `${progress.pct}%` }}
        />
      </div>
    </div>
  );
}

export function RankingCard({
  player,
  highlight,
  rank,
  minimal = false,
  podium,
}: {
  player: ArenaPlayer;
  highlight?: boolean;
  rank?: number;
  minimal?: boolean;
  podium?: 1 | 2 | 3;
}) {
  const tierCfg = getTierConfig(player.tier);
  const displayRank = rank ?? player.rank;
  const isChampion = podium === 1;
  const isPodium = podium !== undefined;

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        isChampion && "leaderboard-podium-first px-6 py-8 sm:px-8 sm:py-10",
        podium === 2 && "leaderboard-podium-alt px-5 py-5 sm:py-6",
        podium === 3 && "leaderboard-podium-alt px-5 py-5 sm:py-6",
        !isPodium &&
          cn(
            "p-5 sm:p-6",
            minimal
              ? highlight
                ? "border border-accent/10 bg-accent/[0.02]"
                : "border border-white/[0.05] bg-black/25"
              : cn(
                  "border",
                  highlight
                    ? "border-accent/15 bg-accent/[0.02]"
                    : cn(tierCfg.border, "border-white/[0.05] bg-black/30")
                )
          )
      )}
    >
      {isChampion && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,85,0.06) 0%, transparent 70%)",
          }}
        />
      )}

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div
            className={cn(
              "flex shrink-0 items-center justify-center font-display font-black",
              isChampion
                ? "size-16 border border-accent/20 text-3xl text-accent sm:size-20 sm:text-4xl"
                : isPodium
                  ? "size-11 border border-white/[0.08] text-lg text-white/70"
                  : cn("size-14 border text-2xl", tierCfg.border, tierCfg.color)
            )}
          >
            #{displayRank}
          </div>
          <div>
            <div
              className={cn(
                "font-display font-bold text-white",
                isChampion ? "text-xl sm:text-2xl" : isPodium ? "text-base" : "text-lg"
              )}
            >
              {player.name}
            </div>
            <div className="mt-1">
              <RankTierBadge tier={player.tier} size="sm" plain={isPodium || minimal} />
            </div>
          </div>
        </div>
        <div className="text-end">
          <div
            className={cn(
              "font-display font-black text-white",
              isChampion ? "text-4xl sm:text-5xl" : isPodium ? "text-2xl text-white/80" : "text-3xl"
            )}
          >
            {player.score}
          </div>
          {!isPodium && (
            <div className="font-brand text-[9px] text-white/30">ציון קרב</div>
          )}
        </div>
      </div>

      {(isChampion || (!isPodium && !minimal)) && (
        <div className="relative mt-5">
          <XpProgressBar xp={player.xp} showLabel={!isPodium} subtle={isChampion || minimal} />
        </div>
      )}

      {!isPodium && (
        <div className="relative mt-4 flex flex-wrap gap-4 text-[10px] text-white/40">
          <span>{player.streak} רצף</span>
          <span>
            {player.wins} ניצחונות · {player.losses} הפסדים
          </span>
        </div>
      )}
    </div>
  );
}
