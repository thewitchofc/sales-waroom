"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  premium?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = true,
  delay = 0,
  premium = false,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={
        hover
          ? {
              y: -6,
              transition: { duration: 0.3 },
            }
          : undefined
      }
      className={cn(
        "relative overflow-hidden rounded-none",
        premium ? "glass-premium glass-reflection metallic-border" : "glass metallic-border",
        hover &&
          "transition-all duration-500 hover:glow-accent hover:border-accent/20",
        "p-7 md:p-9",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {children}
    </motion.div>
  );
}
