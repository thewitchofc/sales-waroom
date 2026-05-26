"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  LEADERBOARD_PLAYERS,
  ARENA_BADGES,
  getRankMovement,
  type ArenaPlayer,
} from "@/config/arena-data";
import {
  RankTierBadge,
  RankMovement,
} from "@/components/arena/rank-tier-badge";
import { RankingCard } from "@/components/arena/ranking-card";

function BadgePills({ badgeIds }: { badgeIds: string[] }) {
  if (badgeIds.length === 0) return null;
  return (
    <span className="font-brand text-[9px] text-white/30">
      {badgeIds
        .slice(0, 1)
        .map((id) => ARENA_BADGES[id]?.icon)
        .filter(Boolean)
        .join("")}
    </span>
  );
}

export function LeaderboardTable({
  players = LEADERBOARD_PLAYERS,
  highlightId,
  liveScores = true,
  minimal = false,
  skipTop = 0,
}: {
  players?: ArenaPlayer[];
  highlightId?: string;
  liveScores?: boolean;
  minimal?: boolean;
  skipTop?: number;
}) {
  const [scores, setScores] = useState(() =>
    Object.fromEntries(players.map((p) => [p.id, p.score])),
  );

  const tablePlayers = skipTop > 0 ? players.slice(skipTop) : players;

  useEffect(() => {
    if (!liveScores) return;
    const interval = setInterval(() => {
      setScores((prev) => {
        const next = { ...prev };
        players
          .filter((p) => p.isLive)
          .forEach((p) => {
            const delta = Math.random() > 0.5 ? 1 : -1;
            next[p.id] = Math.min(
              999,
              Math.max(700, (next[p.id] ?? p.score) + delta),
            );
          });
        return next;
      });
    }, 3200);
    return () => clearInterval(interval);
  }, [players, liveScores]);

  return (
    <div
      className={
        minimal
          ? "leaderboard-table-elite overflow-hidden"
          : "glass-premium metallic-border overflow-hidden bg-black/60"
      }
    >
      {!minimal && (
        <div className="border-b border-white/5 p-4 md:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="font-brand text-[10px] tracking-widest text-accent">
                לוח דירוג חי
              </div>
              <h3 className="font-display text-lg font-bold text-white">
                הזאבים המובילים, השבוע
              </h3>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px]">
          <thead>
            <tr className="border-b border-white/[0.04] text-[9px] uppercase tracking-wider text-white/30">
              <th className="px-4 py-2.5 text-start font-brand sm:px-5">#</th>
              <th className="px-4 py-2.5 text-start font-brand sm:px-5">זאב</th>
              {!minimal && (
                <th className="px-4 py-2.5 text-start font-brand sm:px-5">
                  דרגה
                </th>
              )}
              <th className="px-4 py-2.5 text-start font-brand sm:px-5">
                ציון
              </th>
              <th className="px-4 py-2.5 text-start font-brand sm:px-5">
                תנועה
              </th>
              {minimal ? (
                <th className="hidden px-4 py-2.5 text-start font-brand sm:table-cell sm:px-5">
                  רצף
                </th>
              ) : (
                <>
                  <th className="px-4 py-2.5 text-start font-brand sm:px-5">
                    רצף
                  </th>
                  <th className="px-4 py-2.5 text-start font-brand sm:px-5">
                    תגים
                  </th>
                  <th className="px-4 py-2.5 text-start font-brand sm:px-5">
                    סטטוס
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {tablePlayers.map((player) => {
              const movement = getRankMovement(
                player.rank,
                player.previousRank,
              );
              const isHighlight = player.id === highlightId;
              const liveScore = scores[player.id] ?? player.score;

              return (
                <tr
                  key={player.id}
                  className={cn(
                    "leaderboard-table-row border-b border-white/[0.03] transition-colors last:border-0",
                    isHighlight ? "bg-white/[0.03]" : "hover:bg-white/[0.015]",
                    !minimal && player.rank <= 3 && "arena-top-rank",
                  )}
                >
                  <td className="px-4 py-3 sm:px-5 sm:py-3.5">
                    <span className="font-brand text-sm text-white/50">
                      #{player.rank}
                    </span>
                  </td>
                  <td className="px-4 py-3 sm:px-5 sm:py-3.5">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium text-white/90">
                        {player.name}
                      </span>
                      {minimal && (
                        <RankTierBadge tier={player.tier} size="sm" plain />
                      )}
                    </div>
                  </td>
                  {!minimal && (
                    <td className="px-4 py-3 sm:px-5 sm:py-3.5">
                      <RankTierBadge tier={player.tier} size="sm" />
                    </td>
                  )}
                  <td className="px-4 py-3 sm:px-5 sm:py-3.5">
                    <span className="font-display text-base font-bold text-white/90">
                      {liveScore}
                    </span>
                  </td>
                  <td className="px-4 py-3 sm:px-5 sm:py-3.5">
                    <RankMovement delta={movement} />
                  </td>
                  {minimal ? (
                    <td className="hidden px-4 py-3 sm:table-cell sm:px-5 sm:py-3.5">
                      <span className="font-brand text-xs text-white/40">
                        {player.streak}
                      </span>
                    </td>
                  ) : (
                    <>
                      <td className="px-4 py-3 sm:px-5 sm:py-3.5">
                        <span className="font-brand text-sm text-green-400">
                          {player.streak}🔥
                        </span>
                      </td>
                      <td className="px-4 py-3 sm:px-5 sm:py-3.5">
                        <BadgePills badgeIds={player.badges} />
                      </td>
                      <td className="px-4 py-3 sm:px-5 sm:py-3.5">
                        {player.isLive ? (
                          <span className="font-brand text-[9px] text-white/35">
                            חי
                          </span>
                        ) : null}
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function LeaderboardPodium({
  players,
  minimal = false,
  champion = false,
}: {
  players?: ArenaPlayer[];
  minimal?: boolean;
  champion?: boolean;
}) {
  const top3 = (players ?? LEADERBOARD_PLAYERS).slice(0, 3);
  const [second, first, third] = [top3[1], top3[0], top3[2]].filter(Boolean);

  if (champion && first) {
    return (
      <div className="leaderboard-podium-grid grid grid-cols-1 gap-4 md:grid-cols-12 md:items-end md:gap-5 lg:gap-6">
        {second && (
          <div className="md:col-span-3 md:order-1">
            <RankingCard player={second} rank={2} podium={2} minimal />
          </div>
        )}
        <div className="md:col-span-6 md:order-2">
          <RankingCard player={first} rank={1} podium={1} minimal />
        </div>
        {third && (
          <div className="md:col-span-3 md:order-3">
            <RankingCard player={third} rank={3} podium={3} minimal />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3 md:gap-5">
      {[second, first, third].filter(Boolean).map((player, i) => (
        <RankingCard
          key={player!.id}
          player={player!}
          rank={player!.rank}
          highlight={i === 1}
          minimal={minimal}
        />
      ))}
    </div>
  );
}
