"use client";

import { motion } from "framer-motion";

interface PremiumEmptyStateProps {
  title: string;
  description: string;
  status?: string;
}

export function PremiumEmptyState({
  title,
  description,
  status = "STANDBY",
}: PremiumEmptyStateProps) {
  return (
    <div className="relative overflow-hidden border border-dashed border-white/10 bg-black/30 px-6 py-10 text-center">
      <div className="pointer-events-none absolute inset-0 command-grid opacity-10" />
      <motion.div
        className="relative mx-auto mb-5 flex size-12 items-center justify-center border border-accent/20 bg-accent/5"
        animate={{ boxShadow: ["0 0 0 rgba(212,175,85,0)", "0 0 24px rgba(212,175,85,0.15)", "0 0 0 rgba(212,175,85,0)"] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <motion.span
          className="size-2 rounded-full bg-accent/60"
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
      <p className="font-brand text-[9px] tracking-widest text-accent">{status}</p>
      <p className="mt-3 text-sm font-medium text-white/80">{title}</p>
      <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
