"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TRAINING_COMPETITION } from "@/config/training-combat-data";

const stats = [
  { label: "מדד דומיננטיות", value: String(TRAINING_COMPETITION.dominance), suffix: "" },
  { label: "דירוג שבועי", value: `#${TRAINING_COMPETITION.weeklyRank}`, href: "/leaderboard" },
  { label: "רצף ניצחונות", value: String(TRAINING_COMPETITION.winStreak) },
  { label: "רצף סגירות", value: String(TRAINING_COMPETITION.closingStreak), href: "/arena" },
  {
    label: "עמידות בלחץ",
    value: String(TRAINING_COMPETITION.pressureResistance),
    suffix: "",
  },
  {
    label: "מעל מפעילים",
    value: `${TRAINING_COMPETITION.outperform}%`,
    highlight: true,
  },
];

export function TrainingCompetitionStrip() {
  return (
    <div className="mb-10 border border-white/8 bg-black/50 p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="font-brand text-[9px] tracking-[0.15em] text-accent">מערכת תחרותית</p>
        <Link href="/leaderboard" className="font-brand text-[9px] text-white/40 hover:text-accent">
          ללוח הדירוג ←
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat, i) => {
          const inner = (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className={`analytics-comp-stat border border-white/6 bg-black/40 p-4 ${
                stat.highlight ? "border-accent/20 bg-accent/[0.03]" : ""
              } ${stat.href ? "transition-colors hover:border-accent/20" : ""}`}
            >
              <p className="font-brand text-[8px] text-white/35">{stat.label}</p>
              <p
                className={`mt-2 font-display text-2xl font-black ${
                  stat.highlight ? "text-accent" : "text-white"
                }`}
              >
                {stat.value}
                {stat.suffix}
              </p>
            </motion.div>
          );
          return stat.href ? (
            <Link key={stat.label} href={stat.href} className="block">
              {inner}
            </Link>
          ) : (
            <div key={stat.label}>{inner}</div>
          );
        })}
      </div>
    </div>
  );
}
