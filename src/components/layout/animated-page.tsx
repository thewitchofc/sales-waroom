"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  cinematicEase,
  pageTransition,
  pageTransitionReduced,
} from "@/lib/motion";

export function AnimatedPage({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const variants = reduced ? pageTransitionReduced : pageTransition;

  return (
    <motion.div
      key={pathname}
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      transition={{ duration: reduced ? 0.2 : 0.45, ease: cinematicEase }}
    >
      {children}
    </motion.div>
  );
}
