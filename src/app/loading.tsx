"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
      <div className="absolute inset-0 command-grid opacity-20" />
      <motion.div
        className="absolute size-96 rounded-full bg-accent/10 blur-[120px]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative flex flex-col items-center gap-10"
      >
        <div className="relative">
          <div className="flex size-20 items-center justify-center border border-accent/30 bg-black glow-accent-strong">
            <span className="font-brand text-xl font-bold text-accent">SW</span>
          </div>
          <span className="hud-corner hud-corner-tl" style={{ top: -4, insetInlineStart: -4, width: 12, height: 12 }} />
          <span className="hud-corner hud-corner-tr" style={{ top: -4, insetInlineEnd: -4, width: 12, height: 12 }} />
          <span className="hud-corner hud-corner-bl" style={{ bottom: -4, insetInlineStart: -4, width: 12, height: 12 }} />
          <span className="hud-corner hud-corner-br" style={{ bottom: -4, insetInlineEnd: -4, width: 12, height: 12 }} />
          <motion.div
            className="absolute inset-0 border border-accent/40"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <span className="font-brand text-sm tracking-[0.35em] text-white">
            SALES WAROOM
          </span>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="size-1 bg-accent"
                animate={{ opacity: [0.2, 1, 0.2], scaleY: [1, 2, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
        </div>

        <motion.p
          className="font-brand text-[10px] tracking-[0.25em] text-muted-foreground"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          INITIALIZING COMMAND CENTER
        </motion.p>
      </motion.div>
    </div>
  );
}
