"use client";

import { motion } from "framer-motion";
import { BrandLink } from "@/components/brand/brand-link";
import {
  WEEKLY_CHALLENGE,
  LIVE_TOURNAMENT,
  CURRENT_USER,
  STAT_LABELS,
} from "@/config/arena-data";
import { WeeklyCountdown, TournamentCountdown } from "@/components/arena/season-banner";
import { BattleStatsGrid, PressureLevelVisual } from "@/components/arena/battle-stats-grid";
import { PremiumGate, PremiumBadge } from "@/components/arena/premium-gate";
import { LiveIndicator } from "@/components/arena/rank-tier-badge";
import { RankingCard } from "@/components/arena/ranking-card";

export function ArenaChallengePanel() {
  const isPremium = CURRENT_USER.isPremium;

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="arena-banner glass-premium metallic-border relative overflow-hidden border border-red-500/20 bg-black/70 p-5 md:p-6"
        >
          <div className="arena-scan pointer-events-none absolute inset-0 opacity-30" />

          <div className="relative mb-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <LiveIndicator label="WEEKLY CHALLENGE" />
                {!isPremium && <PremiumBadge />}
              </div>
              <h2 className="mt-2 font-display text-2xl font-black text-white md:text-3xl">
                {WEEKLY_CHALLENGE.titleHe}
              </h2>
              <p className="mt-1 font-brand text-[10px] text-accent">{WEEKLY_CHALLENGE.title}</p>
            </div>
            <WeeklyCountdown />
          </div>

          <div className="relative space-y-4">
            <div className="border border-white/5 bg-black/50 p-4">
              <div className="mb-2 font-brand text-[9px] text-muted-foreground">SCENARIO · SAME FOR ALL</div>
              <p className="text-sm leading-relaxed text-white/85">{WEEKLY_CHALLENGE.scenario}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="border border-white/5 p-3">
                <div className="font-brand text-[9px] text-muted-foreground">PERSONA</div>
                <div className="mt-1 text-sm text-red-400">{WEEKLY_CHALLENGE.persona}</div>
              </div>
              <div className="border border-white/5 p-3">
                <div className="mb-2 font-brand text-[9px] text-muted-foreground">PRESSURE</div>
                <PressureLevelVisual level={4} />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border border-white/5 p-4">
              <div>
                <div className="font-brand text-[9px] text-muted-foreground">PARTICIPANTS</div>
                <motion.div
                  key={WEEKLY_CHALLENGE.participants}
                  className="font-display text-2xl font-black text-white"
                >
                  {WEEKLY_CHALLENGE.participants.toLocaleString()}
                </motion.div>
              </div>
              <div>
                <div className="font-brand text-[9px] text-muted-foreground">PRIZE</div>
                <div className="text-sm text-accent">{WEEKLY_CHALLENGE.prize}</div>
              </div>
            </div>

            <div>
              <div className="mb-2 font-brand text-[9px] text-muted-foreground">SCORED METRICS</div>
              <div className="flex flex-wrap gap-2">
                {WEEKLY_CHALLENGE.metrics.map((m) => (
                  <span
                    key={m}
                    className="border border-accent/20 bg-accent/5 px-2 py-1 font-brand text-[9px] text-accent"
                  >
                    {STAT_LABELS[m].label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {!isPremium ? (
            <div className="relative mt-6 min-h-[120px]">
              <PremiumGate
                title="RANKED ARENA LOCKED"
                description="כניסה לתחרות השבועית, דירוג חי וטורנירים — Premium בלבד."
                blur={false}
              />
            </div>
          ) : (
            <div className="relative mt-6 flex flex-wrap gap-3">
              <BrandLink href="/dashboard" variant="command" size="lg">
                ENTER BATTLE
              </BrandLink>
            </div>
          )}
        </motion.div>
      </div>

      <div className="flex flex-col gap-5 lg:col-span-2">
        <RankingCard player={CURRENT_USER} highlight />

        <div className="border border-white/5 bg-black/60 p-5">
          <div className="mb-4 font-brand text-[10px] text-accent">YOUR BATTLE STATS</div>
          <BattleStatsGrid stats={CURRENT_USER.stats} />
        </div>
      </div>
    </div>
  );
}

export function TournamentPanel() {
  const tournament = LIVE_TOURNAMENT;

  return (
    <div className="relative min-h-[280px] overflow-hidden border border-accent/20 bg-black/60 p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="font-brand text-[10px] text-accent">PREMIUM TOURNAMENT</div>
          <h3 className="font-display text-xl font-bold text-white">{tournament.nameHe}</h3>
        </div>
        <PremiumBadge />
      </div>

      <PremiumGate blur={false}>
        <div className="grid gap-4 md:grid-cols-2">
          <TournamentCountdown target={tournament.startsAt} />
          <div className="space-y-3">
            <InfoRow label="FORMAT" value={tournament.format} />
            <InfoRow label="PRIZE POOL" value={tournament.prizePool} accent />
            <InfoRow
              label="SLOTS"
              value={`${tournament.filled}/${tournament.slots}`}
            />
            <div>
              <div className="mb-2 font-brand text-[9px] text-muted-foreground">PRESSURE</div>
              <PressureLevelVisual level={tournament.pressureLevel} />
            </div>
          </div>
        </div>
      </PremiumGate>
    </div>
  );
}

function InfoRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border border-white/5 px-3 py-2">
      <span className="font-brand text-[9px] text-muted-foreground">{label}</span>
      <span className={`text-sm ${accent ? "text-accent" : "text-white"}`}>{value}</span>
    </div>
  );
}

export function LiveArenaStatus() {
  return (
    <motion.div
      animate={{ boxShadow: ["0 0 0 rgba(239,68,68,0)", "0 0 24px rgba(239,68,68,0.1)", "0 0 0 rgba(239,68,68,0)"] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="flex flex-wrap items-center justify-between gap-4 border border-red-500/20 bg-red-500/5 px-4 py-3"
    >
      <div className="flex items-center gap-3">
        <LiveIndicator label="847 IN BATTLE" />
        <span className="text-sm text-white/70">Weekly CFO Challenge · Live Now</span>
      </div>
      <span className="font-brand text-[10px] text-muted-foreground">
        AI CHALLENGE TIMER ACTIVE
      </span>
    </motion.div>
  );
}
