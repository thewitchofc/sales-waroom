"use client";

import { motion } from "framer-motion";
import { useSimulationOptional } from "@/components/product/simulation-provider";

const widgets = [
  { id: "close", label: "שיעור סגירה", base: 34, suffix: "%", trend: "+8%" },
  { id: "pressure", label: "לחץ ממוצע", base: 72, suffix: "", trend: "↑" },
  { id: "objections", label: "התנגדויות", base: 847, suffix: "", trend: "+124" },
];

export function FloatingAnalyticsWidgets() {
  const simulation = useSimulationOptional();
  const pressure = simulation?.scores.pressure ?? 72;
  const confidence = simulation?.scores.confidence ?? 82;

  return (
    <>
      {/* Top-left floating chip */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="pointer-events-none absolute -start-2 top-32 z-20 hidden xl:block"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="glass-premium metallic-border border border-accent/20 px-4 py-3 backdrop-blur-xl"
        >
          <div className="font-brand text-[9px] text-muted-foreground">CONFIDENCE</div>
          <motion.div
            key={confidence}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="font-display text-2xl font-black text-white"
          >
            {confidence}
          </motion.div>
          <div className="mt-1 h-1 w-16 overflow-hidden bg-white/5">
            <motion.div
              className="h-full bg-gradient-to-l from-green-500 to-accent"
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Top-right pressure alert */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        className="pointer-events-none absolute -end-2 top-48 z-20 hidden xl:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className={`glass-premium metallic-border border px-4 py-3 backdrop-blur-xl ${
            pressure > 80
              ? "border-red-500/30 glow-accent"
              : "border-white/10"
          }`}
        >
          <div className="flex items-center gap-2">
            <motion.span
              className={`size-1.5 rounded-full ${pressure > 80 ? "bg-red-500" : "bg-accent"}`}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="font-brand text-[9px] text-muted-foreground">PRESSURE</span>
          </div>
          <motion.div
            key={pressure}
            className={`font-display text-2xl font-black ${
              pressure > 80 ? "text-red-400" : "text-accent"
            }`}
          >
            {pressure}
          </motion.div>
          {pressure > 80 && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[9px] text-red-400"
            >
              THREAT ELEVATED
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Bottom metrics strip — mobile friendly */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-4 z-10 hidden lg:flex justify-center gap-3">
        {widgets.map((w, i) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="glass-premium border border-white/5 px-4 py-2 backdrop-blur-md"
          >
            <div className="font-brand text-[8px] text-muted-foreground">{w.label}</div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg font-bold text-white">
                {w.id === "pressure" ? pressure : w.base}
                {w.suffix}
              </span>
              <span className="text-[9px] text-green-400">{w.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
