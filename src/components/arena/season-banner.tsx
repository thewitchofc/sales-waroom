"use client";

import { motion } from "framer-motion";
import { CURRENT_SEASON } from "@/config/arena-data";
import { useCountdown, formatCountdown } from "@/hooks/use-arena-countdown";
import { WEEKLY_CHALLENGE } from "@/config/arena-data";

export function SeasonBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="arena-banner relative overflow-hidden border border-accent/20 bg-gradient-to-l from-accent/10 via-black to-red-500/10 p-5 md:p-6"
    >
      <div className="arena-scan pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="font-brand text-[10px] tracking-[0.3em] text-accent">
            SEASON {CURRENT_SEASON.id}, ACTIVE
          </div>
          <h2 className="mt-1 font-display text-2xl font-black text-white md:text-3xl">
            {CURRENT_SEASON.nameHe}
          </h2>
          <p className="mt-1 text-sm text-white/50">{CURRENT_SEASON.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-6 md:gap-10">
          <StatBlock
            label="ימים נותרו"
            value={String(CURRENT_SEASON.daysRemaining)}
            accent
          />
          <StatBlock
            label="קרבות"
            value={CURRENT_SEASON.totalBattles.toLocaleString()}
          />
          <StatBlock
            label="לוחמים"
            value={CURRENT_SEASON.activePlayers.toLocaleString()}
            live
          />
        </div>
      </div>
    </motion.div>
  );
}

function StatBlock({
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
    <div className="text-center">
      <div
        className={`font-display text-2xl font-black md:text-3xl ${
          accent ? "text-accent" : "text-white"
        }`}
      >
        {value}
      </div>
      <div className="mt-1 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
        {live && (
          <motion.span
            className="size-1.5 rounded-full bg-green-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        {label}
      </div>
    </div>
  );
}

export function TournamentCountdown({
  target,
  label = "הטורניר מתחיל",
  minimal = false,
  atmospheric = false,
}: {
  target: Date;
  label?: string;
  minimal?: boolean;
  atmospheric?: boolean;
}) {
  const remaining = useCountdown(target);

  if (atmospheric) {
    return (
      <div>
        <p className="font-brand text-[9px] tracking-[0.1em] text-white/30">
          {label}
        </p>
        <motion.p
          key={formatCountdown(remaining, true)}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          className="mt-2 font-display text-3xl font-black tabular-nums tracking-tight text-white sm:text-4xl"
        >
          {remaining.expired ? "התחיל" : formatCountdown(remaining, true)}
        </motion.p>
        {!remaining.expired && (
          <p className="mt-1.5 font-brand text-[9px] text-white/25">
            {formatCountdown(remaining)}
          </p>
        )}
      </div>
    );
  }

  if (minimal) {
    return (
      <div>
        <p className="font-brand text-[8px] text-red-400/80">{label}</p>
        <motion.p
          key={formatCountdown(remaining, true)}
          initial={{ scale: 1.03 }}
          animate={{ scale: 1 }}
          className="mt-2 font-display text-3xl font-black tabular-nums text-white"
        >
          {formatCountdown(remaining, true)}
        </motion.p>
      </div>
    );
  }

  return (
    <div className="border border-red-500/30 bg-red-500/5 p-4">
      <div className="mb-2 font-brand text-[9px] text-red-400">{label}</div>
      <motion.div
        key={formatCountdown(remaining, true)}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        className="font-display text-3xl font-black tabular-nums text-white md:text-4xl"
      >
        {formatCountdown(remaining, true)}
      </motion.div>
      {!remaining.expired && (
        <div className="mt-2 font-brand text-[9px] text-muted-foreground">
          {formatCountdown(remaining)}
        </div>
      )}
    </div>
  );
}

export function WeeklyCountdown({ minimal = false }: { minimal?: boolean }) {
  const remaining = useCountdown(WEEKLY_CHALLENGE.endsAt);

  if (minimal) {
    return (
      <div className="text-end">
        <p className="font-brand text-[8px] text-white/35">נותר לסגירה</p>
        <motion.p
          key={remaining.total}
          className="mt-1 font-display text-2xl font-black text-accent sm:text-3xl"
        >
          {remaining.expired ? "סגור" : formatCountdown(remaining)}
        </motion.p>
      </div>
    );
  }

  return (
    <div className="border border-white/5 bg-black/50 p-4">
      <div className="mb-2 font-brand text-[9px] text-muted-foreground">
        אתגר שבועי ENDS
      </div>
      <motion.div
        key={remaining.total}
        className="font-display text-2xl font-black text-accent"
      >
        {remaining.expired ? "סגור" : formatCountdown(remaining)}
      </motion.div>
    </div>
  );
}
