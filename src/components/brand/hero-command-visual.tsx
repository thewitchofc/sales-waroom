"use client";

import { motion } from "framer-motion";
import { LiveCallInterface } from "@/components/product/live-call-interface";
import { Waveform } from "@/components/ui/waveform";
import { ThreatMeter } from "@/components/ui/hud-elements";

const orbitLabels = [
  { label: "THREAT: HIGH", color: "text-red-400", delay: 0 },
  { label: "AI: ANALYZING", color: "text-accent", delay: 1 },
  { label: "VOICE: ACTIVE", color: "text-green-400", delay: 2 },
];

export function HeroCommandVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none" style={{ perspective: "1400px" }}>
      {/* Depth layer — blurred ghost panel */}
      <motion.div
        className="absolute inset-4 -z-10 scale-[0.92] opacity-20 blur-sm"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-full min-h-[420px] border border-accent/10 bg-accent/5" />
      </motion.div>

      {/* Side pressure rail */}
      <motion.div
        className="absolute -start-3 top-1/4 z-20 hidden w-12 flex-col items-center gap-3 lg:flex"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <span className="font-brand text-[8px] tracking-widest text-red-400/80 [writing-mode:vertical-rl] rotate-180">
          PRESSURE
        </span>
        <div className="relative h-32 w-1 overflow-hidden bg-white/5">
          <motion.div
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-red-500 via-accent to-green-500"
            animate={{ height: ["40%", "87%", "65%", "87%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="font-brand text-[9px] text-accent">87</span>
      </motion.div>

      {/* Main floating dashboard */}
      <motion.div
        initial={{ opacity: 0, rotateX: 12, rotateY: -8, y: 80 }}
        animate={{ opacity: 1, rotateX: 4, rotateY: -4, y: 0 }}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          animate={{ y: [0, -14, 0], rotateX: [4, 2, 4], rotateY: [-4, -2, -4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            {/* HUD chrome ring */}
            <div className="pointer-events-none absolute -inset-4 border border-accent/10" />
            <div className="pointer-events-none absolute -inset-8 border border-white/[0.03]" />

            <LiveCallInterface compact />

            {/* Glass reflection sweep */}
            <motion.div
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-sm"
              style={{ borderRadius: "inherit" }}
            >
              <motion.div
                className="absolute inset-y-0 w-1/3 bg-gradient-to-l from-transparent via-white/[0.04] to-transparent"
                animate={{ left: ["-40%", "140%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Orbiting HUD chips */}
      {orbitLabels.map((item, i) => (
        <motion.div
          key={item.label}
          className="absolute glass-premium z-10 hidden border border-white/5 px-3 py-1.5 lg:block"
          style={{
            top: `${15 + i * 28}%`,
            insetInlineEnd: i % 2 === 0 ? "-1.5rem" : "-2.5rem",
          }}
          animate={{
            y: [0, i % 2 === 0 ? -8 : 8, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: item.delay }}
        >
          <span className={`font-brand text-[8px] tracking-widest ${item.color}`}>
            {item.label}
          </span>
        </motion.div>
      ))}

      {/* Bottom waveform strip */}
      <motion.div
        className="absolute -bottom-8 inset-x-0 opacity-40"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Waveform bars={48} intense className="h-8" />
      </motion.div>

      {/* Ground glow */}
      <div
        className="absolute -bottom-16 start-1/2 h-24 w-4/5 -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(ellipse, rgba(212,175,85,0.25), transparent 70%)",
        }}
      />

      {/* Floating threat meter card */}
      <motion.div
        className="absolute -bottom-6 -start-2 z-20 hidden w-44 glass-premium p-3 md:block"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
      >
        <ThreatMeter level={87} />
      </motion.div>
    </div>
  );
}
