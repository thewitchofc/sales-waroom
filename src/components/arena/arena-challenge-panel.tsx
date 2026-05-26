"use client";

import { motion } from "framer-motion";
import { BrandLink } from "@/components/brand/brand-link";
import {
  WEEKLY_CHALLENGE,
  LIVE_TOURNAMENT,
  CURRENT_USER,
  CURRENT_SEASON,
  STAT_LABELS,
} from "@/config/arena-data";
import {
  WeeklyCountdown,
  TournamentCountdown,
} from "@/components/arena/season-banner";
import {
  BattleStatsGrid,
  PressureLevelVisual,
} from "@/components/arena/battle-stats-grid";
import { PremiumGate, PremiumBadge } from "@/components/arena/premium-gate";
import { LiveIndicator } from "@/components/arena/rank-tier-badge";
import { RankingCard } from "@/components/arena/ranking-card";

export function ArenaHeroChallenge() {
  const isPremium = CURRENT_USER.isPremium;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="arena-hero-primary relative overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 analytics-radar-glow opacity-50" />

      <div className="relative">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-2xl">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <LiveIndicator label="אתגר שבועי, חי" />
              <span className="font-brand text-[9px] text-white/35">
                {CURRENT_SEASON.nameHe}, {CURRENT_SEASON.daysRemaining} ימים
              </span>
            </div>
            <h1 className="font-display text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
              {WEEKLY_CHALLENGE.titleHe}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/50">
              אותו תרחיש. אותו לקוח דומיננטי. מי שומר פריים, עולה בדירוג.
            </p>
          </div>
          <WeeklyCountdown minimal />
        </div>

        <p className="mb-8 max-w-3xl text-sm leading-relaxed text-white/65">
          {WEEKLY_CHALLENGE.scenario}
        </p>

        <div className="arena-stat-strip mb-8 flex flex-wrap gap-x-8 gap-y-4 border-y border-white/6 py-5">
          <StatItem label="פרסונה" value={WEEKLY_CHALLENGE.persona} accent />
          <StatItem label="לחץ" value={`רמה ${4}`} />
          <StatItem
            label="משתתפים"
            value={WEEKLY_CHALLENGE.participants.toLocaleString()}
          />
          <StatItem label="פרס" value={WEEKLY_CHALLENGE.prize} accent />
          <StatItem label="פעילים עכשיו" value="847" live />
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {WEEKLY_CHALLENGE.metrics.map((m) => (
            <span key={m} className="font-brand text-[9px] text-white/40">
              {STAT_LABELS[m].labelHe}
            </span>
          ))}
        </div>

        {!isPremium ? (
          <PremiumGate
            title="הזירה המדורגת נעולה"
            description="תחרות שבועית, דירוג חי וטורנירים. גישת Warroom."
            blur={false}
          />
        ) : (
          <BrandLink href="/dashboard" variant="command" size="lg">
            כניסה לקרב
          </BrandLink>
        )}
      </div>
    </motion.section>
  );
}

function StatItem({
  label,
  value,
  accent,
  live,
}: {
  label: string;
  value: string;
  accent?: boolean;
  live?: boolean;
}) {
  return (
    <div>
      <p className="font-brand text-[8px] tracking-wide text-white/30">
        {label}
      </p>
      <p
        className={`mt-1 flex items-center gap-1.5 font-display text-lg font-bold sm:text-xl ${
          accent ? "text-accent" : "text-white"
        }`}
      >
        {live && (
          <span className="size-1.5 rounded-full bg-red-500 pressure-pulse" />
        )}
        {value}
      </p>
    </div>
  );
}

export function ArenaPersonalPerformance() {
  return (
    <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
      <div className="lg:col-span-2">
        <RankingCard player={CURRENT_USER} highlight minimal />
      </div>
      <div className="lg:col-span-3">
        <p className="mb-4 font-brand text-[9px] text-white/35">
          מדדי קרב, השבוע
        </p>
        <BattleStatsGrid stats={CURRENT_USER.stats} compact />
      </div>
    </div>
  );
}

/** @deprecated Use ArenaHeroChallenge. kept for imports */
export function ArenaChallengePanel() {
  return (
    <>
      <ArenaHeroChallenge />
      <div className="mt-14 sm:mt-16">
        <ArenaPersonalPerformance />
      </div>
    </>
  );
}

export function TournamentPanel() {
  const tournament = LIVE_TOURNAMENT;

  return (
    <div className="arena-panel-soft relative overflow-hidden p-6 sm:p-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-brand text-[9px] text-accent/70">טורניר פרימיום</p>
          <h3 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
            {tournament.nameHe}
          </h3>
        </div>
        <PremiumBadge />
      </div>

      <PremiumGate blur={false}>
        <div className="grid gap-8 md:grid-cols-2">
          <TournamentCountdown target={tournament.startsAt} minimal />
          <div className="space-y-4 text-sm">
            <InfoRow label="פורמט" value={tournament.format} />
            <InfoRow label="פרס" value={tournament.prizePool} accent />
            <InfoRow
              label="מקומות"
              value={`${tournament.filled}/${tournament.slots}`}
            />
            <div>
              <p className="mb-2 font-brand text-[8px] text-white/30">לחץ</p>
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
    <div className="flex items-center justify-between gap-4 border-b border-white/5 py-2 last:border-0">
      <span className="font-brand text-[9px] text-white/35">{label}</span>
      <span
        className={`text-sm font-medium ${accent ? "text-accent" : "text-white/80"}`}
      >
        {value}
      </span>
    </div>
  );
}

export function LiveArenaStatus() {
  return null;
}
