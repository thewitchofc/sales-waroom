"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SeasonBanner } from "@/components/arena/season-banner";
import {
  ArenaChallengePanel,
  TournamentPanel,
  LiveArenaStatus,
} from "@/components/arena/arena-challenge-panel";
import { LeaderboardPodium } from "@/components/arena/leaderboard-table";
import { LEADERBOARD_PLAYERS } from "@/config/arena-data";
import { BrandLogoLink } from "@/components/brand/brand-logo";
import { BrandLink } from "@/components/brand/brand-link";

export function ArenaPageContent() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-end gap-5">
          <BrandLogoLink href="/" variant="arena" hoverGlow className="hidden sm:inline-flex" />
          <div>
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-2 font-brand text-[10px] tracking-[0.3em] text-red-400"
          >
            ⚔ COMPETITIVE ARENA
          </motion.div>
          <h1 className="font-display text-3xl font-black text-white sm:text-4xl md:text-5xl">
            זירת המלחמה
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            אותו תרחיש. אותו לקוח דומיננטי. מי שומר frame — עולה בדירוג. מי נשבר — נופל.
          </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <BrandLink href="/leaderboard" variant="secondary" size="sm">
            Leaderboard
          </BrandLink>
          <Link
            href="/season"
            className="interactive-surface border border-white/10 px-4 py-2 text-xs text-muted-foreground hover:border-accent/30 hover:text-white"
          >
            Season {4}
          </Link>
        </div>
      </div>

      <SeasonBanner />
      <LiveArenaStatus />
      <ArenaChallengePanel />

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-white">Top 3 · This Week</h2>
          <Link href="/leaderboard" className="font-brand text-[10px] text-accent hover:underline">
            VIEW FULL RANKINGS →
          </Link>
        </div>
        <LeaderboardPodium players={LEADERBOARD_PLAYERS} />
      </div>

      <TournamentPanel />
    </div>
  );
}
