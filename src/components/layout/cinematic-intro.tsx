"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cinematicEase, introSequence } from "@/lib/motion";
import { BrandLogo } from "@/components/brand/brand-logo";

const INTRO_KEY = "sw-intro-seen";

export function CinematicIntro() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (reduced || sessionStorage.getItem(INTRO_KEY)) return;
    setVisible(true);
    const timer = setTimeout(() => {
      sessionStorage.setItem(INTRO_KEY, "1");
      setVisible(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, [reduced]);

  if (!mounted || reduced) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: introSequence.exit.duration,
            ease: cinematicEase,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: cinematicEase }}
          >
            <BrandLogo variant="intro" priority />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
