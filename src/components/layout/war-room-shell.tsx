"use client";

import { motion } from "framer-motion";

export function WarRoomShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Global HUD overlay — subtle command center frame */}
      <div className="pointer-events-none fixed inset-0 z-40 hidden lg:block">
        <div className="absolute start-6 top-24 h-8 w-8 border-s border-t border-accent/20" />
        <div className="absolute end-6 top-24 h-8 w-8 border-e border-t border-accent/20" />
        <div className="absolute bottom-6 start-6 h-8 w-8 border-s border-b border-accent/20" />
        <div className="absolute bottom-6 end-6 h-8 w-8 border-e border-b border-accent/20" />
      </div>

      {/* Fixed system status — top edge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="pointer-events-none fixed top-16 start-1/2 z-30 hidden -translate-x-1/2 items-center gap-4 md:flex"
      >
        <SystemPulse label="PLATFORM" status="OPERATIONAL" color="green" />
        <div className="h-3 w-px bg-white/10" />
        <SystemPulse label="AI ENGINE" status="ACTIVE" color="accent" />
        <div className="h-3 w-px bg-white/10" />
        <SystemPulse label="SIMULATIONS" status="247 LIVE" color="green" />
      </motion.div>

      {children}
    </div>
  );
}

function SystemPulse({
  label,
  status,
  color,
}: {
  label: string;
  status: string;
  color: "green" | "accent";
}) {
  const dotColor = color === "green" ? "bg-green-400" : "bg-accent";
  const textColor = color === "green" ? "text-green-400" : "text-accent";

  return (
    <div className="flex items-center gap-2 rounded-none border border-white/5 bg-black/60 px-3 py-1 backdrop-blur-sm">
      <motion.span
        className={`size-1.5 rounded-full ${dotColor}`}
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="font-brand text-[8px] text-muted-foreground">{label}</span>
      <span className={`font-brand text-[8px] ${textColor}`}>{status}</span>
    </div>
  );
}
