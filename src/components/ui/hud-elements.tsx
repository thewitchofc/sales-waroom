"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HudFrame({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <span className="hud-corner hud-corner-tl" />
      <span className="hud-corner hud-corner-tr" />
      <span className="hud-corner hud-corner-bl" />
      <span className="hud-corner hud-corner-br" />
      {label && (
        <div className="absolute -top-3 start-6 font-brand text-[10px] tracking-widest text-accent/70">
          {label}
        </div>
      )}
      {children}
    </div>
  );
}

export function StatusIndicator({
  label,
  value,
  status = "active",
}: {
  label: string;
  value: string;
  status?: "active" | "warning" | "critical";
}) {
  const colors = {
    active: "bg-green-400",
    warning: "bg-accent",
    critical: "bg-red-500",
  };

  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/5 py-2 last:border-0">
      <span className="font-brand text-[10px] text-muted-foreground">{value}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs text-white/70">{label}</span>
        <motion.span
          className={cn("size-1.5 rounded-full", colors[status])}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    </div>
  );
}

export function ThreatMeter({ level = 87 }: { level?: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-brand text-[10px] text-accent">{level}%</span>
        <span className="text-[10px] text-red-400/80">לחץ INDEX</span>
      </div>
      <div className="relative h-1.5 overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="absolute inset-y-0 end-0 rounded-full bg-gradient-to-l from-red-500 via-accent to-green-500"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export function ClassifiedBadge() {
  return (
    <motion.div
      className="inline-flex items-center gap-3 border border-accent/25 bg-black/60 px-4 py-1.5 backdrop-blur-sm"
      animate={{
        borderColor: ["rgba(212,175,85,0.25)", "rgba(212,175,85,0.55)", "rgba(212,175,85,0.25)"],
        boxShadow: [
          "0 0 0 rgba(212,175,85,0)",
          "0 0 30px rgba(212,175,85,0.15)",
          "0 0 0 rgba(212,175,85,0)",
        ],
      }}
      transition={{ duration: 4, repeat: Infinity }}
    >
      <motion.span
        className="size-1.5 bg-red-500"
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <span className="font-brand text-[9px] tracking-[0.3em] text-accent">
        סודי // גישת עילית בלבד
      </span>
    </motion.div>
  );
}
