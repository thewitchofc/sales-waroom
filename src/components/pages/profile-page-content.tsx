"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  CURRENT_USER,
  ARENA_BADGES,
  RANK_TIERS,
  getTierForXp,
  getRankMovement,
} from "@/config/arena-data";
import { RankingCard, XpProgressBar } from "@/components/arena/ranking-card";
import { BattleStatsGrid } from "@/components/arena/battle-stats-grid";
import { RankTierBadge, RankMovement } from "@/components/arena/rank-tier-badge";
import { BrandLink } from "@/components/brand/brand-link";
import { BrandLogoLink } from "@/components/brand/brand-logo";
import { cn } from "@/lib/utils";

export function ProfilePageContent() {
  const user = CURRENT_USER;
  const movement = getRankMovement(user.rank, user.previousRank);
  const nextTier = RANK_TIERS[RANK_TIERS.findIndex((t) => t.id === user.tier) + 1];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <BrandLogoLink href="/" variant="arena" className="mt-1 hidden md:inline-flex" />
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-2 font-brand text-[10px] tracking-widest text-accent"
            >
              לוחם PROFILE · {user.handle}
            </motion.div>
            <h1 className="font-display text-3xl font-black text-white sm:text-4xl">
              {user.name}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <RankTierBadge tier={user.tier} size="lg" />
              <RankMovement delta={movement} />
              {!user.isPremium && (
                <BrandLink href="/pricing" variant="secondary" size="sm">
                  שדרוג פרימיום
                </BrandLink>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-6 text-center">
          <StatBox label="דירוג" value={`#${user.rank}`} accent />
          <StatBox label="ציון" value={String(user.score)} />
          <StatBox label="רצף" value={`${user.streak}🔥`} green />
        </div>
      </div>

      <RankingCard player={user} highlight rank={user.rank} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <section className="border border-white/5 bg-black/60 p-5 md:p-6">
            <div className="mb-4 font-brand text-[10px] text-accent">סטטיסטיקות קרב</div>
            <BattleStatsGrid stats={user.stats} />
          </section>

          <section className="border border-white/5 bg-black/60 p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="font-brand text-[10px] text-accent">תיק קרב</div>
              <Link href="/leaderboard" className="text-[10px] text-accent hover:underline">
                לוח דירוג ←
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <StatBox label="ניצחונות" value={String(user.wins)} green large />
              <StatBox label="הפסדים" value={String(user.losses)} large />
              <StatBox label="אחוז ניצחון" value={`${Math.round((user.wins / (user.wins + user.losses)) * 100)}%`} accent large />
            </div>
          </section>
        </div>

        <div className="space-y-5">
          <section className="border border-white/5 bg-black/60 p-5">
            <div className="mb-4 font-brand text-[10px] text-accent">התקדמות XP</div>
            <XpProgressBar xp={user.xp} />
            {nextTier && (
              <p className="mt-3 text-xs text-muted-foreground">
                {(nextTier.minXp - user.xp).toLocaleString()} XP עד {nextTier.labelHe}
              </p>
            )}
          </section>

          <section className="border border-white/5 bg-black/60 p-5">
            <div className="mb-4 font-brand text-[10px] text-accent">תגים · {user.badges.length}</div>
            <div className="grid grid-cols-2 gap-2">
              {user.badges.map((id) => {
                const badge = ARENA_BADGES[id];
                if (!badge) return null;
                return (
                  <motion.div
                    key={id}
                    whileHover={{ scale: 1.03 }}
                    className={cn(
                      "arena-rank-card border p-3 text-center",
                      badge.rarity === "legendary"
                        ? "border-red-500/30 bg-red-500/5"
                        : "border-accent/20 bg-accent/5"
                    )}
                  >
                    <div className="font-display text-lg font-black text-accent">{badge.icon}</div>
                    <div className="mt-1 text-[10px] text-white/70">{badge.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <section className="border border-accent/20 bg-accent/5 p-5">
            <div className="mb-3 font-brand text-[10px] text-accent">פריסה מהירה</div>
            <div className="flex flex-col gap-2">
              <BrandLink href="/arena" variant="command" size="sm">
                כניסה להזירה
              </BrandLink>
              <Link
                href="/dashboard"
                className="interactive-surface border border-white/10 px-4 py-2 text-center text-xs text-muted-foreground hover:text-white"
              >
                מרכז פיקוד
              </Link>
            </div>
          </section>
        </div>
      </div>

      <section className="border border-white/5 bg-black/40 p-5">
        <div className="mb-4 font-brand text-[10px] text-muted-foreground">סולם דרגות</div>
        <div className="flex flex-wrap gap-2">
          {RANK_TIERS.map((tier) => {
            const current = getTierForXp(user.xp).id === tier.id;
            return (
              <span
                key={tier.id}
                className={cn(
                  "border px-3 py-1.5 font-brand text-[9px]",
                  current ? tier.border + " " + tier.color : "border-white/5 text-muted-foreground opacity-50"
                )}
              >
                {tier.labelHe}
              </span>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function StatBox({
  label,
  value,
  accent,
  green,
  large,
}: {
  label: string;
  value: string;
  accent?: boolean;
  green?: boolean;
  large?: boolean;
}) {
  return (
    <div>
      <div
        className={cn(
          "font-display font-black",
          large ? "text-3xl" : "text-2xl",
          accent ? "text-accent" : green ? "text-green-400" : "text-white"
        )}
      >
        {value}
      </div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}
