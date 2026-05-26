"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cinematicEase, introSequence } from "@/lib/motion";
import { BrandLogo } from "@/components/brand/brand-logo";
import { siteConfig } from "@/config/site";

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
    }, 2600);
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
          transition={{ duration: introSequence.exit.duration, ease: cinematicEase }}
        >
          <div className="absolute inset-0 command-grid opacity-15" />
          <motion.div
            className="absolute size-[500px] rounded-full bg-accent/10 blur-[140px]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 0.4 }}
            transition={{ duration: 1.2, ease: cinematicEase }}
          />

          <div className="relative flex flex-col items-center gap-10 px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{
                duration: introSequence.logo.duration,
                delay: introSequence.logo.delay,
                ease: cinematicEase,
              }}
              className="relative"
            >
              <BrandLogo variant="intro" priority shimmer />
              <span className="hud-corner hud-corner-tl !-top-3 !-start-3 !size-4" />
              <span className="hud-corner hud-corner-tr !-top-3 !-end-3 !size-4" />
              <span className="hud-corner hud-corner-bl !-bottom-3 !-start-3 !size-4" />
              <span className="hud-corner hud-corner-br !-bottom-3 !-end-3 !size-4" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: introSequence.brand.duration,
                delay: introSequence.brand.delay,
                ease: cinematicEase,
              }}
              className="font-brand text-[9px] tracking-[0.35em] text-muted-foreground"
            >
              {siteConfig.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: introSequence.status.delay, duration: introSequence.status.duration }}
              className="flex items-center gap-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-3 w-px bg-accent"
                  animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.12 }}
                />
              ))}
              <span className="font-brand text-[9px] text-accent/80">BOOT SEQUENCE</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
