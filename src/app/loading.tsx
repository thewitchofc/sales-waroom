"use client";

import { motion } from "framer-motion";
import { BrandLogo } from "@/components/brand/brand-logo";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-8"
      >
        <BrandLogo variant="loading" priority />
        <div className="h-px w-32 overflow-hidden bg-white/10">
          <motion.div
            className="h-full w-1/2 bg-accent/60"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
