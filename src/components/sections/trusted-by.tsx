"use client";

import { motion } from "framer-motion";
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
  "Monday",
  "Notion",
];

const trustStats = [
  { value: "500+", label: "צוותי מכירות" },
  { value: "98%", label: "שימור לקוחות" },
  { value: "2.4M", label: "שיחות מאומנות" },
  { value: "47", label: "מדינות" },
];

function LogoMarquee({
  items,
  direction = "rtl",
  speed = 40,
}: {
  items: string[];
  direction?: "rtl" | "ltr";
  speed?: number;
}) {
  const duplicated = [...items, ...items, ...items];
  const offset = direction === "rtl" ? -1200 : 1200;

  return (
    <div className="relative overflow-hidden py-3">
      <div className="pointer-events-none absolute start-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-black/90 to-transparent md:w-32" />
      <div className="pointer-events-none absolute end-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-black/90 to-transparent md:w-32" />

      <motion.div
        className="flex gap-6 whitespace-nowrap md:gap-8"
        animate={{ x: [0, offset] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {duplicated.map((company, i) => (
          <div
            key={`${company}-${i}`}
            className="group flex shrink-0 items-center gap-3 border border-white/5 bg-white/[0.02] px-5 py-3 transition-all hover:border-accent/25 hover:bg-accent/[0.04]"
          >
            <span className="flex h-8 w-8 items-center justify-center border border-white/10 bg-black/60 font-brand text-[10px] text-accent/80 transition-colors group-hover:border-accent/30 group-hover:text-accent">
              {company.slice(0, 2).toUpperCase()}
            </span>
            <span className="font-brand text-sm tracking-[0.12em] text-white/30 transition-colors group-hover:text-white/60">
              {company}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function TrustedBy() {
  return (
    <Section className="overflow-hidden py-16 md:py-24">
      {/* Ambient depth */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div className="absolute start-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.04] blur-3xl" />
        <div className="command-grid absolute inset-0 opacity-[0.15]" />
      </div>

      <div className="relative">
        <div className="section-divider mb-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="mb-3 font-brand text-[10px] tracking-[0.3em] text-accent">
            TRUSTED BY ELITE SALES TEAMS
          </p>
          <p className="text-base text-white/50 md:text-lg">
            נבחר על ידי צוותי מכירות עילית ברחבי העולם
          </p>
        </motion.div>

        {/* Trust metrics strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
        >
          {trustStats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass-premium metallic-border group px-4 py-5 text-center transition-colors hover:border-accent/20"
            >
              <div className="font-display text-2xl font-black text-white md:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
              <div
                className="mx-auto mt-3 h-px w-8 bg-gradient-to-l from-transparent to-accent/40 opacity-0 transition-opacity group-hover:opacity-100"
                style={{ transitionDelay: `${i * 50}ms` }}
              />
            </div>
          ))}
        </motion.div>

        {/* Marquee container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="glass-premium metallic-border cinematic-depth overflow-hidden border border-white/5 bg-black/40 p-1 md:p-2"
        >
          <div className="border border-white/5 bg-black/30 px-2 py-2 md:px-4 md:py-3">
            <div className="mb-3 flex items-center justify-between px-2">
              <span className="font-brand text-[9px] tracking-widest text-muted-foreground">
                ENTERPRISE PARTNERS
              </span>
              <span className="flex items-center gap-2 text-[10px] text-green-400/80">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 pressure-pulse" />
                VERIFIED DEPLOYMENTS
              </span>
            </div>

            <LogoMarquee items={companies} direction="rtl" speed={45} />
            <LogoMarquee items={[...companies].reverse()} direction="ltr" speed={52} />
          </div>
        </motion.div>

        {/* Bottom endorsement strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-xs text-white/30"
        >
          <span>SOC 2 TYPE II</span>
          <span className="hidden h-3 w-px bg-white/10 sm:block" />
          <span>GDPR READY</span>
          <span className="hidden h-3 w-px bg-white/10 sm:block" />
          <span>99.9% UPTIME SLA</span>
          <span className="hidden h-3 w-px bg-white/10 sm:block" />
          <span>ISO 27001</span>
        </motion.div>
      </div>
    </Section>
  );
}
