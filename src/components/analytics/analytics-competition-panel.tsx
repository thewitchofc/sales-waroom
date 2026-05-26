"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { COMPETITION_INTEL } from "@/config/analytics-intelligence-data";

const stats = [
  {
    label: "עלמת מפעילים",
    value: `${COMPETITION_INTEL.outperform}%`,
    sub: "ביצועים מעל הממוצע",
  },
  {
    label: "דירוג נוכחי",
    value: `#${COMPETITION_INTEL.rank}`,
    sub: "בלוח הדירוג החי",
    href: "/leaderboard",
  },
  {
    label: "תנועה שבועית",
    value: COMPETITION_INTEL.weeklyMovement,
    sub: "מקומות בעלייה",
  },
  {
    label: "דירוג עמידות",
    value: `#${COMPETITION_INTEL.pressureRank}`,
    sub: "עמידות בלחץ",
  },
  {
    label: "רצף סגירות",
    value: String(COMPETITION_INTEL.closingStreak),
    sub: "רצף פעיל, הזירה",
    href: "/arena",
  },
];

export function AnalyticsCompetitionPanel() {
  return (
    <section className="relative border-y border-white/5 px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(212,175,85,0.05) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-brand text-[10px] tracking-[0.2em] text-accent">
              חיבור להזירה
            </p>
            <h2 className="mt-3 font-display text-2xl font-black text-white sm:text-3xl">
              האנליטיקה שלך = המיקום שלך בקרב
            </h2>
          </div>
          <Link
            href="/leaderboard"
            className="font-brand text-[10px] text-accent/80 transition-colors hover:text-accent"
          >
            ללוח הדירוג ←
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat, i) => {
            const content = (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`analytics-comp-stat border border-white/8 bg-black/60 p-5 sm:p-6 ${
                  stat.href ? "transition-colors hover:border-accent/25" : ""
                }`}
              >
                <p className="font-brand text-[8px] tracking-[0.12em] text-white/35">
                  {stat.label}
                </p>
                <p className="mt-3 font-display text-3xl font-black text-accent">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs text-white/40">{stat.sub}</p>
              </motion.div>
            );

            return stat.href ? (
              <Link key={stat.label} href={stat.href} className="block">
                {content}
              </Link>
            ) : (
              <div key={stat.label}>{content}</div>
            );
          })}
        </div>

        <p className="mt-8 text-center font-brand text-[10px] text-white/30">
          רק מנויים נכנסים לקרבות מדורגים, הלוח מתעדכן כל שבוע
        </p>
      </div>
    </section>
  );
}
