"use client";

import { Section } from "@/components/ui/section";

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

const trustStats = [
  { value: "500+", label: "צוותי מכירות" },
  { value: "98%", label: "שימור לקוחות" },
  { value: "2.4M", label: "שיחות מאומנות" },
  { value: "47", label: "מדינות" },
];

export function TrustedBy() {
  return (
    <Section className="border-t border-white/5 bg-black py-14 sm:py-20">
      <div className="mb-8 text-center sm:mb-10">
        <p className="mb-2 font-brand text-[10px] tracking-[0.2em] text-accent">
          TRUSTED BY TEAMS
        </p>
        <p className="text-sm text-white/50 sm:text-base">
          נבחר על ידי צוותי מכירות ברחבי העולם
        </p>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {trustStats.map((stat) => (
          <div
            key={stat.label}
            className="panel-surface border border-white/5 px-4 py-4 text-center sm:py-5"
          >
            <div className="font-display text-xl font-black text-white sm:text-2xl">
              {stat.value}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {companies.map((company) => (
          <span
            key={company}
            className="border border-white/5 px-4 py-2 font-brand text-[10px] tracking-wider text-white/30"
          >
            {company}
          </span>
        ))}
      </div>
    </Section>
  );
}
