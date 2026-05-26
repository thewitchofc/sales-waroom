"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { BrandLink } from "@/components/brand/brand-link";
import { BrandLogoLink } from "@/components/brand/brand-logo";
import { siteConfig } from "@/config/site";
import { footerNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

const navLinks = siteConfig.nav;

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 lg:px-10"
    >
      <div
        className={cn(
          "absolute inset-0 border-b border-white/5 bg-black/85 backdrop-blur-2xl transition-opacity duration-300",
          scrolled || mobileOpen ? "opacity-100" : "opacity-0"
        )}
      />
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between py-4 sm:py-5">
        <BrandLogoLink href="/" variant="navbar" priority hoverGlow shimmer />

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 text-sm transition-colors",
                  active ? "text-white" : "text-muted-foreground hover:text-white"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 start-0 h-px bg-accent transition-all duration-300",
                    active ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1 start-0 h-px w-full bg-accent"
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <BrandLink href="/login" variant="ghost" size="sm">
            התחברות
          </BrandLink>
          <BrandLink href="/dashboard" variant="command" size="sm">
            לדשבורד
          </BrandLink>
        </div>

        <button
          type="button"
          className="flex flex-col gap-1.5 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="פתיחת תפריט"
        >
          <span className={cn("block h-px w-6 bg-white transition-transform", mobileOpen && "translate-y-2 rotate-45")} />
          <span className={cn("block h-px w-6 bg-white transition-opacity", mobileOpen && "opacity-0")} />
          <span className={cn("block h-px w-6 bg-white transition-transform", mobileOpen && "-translate-y-2 -rotate-45")} />
        </button>
      </nav>

      {mobileOpen && (
        <>
          <motion.button
            type="button"
            aria-label="סגירת תפריט"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setMobileOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass-premium metallic-border relative z-50 mx-2 mb-3 max-h-[80vh] overflow-y-auto p-5 sm:mx-4 sm:p-6 lg:hidden"
          >
            <div className="mb-5 flex justify-center border-b border-white/5 pb-5">
              <BrandLogoLink href="/" variant="login" animated hoverGlow />
            </div>
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "interactive-surface rounded-none border border-transparent px-4 py-3.5 text-sm transition-colors",
                      active
                        ? "border-accent/20 bg-accent/5 text-accent"
                        : "text-muted-foreground hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
              <BrandLink href="/login" variant="ghost" size="sm" className="w-full justify-center">
                התחברות
              </BrandLink>
              <BrandLink href="/dashboard" variant="command" size="sm" className="w-full justify-center">
                לדשבורד
              </BrandLink>
            </div>
          </motion.div>
        </>
      )}
    </motion.header>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-6 py-16 lg:px-10">
      <div className="section-divider absolute inset-x-0 top-0" />
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <BrandLogoLink href="/" variant="footer" hoverGlow />
            <div className="mt-3 text-[10px] text-muted-foreground">מערכת הפעלה למכירות עילית</div>
          </div>
          {footerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2026 Sales waroom</p>
          <div className="flex gap-8">
            {["פרטיות", "תנאים", "צור קשר"].map((item) => (
              <span key={item} className="text-sm text-muted-foreground">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
