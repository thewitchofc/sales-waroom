"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { dashboardNav } from "@/config/navigation";
import { arenaRoutes } from "@/config/routes";
import { BrandLogoLink } from "@/components/brand/brand-logo";
import { cn } from "@/lib/utils";

function SidebarNav({
  onNavigate,
  quiet = false,
}: {
  onNavigate?: () => void;
  quiet?: boolean;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-0.5 p-3">
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
              "flex items-center justify-between gap-3 px-3 py-2.5 text-sm transition-colors",
              quiet
                ? active
                  ? "border-s-2 border-white/20 bg-white/[0.02] text-white/85"
                  : "border-s-2 border-transparent text-white/40 hover:text-white/65"
                : cn(
                    "interactive-surface border px-4 py-3",
                    active
                      ? isArena
                        ? "border-red-500/30 bg-red-500/10 text-red-400"
                        : "border-accent/30 bg-accent/10 text-accent"
                      : "border-transparent text-muted-foreground hover:border-white/5 hover:bg-white/[0.02] hover:text-white",
                  ),
            )}
          >
            <span className="flex items-center gap-2.5">
              {active && !quiet && (
                <motion.span
                  layoutId="dash-nav"
                  className={cn(
                    "size-1.5 rounded-full",
                    isArena ? "bg-red-500" : "bg-accent",
                  )}
                />
              )}
              {active && quiet && (
                <span className="size-1 rounded-full bg-white/40" />
              )}
              {item.label}
            </span>
            {item.badge && !quiet && (
              <span className="font-brand text-[8px] text-red-400/80">
                {item.badge}
              </span>
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
  const isArenaSimulation = pathname === "/arena";
  const quietSidebar = true;

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="flex min-h-screen">
      <aside
        className={cn(
          "fixed inset-y-0 start-0 z-40 hidden w-60 flex-col border-e lg:flex",
          quietSidebar
            ? "border-white/[0.04] bg-black/90"
            : "border-white/5 bg-black/95 backdrop-blur-xl",
        )}
      >
        <div
          className={cn(
            "px-4 py-6",
            quietSidebar
              ? "border-b border-white/[0.04]"
              : "border-b border-white/5",
          )}
        >
          <BrandLogoLink
            href="/"
            variant="sidebar"
            className="mx-auto justify-center"
          />
        </div>
        <SidebarNav quiet={quietSidebar} />
        <div
          className={cn(
            "p-3",
            quietSidebar
              ? "border-t border-white/[0.04]"
              : "border-t border-white/5",
          )}
        >
          <Link
            href="/profile"
            className={cn(
              "block p-3 transition-colors",
              quietSidebar
                ? "border border-transparent hover:border-white/[0.06] hover:bg-white/[0.02]"
                : "glass-premium glass-shimmer interactive-surface border border-white/5 p-4 hover:border-accent/20",
            )}
          >
            <div className="mb-1.5 font-brand text-[8px] text-white/30">
              לוחם
            </div>
            <div className="text-sm font-medium text-white/85">דנה כהן</div>
            <div className="text-xs text-white/35">עילית, #7</div>
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
                <BrandLogoLink href="/" variant="sidebar" className="mx-auto" />
              </div>
              <SidebarNav
                onNavigate={() => setMobileOpen(false)}
                quiet={quietSidebar}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex flex-1 flex-col lg:ms-60">
        {isArenaSimulation ? (
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/[0.06] bg-black px-4 py-3 lg:hidden">
            <button
              type="button"
              className="flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(true)}
              aria-label="פתיחת תפריט"
            >
              <span className="block h-px w-5 bg-white/80" />
              <span className="block h-px w-5 bg-white/80" />
              <span className="block h-px w-5 bg-white/80" />
            </button>
            <Link href="/" className="text-xs text-white/45">
              יציאה
            </Link>
          </header>
        ) : (
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
              <span className="text-xs text-white/40">Sales Waroom</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="hidden text-xs text-white/35 md:block">
                דנה כהן
              </span>
              <Link
                href="/"
                className="interactive-surface border border-white/10 px-3 py-1.5 text-xs text-muted-foreground hover:border-accent/30 hover:text-white"
              >
                יציאה
              </Link>
            </div>
          </header>
        )}
        <main
          id="main-content"
          className={cn(
            "flex-1",
            isArenaSimulation ? "p-0" : "p-4 sm:p-6 lg:p-8",
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
