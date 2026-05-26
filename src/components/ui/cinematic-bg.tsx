"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Waveform } from "@/components/ui/waveform";

export function CinematicBackground({ intense = false }: { intense?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#000000]" />
      <div className="absolute inset-0 metallic-texture opacity-80" />
      <div className="absolute inset-0 command-grid opacity-[0.35]" />
      <AnimatedGridLayer />
      <HorizonGlow />
      <LightBeams intense={intense} />
      <RadarSweep />
      <FloatingParticles count={intense ? 55 : 35} />
      <RadialSpotlight />
      {intense && <AmbientWaveformLayer />}
      <div className="absolute inset-0 vignette opacity-90" />
      <div className="noise-overlay absolute inset-0 opacity-70" />
      <ScanLine />
      {intense && <ThreatScanLines />}
    </div>
  );
}

function AnimatedGridLayer() {
  return (
    <>
      <div className="absolute inset-0 grid-bg opacity-[0.15]" />
      <motion.div
        className="absolute inset-0 grid-bg opacity-[0.08]"
        animate={{ backgroundPosition: ["0px 0px", "48px 48px"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
      <div className="absolute inset-0 bg-gradient-to-l from-black via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
    </>
  );
}

function HorizonGlow() {
  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 h-[40%]"
      style={{
        background:
          "linear-gradient(to top, rgba(212,175,85,0.06) 0%, rgba(122,143,181,0.03) 30%, transparent 100%)",
      }}
      animate={{ opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function LightBeams({ intense }: { intense?: boolean }) {
  const beams = [
    { rotate: -28, delay: 0, width: 140, opacity: intense ? 0.09 : 0.06, x: "20%" },
    { rotate: -18, delay: 2, width: 90, opacity: intense ? 0.06 : 0.04, x: "35%" },
    { rotate: -38, delay: 4, width: 220, opacity: intense ? 0.07 : 0.05, x: "15%" },
    { rotate: -12, delay: 1, width: 60, opacity: 0.03, x: "45%" },
  ];

  return (
    <>
      {beams.map((beam, i) => (
        <motion.div
          key={i}
          className="absolute -top-1/3 h-[160%] origin-top"
          style={{
            width: beam.width,
            insetInlineStart: beam.x,
            rotate: `${beam.rotate}deg`,
            background: `linear-gradient(180deg, rgba(212,175,85,${beam.opacity}) 0%, rgba(122,143,181,${beam.opacity * 0.5}) 40%, transparent 75%)`,
            filter: "blur(50px)",
          }}
          animate={{
            opacity: [0.3, 0.9, 0.3],
            x: [0, intense ? 60 : 30, 0],
          }}
          transition={{
            duration: 14,
            delay: beam.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <motion.div
        className="absolute top-0 end-0 h-full w-2/3"
        style={{
          background:
            "linear-gradient(225deg, rgba(122,143,181,0.1) 0%, transparent 55%)",
        }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
    </>
  );
}

function RadarSweep() {
  return (
    <motion.div
      className="absolute start-1/2 top-1/2 size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.04]"
      style={{
        background:
          "conic-gradient(from 0deg, transparent 0deg, rgba(212,175,85,0.4) 30deg, transparent 60deg)",
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
  );
}

function FloatingParticles({ count }: { count: number }) {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; delay: number; tone: "gold" | "silver" }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        delay: Math.random() * 6,
        tone: Math.random() > 0.7 ? "gold" : "silver",
      }))
    );
  }, [count]);

  return (
    <div className="absolute inset-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={p.tone === "gold" ? "bg-accent/50" : "bg-accent-secondary/30"}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() > 0.5 ? 15 : -15, 0],
            opacity: [0.05, 0.7, 0.05],
          }}
          transition={{
            duration: 7 + p.delay,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function RadialSpotlight() {
  return (
    <>
      <motion.div
        className="absolute start-1/3 top-1/4 size-[700px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,85,0.1) 0%, transparent 60%)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute end-1/4 top-1/2 size-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(122,143,181,0.06) 0%, transparent 65%)",
        }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </>
  );
}

function AmbientWaveformLayer() {
  return (
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-[0.07]">
      <Waveform bars={80} intense className="h-24 w-full" />
    </div>
  );
}

function ThreatScanLines() {
  return (
    <>
      {[20, 50, 80].map((top, i) => (
        <motion.div
          key={top}
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/10 to-transparent"
          style={{ top: `${top}%` }}
          animate={{ opacity: [0, 0.5, 0], scaleX: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 1.3 }}
        />
      ))}
    </>
  );
}

export function ScanLine() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent shadow-[0_0_20px_rgba(212,175,85,0.2)]"
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    />
  );
}

export function FloatingGlows() {
  const glows = [
    { top: "5%", left: "10%", size: 550, color: "rgba(212,175,85,0.14)", delay: 0 },
    { top: "45%", left: "80%", size: 650, color: "rgba(122,143,181,0.09)", delay: 2 },
    { top: "75%", left: "12%", size: 450, color: "rgba(212,175,85,0.07)", delay: 4 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {glows.map((glow, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[130px]"
          style={{
            top: glow.top,
            left: glow.left,
            width: glow.size,
            height: glow.size,
            background: glow.color,
          }}
          animate={{
            scale: [1, 1.35, 1],
            opacity: [0.35, 0.75, 0.35],
          }}
          transition={{
            duration: 12,
            delay: glow.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function SectionAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70" />
      <FloatingGlows />
    </div>
  );
}
