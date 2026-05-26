"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { BrandLink } from "@/components/brand/brand-link";
import { BrandLogoLink } from "@/components/brand/brand-logo";
import { siteConfig } from "@/config/site";
import {
  footerAccessLinks,
  footerCommandLinks,
  footerPlatformLinks,
} from "@/config/navigation";
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
          scrolled || mobileOpen ? "opacity-100" : "opacity-0",
        )}
      />
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between py-3 sm:py-4">
        {pathname === "/" ? (
          <div className="w-24 shrink-0 sm:w-28" aria-hidden />
        ) : (
          <BrandLogoLink href="/" variant="navbar" priority className="-ms-1" />
        )}

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 text-sm transition-colors",
                  active
                    ? "text-white"
                    : "text-muted-foreground hover:text-white",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 start-0 h-px bg-accent transition-all duration-300",
                    active ? "w-full" : "w-0 group-hover:w-full",
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
          <BrandLink href="/arena" variant="arena" size="sm">
            לזירה
          </BrandLink>
        </div>

        <button
          type="button"
          className="flex flex-col gap-1.5 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="פתיחת תפריט"
        >
          <span
            className={cn(
              "block h-px w-6 bg-white transition-transform",
              mobileOpen && "translate-y-2 rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-px w-6 bg-white transition-opacity",
              mobileOpen && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block h-px w-6 bg-white transition-transform",
              mobileOpen && "-translate-y-2 -rotate-45",
            )}
          />
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
            <div className="mb-6 flex justify-center border-b border-white/5 pb-6">
              <BrandLogoLink href="/" variant="login" />
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
                        : "text-muted-foreground hover:text-white",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
              <BrandLink
                href="/login"
                variant="ghost"
                size="sm"
                className="w-full justify-center"
              >
                התחברות
              </BrandLink>
              <BrandLink
                href="/arena"
                variant="arena"
                size="sm"
                className="w-full justify-center"
              >
                לזירה
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
    <footer className="footer-premium relative overflow-hidden border-t border-white/5">
      <div className="section-divider absolute inset-x-0 top-0" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(212,175,85,0.05) 0%, transparent 60%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 command-grid opacity-[0.04]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          <div className="lg:col-span-4 xl:col-span-5">
            <BrandLogoLink href="/" variant="footer" />
            <p className="mt-6 max-w-xs font-display text-lg font-bold text-white">
              {siteConfig.tagline}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/40">
              מערכת הפעלה AI לזאבים שמתאמנים ברצינות. סימולציות, לחץ, דירוגים,
              תרבות עילית.
            </p>
            <div className="mt-8 inline-flex items-center gap-2.5 border border-white/8 bg-white/[0.02] px-4 py-2.5">
              <span className="pressure-pulse size-1.5 rounded-full bg-accent" />
              <span className="font-brand text-[9px] tracking-[0.15em] text-white/45">
                847 לוחמים פעילים, הזירה חיה
              </span>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8 xl:col-span-7">
            <FooterLinkGroup title="פלטפורמה" links={footerPlatformLinks} />
            <FooterLinkGroup title="מרכז פיקוד" links={footerCommandLinks} />
            <FooterLinkGroup title="גישה" links={footerAccessLinks} />
          </div>
        </div>

        <div className="footer-premium-bar mt-16 flex flex-col gap-6 border-t border-white/5 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-brand text-[10px] tracking-[0.12em] text-white/30">
              © 2026 SALES WAROOM
            </p>
            <p className="text-xs text-white/25">כל הזכויות שמורות</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: "פרטיות", href: "/privacy" },
              { label: "תנאים", href: "#" },
              { label: "נגישות", href: "/accessibility" },
              { label: "צור קשר", href: "#" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-white/35 transition-colors hover:text-accent/80"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="mb-5 font-brand text-[9px] tracking-[0.2em] text-accent/70">
        {title}
      </p>
      <ul className="space-y-3.5">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-white/45 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
