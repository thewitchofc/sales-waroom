"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LEADERBOARD_PLAYERS,
  ARENA_BADGES,
  getRankMovement,
  type ArenaPlayer,
} from "@/config/arena-data";
import { RankTierBadge, RankMovement, LiveIndicator } from "@/components/arena/rank-tier-badge";
import { RankingCard } from "@/components/arena/ranking-card";

function BadgePills({ badgeIds }: { badgeIds: string[] }) {
  if (badgeIds.length === 0) return <span className="text-[10px] text-muted-foreground">-</span>;
  return (
    <div className="flex flex-wrap gap-1">
      {badgeIds.slice(0, 2).map((id) => {
        const badge = ARENA_BADGES[id];
        if (!badge) return null;
        return (
          <span
            key={id}
            className={cn(
              "border px-1.5 py-0.5 font-brand text-[8px]",
              badge.rarity === "legendary"
                ? "border-red-500/30 text-red-400"
                : badge.rarity === "rare"
                  ? "border-accent/30 text-accent"
                  : "border-white/10 text-white/50"
            )}
            title={badge.label}
          >
            {badge.icon}
          </span>
        );
      })}
    </div>
  );
}

export function LeaderboardTable({
  players = LEADERBOARD_PLAYERS,
  highlightId,
  liveScores = true,
}: {
  players?: ArenaPlayer[];
  highlightId?: string;
  liveScores?: boolean;
}) {
  const [scores, setScores] = useState(() =>
    Object.fromEntries(players.map((p) => [p.id, p.score]))
  );

  useEffect(() => {
    if (!liveScores) return;
    const interval = setInterval(() => {
      setScores((prev) => {
        const next = { ...prev };
        players
          .filter((p) => p.isLive)
          .forEach((p) => {
            const delta = Math.random() > 0.5 ? 1 : -1;
            next[p.id] = Math.min(999, Math.max(700, (next[p.id] ?? p.score) + delta));
          });
        return next;
      });
    }, 3200);
    return () => clearInterval(interval);
  }, [players, liveScores]);

  return (
    <div className="glass-premium metallic-border overflow-hidden bg-black/60">
      <div className="border-b border-white/5 p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-brand text-[10px] tracking-widest text-accent">
              לוח דירוג חי
            </div>
            <h3 className="font-display text-lg font-bold text-white">הקלוזרים המובילים · השבוע</h3>
          </div>
          <LiveIndicator label="ציונים חיים" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="border-b border-white/5 text-[10px] text-muted-foreground">
              <th className="px-4 py-3 text-start font-brand">דירוג</th>
              <th className="px-4 py-3 text-start font-brand">קלוזר</th>
              <th className="px-4 py-3 text-start font-brand">דרגה</th>
              <th className="px-4 py-3 text-start font-brand">ציון</th>
              <th className="px-4 py-3 text-start font-brand">תנועה</th>
              <th className="px-4 py-3 text-start font-brand">רצף</th>
              <th className="px-4 py-3 text-start font-brand">תגים</th>
              <th className="px-4 py-3 text-start font-brand">סטטוס</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, i) => {
              const movement = getRankMovement(player.rank, player.previousRank);
              const isHighlight = player.id === highlightId;
              const liveScore = scores[player.id] ?? player.score;

              return (
                <motion.tr
                  key={player.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={cn(
                    "border-b border-white/[0.03] transition-colors",
                    isHighlight ? "bg-accent/10 ring-1 ring-inset ring-accent/20" : "hover:bg-white/[0.02]",
                    player.rank <= 3 && "arena-top-rank"
                  )}
                >
                  <td className="px-4 py-4">
                    <span
                      className={cn(
                        "font-display text-xl font-black",
                        player.rank === 1
                          ? "text-accent"
                          : player.rank === 2
                            ? "text-slate-300"
                            : player.rank === 3
                              ? "text-amber-600"
                              : "text-white"
                      )}
                    >
                      #{player.rank}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-medium text-white">{player.name}</div>
                  </td>
                  <td className="px-4 py-4">
                    <RankTierBadge tier={player.tier} size="sm" />
                  </td>
                  <td className="px-4 py-4">
                    <motion.span
                      key={liveScore}
                      initial={{ scale: 1.08, color: "#fff" }}
                      animate={{ scale: 1 }}
                      className="font-display text-lg font-bold text-white"
                    >
                      {liveScore}
                    </motion.span>
                  </td>
                  <td className="px-4 py-4">
                    <RankMovement delta={movement} />
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-brand text-sm text-green-400">{player.streak}🔥</span>
                  </td>
                  <td className="px-4 py-4">
                    <BadgePills badgeIds={player.badges} />
                  </td>
                  <td className="px-4 py-4">
                    {player.isLive ? (
                      <LiveIndicator />
                    ) : (
                      <span className="font-brand text-[9px] text-muted-foreground">לא מחובר</span>
                    )}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function LeaderboardPodium({ players }: { players?: ArenaPlayer[] }) {
  const top3 = (players ?? LEADERBOARD_PLAYERS).slice(0, 3);
  const order = [top3[1], top3[0], top3[2]].filter(Boolean);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {order.map((player, i) => (
        <RankingCard
          key={player.id}
          player={player}
          rank={player.rank}
          highlight={i === 1}
        />
      ))}
    </div>
  );
}
