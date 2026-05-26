"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface WaveformProps {
  bars?: number;
  className?: string;
  active?: boolean;
  intense?: boolean;
}

export function Waveform({
  bars = 40,
  className = "",
  active = true,
  intense = false,
}: WaveformProps) {
  const [heights, setHeights] = useState<number[]>(() =>
    Array.from({ length: bars }, () => 0.15)
  );

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setHeights(
        Array.from({ length: bars }, (_, i) => {
          const center = bars / 2;
          const dist = Math.abs(i - center) / center;
          const base = intense ? 0.2 + (1 - dist) * 0.5 : 0.12 + (1 - dist) * 0.35;
          const spike = intense && Math.random() > 0.85 ? 0.3 : 0;
          return Math.min(base + Math.random() * 0.55 + spike, 1);
        })
      );
    }, intense ? 80 : 120);

    return () => clearInterval(interval);
  }, [active, bars, intense]);

  return (
    <div className={`flex items-end justify-center gap-[2px] h-16 ${className}`}>
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-accent/20 via-accent/60 to-white/80"
          animate={{
            height: `${h * 100}%`,
            opacity: active ? 0.5 + h * 0.5 : 0.15,
            boxShadow:
              h > 0.7 && intense
                ? "0 0 8px rgba(212,175,85,0.5)"
                : "0 0 0 transparent",
          }}
          transition={{ duration: 0.1, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export function VoiceUI({ className = "", active = true }: { className?: string; active?: boolean }) {
  return (
    <div className={`relative ${className}`}>
      {[1, 1.4, 1.8].map((scale, i) => (
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
      <div className="relative flex size-24 items-center justify-center rounded-full glass-premium metallic-border glow-accent">
        <motion.div
          className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-accent/40 to-accent-secondary/20"
          animate={active ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="size-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
