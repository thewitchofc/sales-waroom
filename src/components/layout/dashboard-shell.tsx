"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { dashboardNav } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { AnimatedPage } from "@/components/layout/animated-page";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 start-0 z-40 hidden w-64 flex-col border-e border-white/5 bg-black/95 backdrop-blur-xl lg:flex">
        <div className="border-b border-white/5 p-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center border border-accent/20 bg-accent/5">
              <span className="font-brand text-xs font-bold text-accent">SW</span>
            </div>
            <div>
              <span className="font-brand text-[10px] tracking-widest text-white">WAR ROOM</span>
              <div className="text-[9px] text-green-400">● OPERATIONAL</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {dashboardNav.map((item) => {
            const isHash = item.href.includes("#");
            const active = !isHash && pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 border px-4 py-3 text-sm transition-all",
                  active
                    ? "border-accent/30 bg-accent/10 text-accent"
                    : "border-transparent text-muted-foreground hover:border-white/5 hover:bg-white/[0.02] hover:text-white"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="dash-nav"
                    className="size-1.5 rounded-full bg-accent"
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/5 p-4">
          <div className="glass-premium border border-white/5 p-4">
            <div className="mb-2 font-brand text-[9px] text-muted-foreground">OPERATOR</div>
            <div className="text-sm font-medium text-white">דנה כהן</div>
            <div className="text-xs text-muted-foreground">Senior AE · Elite</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col lg:ms-64">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/5 bg-black/80 px-6 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <motion.span
              className="size-2 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-brand text-[10px] text-green-400">COMMAND CENTER LIVE</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-muted-foreground sm:block">SESSION #2847</span>
            <Link
              href="/"
              className="border border-white/10 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-accent/30 hover:text-white"
            >
              יציאה
            </Link>
          </div>
        </header>
        <AnimatedPage>
          <main className="flex-1 p-6 lg:p-8">{children}</main>
        </AnimatedPage>
      </div>
    </div>
  );
}
