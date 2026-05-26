"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TEAM_MEMBERS, type TeamMember } from "@/components/product/demo-data";

const statusConfig: Record<
  TeamMember["status"],
  { label: string; color: string; dot: string }
> = {
  live: { label: "בשיחה", color: "text-green-400", dot: "bg-green-400" },
  training: { label: "באימון", color: "text-accent", dot: "bg-accent" },
  reviewing: { label: "בסקירה", color: "text-blue-400", dot: "bg-blue-400" },
  idle: { label: "זמין", color: "text-muted-foreground", dot: "bg-muted-foreground" },
};

export function TeamPerformanceDashboard() {
  const liveCount = TEAM_MEMBERS.filter((m) => m.status === "live").length;
  const avgScore = Math.round(
    TEAM_MEMBERS.reduce((a, m) => a + m.score, 0) / TEAM_MEMBERS.length
  );

  return (
    <div className="glass-premium metallic-border glass-reflection relative overflow-hidden bg-black/60">
      <div className="ai-scan-line pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative border-b border-white/5 p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-brand text-[10px] tracking-widest text-accent">
              פיקוד צוות
            </div>
            <h3 className="mt-1 font-display text-xl font-bold text-white md:text-2xl">
              דשבורד ביצועי צוות
            </h3>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="font-display text-2xl font-black text-green-400">{liveCount}</div>
              <div className="text-[10px] text-muted-foreground">פעילים עכשיו</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl font-black text-accent">{avgScore}</div>
              <div className="text-[10px] text-muted-foreground">ציון ממוצע</div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-white/5 text-[10px] text-muted-foreground">
              <th className="px-5 py-3 text-start font-brand tracking-widest">נציג</th>
              <th className="px-5 py-3 text-start font-brand tracking-widest">סטטוס</th>
              <th className="px-5 py-3 text-start font-brand tracking-widest">ציון</th>
              <th className="px-5 py-3 text-start font-brand tracking-widest">סשנים</th>
              <th className="px-5 py-3 text-start font-brand tracking-widest">מגמה</th>
            </tr>
          </thead>
          <tbody>
            {TEAM_MEMBERS.map((member, i) => {
              const status = statusConfig[member.status];
              return (
                <motion.tr
                  key={member.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group border-b border-white/[0.03] transition-colors hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-4">
                    <div className="font-medium text-white">{member.name}</div>
                    <div className="text-xs text-muted-foreground">{member.role}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <motion.span
                        className={cn("size-1.5 rounded-full", status.dot)}
                        animate={
                          member.status === "live"
                            ? { opacity: [1, 0.3, 1] }
                            : {}
                        }
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className={cn("text-xs", status.color)}>{status.label}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-lg font-bold text-white">
                        {member.score}
                      </span>
                      <div className="h-1 w-16 overflow-hidden bg-white/5">
                        <motion.div
                          className="h-full bg-gradient-to-l from-accent to-green-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${member.score}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.05 }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-brand text-sm text-white/70">
                    {member.sessions}
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-brand text-xs text-green-400">{member.trend}</span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
