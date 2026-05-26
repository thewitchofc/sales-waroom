"use client";

import { motion } from "framer-motion";
import { BrandLogo } from "@/components/brand/brand-logo";
import { siteConfig } from "@/config/site";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
      <div className="absolute inset-0 command-grid opacity-20" />
      <motion.div
        className="absolute size-72 rounded-full bg-accent/10 blur-[100px] sm:size-96 sm:blur-[120px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative flex w-full max-w-xs flex-col items-center gap-8 px-6 sm:max-w-sm"
      >
        <div className="relative">
          <BrandLogo variant="loading" priority shimmer />
          <motion.div
            className="pointer-events-none absolute -inset-4 border border-accent/20"
            animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
        </div>

        <div className="w-full space-y-3 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-brand text-[9px] tracking-[0.25em] text-muted-foreground"
          >
            {siteConfig.tagline}
          </motion.p>
          <div className="relative h-px overflow-hidden bg-white/10">
            <motion.div
              className="absolute inset-y-0 start-0 w-1/3 bg-gradient-to-l from-accent to-transparent"
              animate={{ x: ["-100%", "400%"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <motion.p
            className="font-brand text-[9px] tracking-[0.2em] text-muted-foreground sm:text-[10px]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            LOADING COMMAND MODULE
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
