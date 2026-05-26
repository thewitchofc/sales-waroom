"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getXpProgress, getTierForXp, getTierConfig, type ArenaPlayer } from "@/config/arena-data";
import { RankTierBadge } from "@/components/arena/rank-tier-badge";

export function XpProgressBar({ xp, showLabel = true }: { xp: number; showLabel?: boolean }) {
  const progress = getXpProgress(xp);
  const tierCfg = getTierForXp(xp);

  return (
    <div>
      {showLabel && (
        <div className="mb-2 flex items-center justify-between">
          <RankTierBadge tier={tierCfg.id} size="sm" />
          <span className="font-brand text-[10px] text-muted-foreground">
            {progress.current.toLocaleString()} / {progress.next.toLocaleString()} XP
          </span>
        </div>
      )}
      <div className="relative h-2 overflow-hidden bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-l from-accent via-accent-secondary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress.pct}%` }}
          transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ boxShadow: `0 0 16px ${tierCfg.glow}` }}
        />
      </div>
    </div>
  );
}

export function RankingCard({
  player,
  highlight,
  rank,
}: {
  player: ArenaPlayer;
  highlight?: boolean;
  rank?: number;
}) {
  const tierCfg = getTierConfig(player.tier);
  const displayRank = rank ?? player.rank;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className={cn(
        "arena-rank-card relative overflow-hidden border p-5 transition-all",
        highlight
          ? "border-accent/40 bg-accent/5 glow-accent"
          : cn(tierCfg.border, "bg-black/60 hover:border-white/20")
      )}
      style={highlight ? undefined : { boxShadow: `0 0 20px ${tierCfg.glow}` }}
    >
      <div className="arena-scan pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex size-14 shrink-0 items-center justify-center border-2 font-display text-2xl font-black",
              tierCfg.border,
              tierCfg.color
            )}
          >
            #{displayRank}
          </div>
          <div>
            <div className="font-display text-lg font-bold text-white">{player.name}</div>
            <div className="mt-1">
              <RankTierBadge tier={player.tier} size="sm" />
            </div>
          </div>
        </div>
        <div className="text-end">
          <motion.div
            key={player.score}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="font-display text-3xl font-black text-white"
          >
            {player.score}
          </motion.div>
          <div className="font-brand text-[9px] text-muted-foreground">ציון קרב</div>
        </div>
      </div>

      <div className="relative mt-4">
        <XpProgressBar xp={player.xp} />
      </div>

      <div className="relative mt-4 flex flex-wrap gap-4 text-[10px]">
        <span className="text-green-400">🔥 {player.streak} רצף</span>
        <span className="text-white/50">{player.wins} ניצחונות · {player.losses} הפסדים</span>
      </div>
    </motion.div>
  );
}
