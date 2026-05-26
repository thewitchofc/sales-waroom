"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getWeeklyArenaCountdown() {
  const now = new Date();
  const target = new Date(now);
  const day = now.getDay();
  const daysUntilSunday = day === 0 ? 7 : 7 - day;
  target.setDate(now.getDate() + daysUntilSunday);
  target.setHours(20, 0, 0, 0);
  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 7);
  }
  const diff = target.getTime() - now.getTime();
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function getSeasonDaysLeft() {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  const diff = end.getTime() - now.getTime();
  return Math.max(1, Math.ceil(diff / 86400000));
}

const hudItems: {
  label: string;
  key: "operators" | "arena" | "simulations" | "season" | "leader";
  pulse?: boolean;
  mono?: boolean;
}[] = [
  { label: "מפעילים פעילים", key: "operators", pulse: true },
  { label: "הזירה השבועית", key: "arena", mono: true },
  { label: "סימולציות חיות", key: "simulations" },
  { label: "סגירת עונה", key: "season" },
  { label: "מוביל השבוע", key: "leader", mono: true },
];

export function PricingLiveHud() {
  const reduced = useReducedMotion();
  const [operators, setOperators] = useState(214);
  const [simulations, setSimulations] = useState(42);
  const [countdown, setCountdown] = useState("03:12:44");
  const [seasonDays, setSeasonDays] = useState(2);

  useEffect(() => {
    setCountdown(getWeeklyArenaCountdown());
    setSeasonDays(getSeasonDaysLeft());
    const id = setInterval(() => {
      setCountdown(getWeeklyArenaCountdown());
      if (!reduced) {
        setOperators(210 + Math.floor(Math.random() * 12));
        setSimulations(38 + Math.floor(Math.random() * 10));
      }
    }, 1000);
    return () => clearInterval(id);
  }, [reduced]);

  const values: Record<(typeof hudItems)[number]["key"], string> = {
    operators: String(operators),
    arena: countdown,
    simulations: String(simulations),
    season: `${seasonDays} ימים`,
    leader: "#דניאל_ק",
  };

  return (
    <section className="relative border-b border-white/5 px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
      <div className="pointer-events-none absolute inset-0 ai-scan-line opacity-40" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(212,175,85,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-6 flex items-center gap-2">
          <span className="pressure-pulse size-1.5 rounded-full bg-accent" />
          <span className="font-brand text-[9px] tracking-[0.2em] text-accent/80">
            סטטוס חי · מערכת פעילה
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {hudItems.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="pricing-hud-cell relative border border-white/8 bg-black/60 px-4 py-4 sm:px-5 sm:py-5"
            >
              <p className="font-brand text-[8px] tracking-[0.15em] text-white/35">
                {item.label}
              </p>
              <p
                className={`mt-2 font-display text-xl font-black text-white sm:text-2xl ${
                  item.mono ? "font-brand text-lg tracking-wider sm:text-xl" : ""
                }`}
                dir={item.mono ? "ltr" : undefined}
              >
                {values[item.key]}
              </p>
              {item.pulse && (
                <span className="absolute end-3 top-3 size-1.5 rounded-full bg-accent pressure-pulse" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
