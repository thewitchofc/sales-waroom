"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface WaveformProps {
  bars?: number;
  className?: string;
  active?: boolean;
  intense?: boolean;
}

function WaveformInner({
  bars = 40,
  className = "",
  active = true,
  intense = false,
}: WaveformProps) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const barCount = isMobile ? Math.min(bars, Math.ceil(bars * 0.55)) : bars;
  const [heights, setHeights] = useState<number[]>(() =>
    Array.from({ length: barCount }, () => 0.15),
  );

  const intervalMs = useMemo(() => {
    if (reduced) return 200;
    if (isMobile) return intense ? 120 : 160;
    return intense ? 80 : 120;
  }, [intense, isMobile, reduced]);

  useEffect(() => {
    setHeights(Array.from({ length: barCount }, () => 0.15));
  }, [barCount]);

  useEffect(() => {
    if (!active || reduced) return;

    const interval = setInterval(() => {
      setHeights(
        Array.from({ length: barCount }, (_, i) => {
          const center = barCount / 2;
          const dist = Math.abs(i - center) / center;
          const base = intense
            ? 0.2 + (1 - dist) * 0.5
            : 0.12 + (1 - dist) * 0.35;
          const spike = intense && Math.random() > 0.85 ? 0.3 : 0;
          return Math.min(base + Math.random() * 0.55 + spike, 1);
        }),
      );
    }, intervalMs);

    return () => clearInterval(interval);
  }, [active, barCount, intense, intervalMs, reduced]);

  return (
    <div
      className={`flex h-16 items-end justify-center gap-[2px] ${className}`}
    >
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-accent/20 via-accent/60 to-white/80 transition-[height,opacity,box-shadow] duration-100 ease-out"
          style={{
            height: `${h * 100}%`,
            opacity: active ? 0.5 + h * 0.5 : 0.15,
            boxShadow:
              h > 0.7 && intense && !isMobile
                ? "0 0 8px rgba(212,175,85,0.5)"
                : "transparent",
          }}
        />
      ))}
    </div>
  );
}

export const Waveform = memo(WaveformInner);

export function VoiceUI({
  className = "",
  active = true,
}: {
  className?: string;
  active?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <div className={`relative ${className}`}>
      {!reduced &&
        [1, 1.4, 1.8].map((scale, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-accent/20"
            animate={
              active
                ? { scale: [1, scale, 1], opacity: [0.4, 0, 0.4] }
                : { opacity: 0.1 }
            }
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      <div className="relative flex size-20 items-center justify-center rounded-full glass-premium glass-reflection glass-shimmer metallic-border glow-accent sm:size-24">
        <motion.div
          className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-accent/40 to-accent-secondary/20 sm:size-16"
          animate={active && !reduced ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg
            className="size-5 text-white sm:size-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
