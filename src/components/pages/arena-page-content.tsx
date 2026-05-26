"use client";

import Link from "next/link";
import { ArenaHeroChallenge, ArenaPersonalPerformance, TournamentPanel } from "@/components/arena/arena-challenge-panel";
import { LeaderboardPodium } from "@/components/arena/leaderboard-table";
import { LEADERBOARD_PLAYERS, CURRENT_SEASON } from "@/config/arena-data";
import { BrandLink } from "@/components/brand/brand-link";

function ArenaSectionLabel({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3 sm:mb-8">
      <h2 className="font-display text-xl font-bold text-white sm:text-2xl">{children}</h2>
      {action}
    </div>
  );
}

export function ArenaPageContent() {
  return (
    <div className="arena-page pb-8">
      <ArenaHeroChallenge />

      <section className="mt-14 sm:mt-16 lg:mt-20">
        <ArenaSectionLabel>הביצועים שלך</ArenaSectionLabel>
        <ArenaPersonalPerformance />
      </section>

      <section className="mt-14 sm:mt-16 lg:mt-20">
        <ArenaSectionLabel
          action={
            <Link href="/leaderboard" className="font-brand text-[10px] text-accent/80 hover:text-accent">
              לדירוג המלא ←
            </Link>
          }
        >
          שלושה מובילים · השבוע
        </ArenaSectionLabel>
        <LeaderboardPodium players={LEADERBOARD_PLAYERS} minimal />
      </section>

      <section className="mt-14 sm:mt-16 lg:mt-20">
        <ArenaSectionLabel
          action={
            <Link href="/season" className="font-brand text-[10px] text-white/35 hover:text-accent">
              {CURRENT_SEASON.nameHe} ←
            </Link>
          }
        >
          קהילה · טורנירים
        </ArenaSectionLabel>
        <TournamentPanel />
      </section>

      <div className="mt-12 flex flex-wrap gap-3 border-t border-white/5 pt-8">
        <BrandLink href="/leaderboard" variant="secondary" size="sm">
          לוח דירוג
        </BrandLink>
        <BrandLink href="/season" variant="ghost" size="sm" className="text-muted-foreground">
          עונה {CURRENT_SEASON.id}
        </BrandLink>
      </div>
    </div>
  );
}
