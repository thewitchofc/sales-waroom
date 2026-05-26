"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TimelineEvent } from "@/components/product/demo-data";

const typeColors = {
  objection: "bg-red-500",
  coach: "bg-blue-400",
  drop: "bg-orange-500",
  recovery: "bg-green-500",
};

export function ConversationTimeline({
  events,
  activeIndex,
}: {
  events: TimelineEvent[];
  activeIndex: number;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="font-brand text-[10px] tracking-widest text-muted-foreground">
          CONVERSATION TIMELINE
        </span>
        <span className="text-[10px] text-white/40">ציר זמן שיחה</span>
      </div>

      <div className="relative ps-4">
        <div className="absolute start-[7px] top-2 bottom-2 w-px bg-white/10" />

        {events.map((event, i) => {
          const isActive = i === activeIndex;
          const isPast = i < activeIndex;

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative mb-4 flex items-start gap-4 last:mb-0"
            >
              <motion.div
                className={cn(
                  "relative z-10 mt-1 size-3.5 shrink-0 rounded-full border-2 border-black",
                  typeColors[event.type],
                  isActive && "ring-2 ring-accent ring-offset-1 ring-offset-black"
                )}
                animate={isActive ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <div className={cn("flex-1 pb-1", !isPast && !isActive && "opacity-40")}>
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "text-sm",
                      isActive ? "font-semibold text-white" : "text-white/70"
                    )}
                  >
                    {event.label}
                  </span>
                  <span className="font-brand text-[9px] text-muted-foreground">
                    {event.time}
                  </span>
                </div>
                {isActive && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    className="mt-2 h-px bg-gradient-to-l from-accent/50 to-transparent"
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
