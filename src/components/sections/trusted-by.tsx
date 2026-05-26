"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Section } from "@/components/ui/section";

const arenaStats = [
  { value: "847", label: "לוחמים פעילים", live: true },
  { value: "2.4M", label: "שיחות מאומנות" },
  { value: "98%", label: "שימור צוותים" },
];

const topClosers = [
  { rank: 1, name: "אורי שפירא", score: 984, delta: "+2" },
  { rank: 2, name: "נועה גולד", score: 971, delta: "-1" },
  { rank: 3, name: "יוסי לוי", score: 956, delta: "+3" },
];

const companies = [
  "Stripe",
  "Salesforce",
  "HubSpot",
  "Gong",
  "Outreach",
  "Apollo",
  "Clari",
  "6sense",
];

export function TrustedBy() {
  return (
    <Section className="border-t border-white/5 py-14 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-8">
        <div className="lg:col-span-5">
          <p className="mb-2 font-brand text-[10px] tracking-[0.2em] text-accent">מערכת חיה</p>
          <h2 className="font-display text-2xl font-black text-white sm:text-3xl">
            תחרות שרצה
            <span className="mt-1 block text-white/45">גם כשאתם לא במסך</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/45">
            דירוגים, אתגרים שבועיים ולוחמים פעילים. המערכת לא מחכה.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {arenaStats.map((stat) => (
              <div
                key={stat.label}
                className="border border-white/5 bg-white/[0.02] px-3 py-4 sm:px-4"
              >
                <div className="flex items-center gap-1.5">
                  {stat.live && (
                    <motion.span
                      className="size-1.5 rounded-full bg-red-500"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    />
                  )}
                  <span className="font-display text-lg font-black text-white sm:text-xl">
                    {stat.value}
                  </span>
                </div>
                <div className="mt-1 text-[10px] text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="border border-white/5 bg-black/50 p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-brand text-[10px] text-accent">מובילים · השבוע</span>
              <Link href="/leaderboard" className="font-brand text-[9px] text-muted-foreground hover:text-accent">
                לוח דירוג ←
              </Link>
            </div>
            <div className="space-y-2">
              {topClosers.map((closer, i) => (
                <motion.div
                  key={closer.rank}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center justify-between border border-white/[0.04] bg-white/[0.02] px-4 py-3"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-display text-lg font-black ${closer.rank === 1 ? "text-accent" : "text-white/70"}`}
                    >
                      #{closer.rank}
                    </span>
                    <span className="text-sm font-medium text-white">{closer.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-brand text-[10px] text-green-400">{closer.delta}</span>
                    <span className="font-display text-base font-black text-white">{closer.score}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <Link
              href="/arena"
              className="mt-4 block border border-red-500/20 bg-red-500/5 px-4 py-3 text-center text-xs text-red-400/90 transition-colors hover:border-red-500/35 hover:text-red-300"
            >
              אתגר CFO שבועי · הזירה פתוחה
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
            {companies.map((company) => (
              <span
                key={company}
                className="border border-white/5 px-3 py-1.5 font-brand text-[9px] tracking-wider text-white/25 sm:px-4 sm:py-2 sm:text-[10px]"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
