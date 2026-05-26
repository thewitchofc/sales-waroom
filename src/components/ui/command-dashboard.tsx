"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Waveform } from "@/components/ui/waveform";
import { HudFrame, StatusIndicator, ThreatMeter } from "@/components/ui/hud-elements";
import { cn } from "@/lib/utils";

const liveMessages = [
  {
    role: "prospect",
    text: "המחיר שלכם גבוה ב-40% מהמתחרה. למה שאשלם פרמיה?",
    tag: "התנגדות: מחיר",
  },
  {
    role: "ai",
    text: "AI מזהה חולשות בסגירה, חוסר הצגת ROI מיידי",
    tag: "ניתוח AI",
  },
  {
    role: "user",
    text: "אני מבין. תנו לי להראות לכם את התשואה תוך 90 יום...",
    tag: "תגובתך",
  },
];

export function CommandDashboard() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % liveMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const current = liveMessages[msgIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1.2, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative perspective-[1200px]"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <div className="glass-premium glass-reflection metallic-border relative overflow-hidden rounded-2xl p-[1px] glow-accent-strong">
          <HudFrame label="חדר מלחמה // חי" className="rounded-2xl bg-black/80 p-5 md:p-6">
            {/* Header bar */}
            <div className="mb-5 flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-red-500" />
                <div className="size-2 rounded-full bg-accent/60" />
                <div className="size-2 rounded-full bg-green-500/60" />
              </div>
              <div className="text-center">
                <div className="font-brand text-[10px] tracking-widest text-accent">
                  SALES WAROOM
                </div>
                <div className="text-[10px] text-muted-foreground">
                  COMMAND INTERFACE v4.2
                </div>
              </div>
              <motion.div
                className="flex items-center gap-1.5"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="size-1.5 rounded-full bg-red-400" />
                <span className="font-brand text-[9px] text-red-400">REC</span>
              </motion.div>
            </div>

            {/* Status row */}
            <div className="mb-5 grid grid-cols-3 gap-3">
              {[
                { label: "ניתוח שיחה בזמן אמת", status: "active" as const },
                { label: "AI מזהה חולשות בסגירה", status: "warning" as const },
                { label: "סימולציית לקוח קשה", status: "critical" as const },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2"
                >
                  <div className="mb-1 flex items-center gap-1.5">
                    <motion.span
                      className={cn(
                        "size-1 rounded-full",
                        item.status === "active" && "bg-green-400",
                        item.status === "warning" && "bg-accent",
                        item.status === "critical" && "bg-red-500"
                      )}
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className="font-brand text-[8px] text-muted-foreground">
                      חי
                    </span>
                  </div>
                  <p className="text-[11px] leading-snug text-white/80">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Live conversation */}
            <div className="mb-5 rounded-xl border border-white/5 bg-black/40 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded bg-accent/10 px-2 py-0.5 text-[10px] text-accent">
                  {current.tag}
                </span>
                <span className="font-brand text-[9px] text-muted-foreground">
                  סשן #2847
                </span>
              </div>
              <motion.p
                key={current.text}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="min-h-[48px] text-sm leading-relaxed text-white/90"
              >
                &laquo;{current.text}&raquo;
              </motion.p>
            </div>

            {/* Waveform + voice */}
            <div className="mb-5 rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="mb-3 flex items-center justify-between">
                <Waveform bars={36} className="h-10 flex-1" />
                <div className="flex items-center gap-2 ps-4">
                  <motion.div
                    className="flex size-8 items-center justify-center rounded-full border border-accent/30 bg-accent/10"
                    animate={{ boxShadow: ["0 0 0 rgba(212,175,85,0)", "0 0 20px rgba(212,175,85,0.3)", "0 0 0 rgba(212,175,85,0)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg className="size-3.5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                    </svg>
                  </motion.div>
                  <div className="text-start">
                    <div className="text-[10px] text-green-400">VOICE ACTIVE</div>
                    <div className="font-brand text-xs text-white">87 ציון</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <ThreatMeter level={87} />
              </div>
              <div className="space-y-0">
                <StatusIndicator label="ביטחון" value="87%" status="active" />
                <StatusIndicator label="אנרגיה" value="גבוה" status="warning" />
                <StatusIndicator label="סגירה" value="AT RISK" status="critical" />
              </div>
            </div>
          </HudFrame>
        </div>

        {/* Floating HUD chips */}
        <motion.div
          className="absolute -start-6 top-1/4 glass-premium rounded-lg px-3 py-2 glow-accent"
          animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <div className="font-brand text-[9px] text-red-400">THREAT DETECTED</div>
          <div className="text-xs text-white">השוואת מחיר</div>
        </motion.div>

        <motion.div
          className="absolute -end-4 bottom-1/4 glass-premium rounded-lg px-3 py-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        >
          <div className="font-brand text-[9px] text-green-400">+12% CONFIDENCE</div>
          <div className="text-xs text-white">מסגור חזק</div>
        </motion.div>
      </motion.div>

      {/* Ground reflection */}
      <div
        className="absolute -bottom-8 start-1/2 h-16 w-3/4 -translate-x-1/2 rounded-full opacity-30 blur-2xl"
        style={{ background: "radial-gradient(ellipse, rgba(212,175,85,0.3), transparent)" }}
      />
    </motion.div>
  );
}
