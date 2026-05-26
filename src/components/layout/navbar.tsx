"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { BrandLink } from "@/components/brand/brand-link";
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
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="fixed top-0 inset-x-0 z-50 px-6 lg:px-10"
    >
      <motion.div
        style={{ opacity: scrolled ? opacity : 0 }}
        className="absolute inset-0 border-b border-white/5 bg-black/80 backdrop-blur-2xl"
      />
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between py-5">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex size-10 items-center justify-center border border-accent/20 bg-accent/5">
            <span className="font-brand text-xs font-bold text-accent">SW</span>
            <motion.div
              className="absolute inset-0 border border-accent/30"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
          <div>
            <span className="font-brand text-xs font-semibold tracking-[0.25em] text-white">
              SALES WAROOM
            </span>
            <div className="font-brand text-[8px] tracking-widest text-muted-foreground">
              ELITE COMMAND
            </div>
          </div>
        </Link>

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
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-premium mx-4 mb-4 p-6 lg:hidden"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm",
                    active ? "text-accent" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex flex-col gap-2 border-t border-white/10 pt-4">
              <BrandLink href="/login" variant="ghost" size="sm" className="w-full justify-center">
                התחברות
              </BrandLink>
              <BrandLink href="/dashboard" variant="command" size="sm" className="w-full justify-center">
                לדשבורד
              </BrandLink>
            </div>
          </div>
        </motion.div>
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
            <Link href="/" className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center border border-accent/20 bg-accent/5">
                <span className="font-brand text-xs font-bold text-accent">SW</span>
              </div>
              <div>
                <span className="font-brand text-xs tracking-[0.2em] text-white">SALES WAROOM</span>
                <div className="text-[10px] text-muted-foreground">מערכת הפעלה למכירות עילית</div>
              </div>
            </Link>
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
          <p className="text-sm text-muted-foreground">© 2026 Sales Waroom</p>
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
