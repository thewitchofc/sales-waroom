"use client";

import { motion } from "framer-motion";

export function AnimatedGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <motion.div
        className="absolute inset-0 grid-bg opacity-20"
        animate={{
          backgroundPosition: ["0px 0px", "60px 60px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      <div className="absolute inset-0 bg-gradient-to-l from-background/80 via-transparent to-background/80" />
    </div>
  );
}

export function FloatingGlows() {
  const glows = [
    { top: "10%", left: "15%", size: 400, color: "rgba(201,169,98,0.15)", delay: 0 },
    { top: "60%", left: "70%", size: 500, color: "rgba(139,157,195,0.12)", delay: 2 },
    { top: "30%", left: "80%", size: 300, color: "rgba(201,169,98,0.08)", delay: 4 },
    { top: "80%", left: "20%", size: 350, color: "rgba(139,157,195,0.1)", delay: 1 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {glows.map((glow, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[100px]"
          style={{
            top: glow.top,
            left: glow.left,
            width: glow.size,
            height: glow.size,
            background: glow.color,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            delay: glow.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function ScanLine() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
  );
}
