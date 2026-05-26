"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { dashboardNav } from "@/config/navigation";
import { arenaRoutes } from "@/config/routes";
import { BrandLogoLink } from "@/components/brand/brand-logo";
import { cn } from "@/lib/utils";

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1 p-4">
      {dashboardNav.map((item) => {
        const isHash = item.href.includes("#");
        const isArena = arenaRoutes.some((r) => item.href === r);
        const active = !isHash && pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "interactive-surface flex items-center justify-between gap-3 border px-4 py-3 text-sm",
              active
                ? isArena
                  ? "border-red-500/30 bg-red-500/10 text-red-400"
                  : "border-accent/30 bg-accent/10 text-accent"
                : "border-transparent text-muted-foreground hover:border-white/5 hover:bg-white/[0.02] hover:text-white"
            )}
          >
            <span className="flex items-center gap-3">
              {active && (
                <motion.span
                  layoutId="dash-nav"
                  className={cn("size-1.5 rounded-full", isArena ? "bg-red-500" : "bg-accent")}
                />
              )}
              {item.label}
            </span>
            {item.badge && (
              <span className="font-brand text-[8px] text-red-400">{item.badge}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isArena = (arenaRoutes as readonly string[]).includes(pathname);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="flex min-h-screen bg-black">
      <aside className="fixed inset-y-0 start-0 z-40 hidden w-64 flex-col border-e border-white/5 bg-black/95 backdrop-blur-xl lg:flex">
        <div className="border-b border-white/5 p-6">
          <BrandLogoLink href="/" variant="sidebar" hoverGlow className="mx-auto" />
        </div>
        <SidebarNav />
        <div className="border-t border-white/5 p-4">
          <Link
            href="/profile"
            className="glass-premium glass-shimmer interactive-surface block border border-white/5 p-4 transition-all hover:border-accent/20"
          >
            <div className="mb-2 font-brand text-[9px] text-muted-foreground">OPERATOR</div>
            <div className="text-sm font-medium text-white">דנה כהן</div>
            <div className="text-xs text-muted-foreground">Elite · Rank #7</div>
          </Link>
        </div>
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="סגירת תפריט"
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 end-0 z-50 flex w-[min(100%,280px)] flex-col border-s border-white/10 bg-black/95 backdrop-blur-xl lg:hidden"
            >
              <div className="border-b border-white/5 p-5">
                <BrandLogoLink href="/" variant="sidebar" hoverGlow className="mx-auto" />
              </div>
              <SidebarNav onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex flex-1 flex-col lg:ms-64">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/5 bg-black/85 px-4 py-3 backdrop-blur-xl sm:px-6 sm:py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex flex-col gap-1.5 border border-white/10 p-2 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="פתיחת תפריט"
            >
              <span className="block h-px w-5 bg-white" />
              <span className="block h-px w-5 bg-white" />
              <span className="block h-px w-5 bg-white" />
            </button>
            <motion.span
              className={`size-2 rounded-full ${isArena ? "bg-red-500" : "bg-green-400"}`}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className={`font-brand text-[9px] sm:text-[10px] ${isArena ? "text-red-400" : "text-green-400"}`}>
              {isArena ? "ARENA LIVE" : "COMMAND CENTER LIVE"}
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden text-xs text-muted-foreground md:block">SESSION #2847</span>
            <Link
              href="/"
              className="interactive-surface border border-white/10 px-3 py-1.5 text-xs text-muted-foreground hover:border-accent/30 hover:text-white"
            >
              יציאה
            </Link>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
