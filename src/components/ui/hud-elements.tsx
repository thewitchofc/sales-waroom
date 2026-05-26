"use client";

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
      {label && (
        <div className="mb-3 font-brand text-[9px] tracking-wider text-white/30">
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
    active: "bg-white/50",
    warning: "bg-accent/70",
    critical: "bg-red-500/80",
  };

  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/5 py-2 last:border-0">
      <span className="font-brand text-[10px] text-muted-foreground">{value}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs text-white/70">{label}</span>
        <span className={cn("size-1.5 rounded-full", colors[status])} />
      </div>
    </div>
  );
}

export function ThreatMeter({ level = 87 }: { level?: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-brand text-[10px] text-accent">{level}%</span>
        <span className="text-[10px] text-white/40">לחץ</span>
      </div>
      <div className="relative h-1 overflow-hidden bg-white/5">
        <div
          className="absolute inset-y-0 end-0 bg-accent/50"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

export function ClassifiedBadge() {
  return (
    <div className="inline-flex items-center gap-2 border border-white/10 bg-black/40 px-3 py-1">
      <span className="size-1 bg-red-500/80" />
      <span className="font-brand text-[9px] tracking-wider text-white/50">
        סודי · גישת עילית
      </span>
    </div>
  );
}
