"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BRAND_LOGO } from "@/config/site";

export { BRAND_LOGO };

/** Height-led sizing, logo blends into site black via mix-blend-mode */
const variantStyles = {
  navbar: "h-[4.25rem] w-[4.25rem] sm:h-20 sm:w-20 md:h-[5.5rem] md:w-[5.5rem]",
  sidebar: "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]",
  footer: "h-24 w-24 sm:h-28 sm:w-28",
  intro: "h-64 w-64 sm:h-80 sm:w-80 md:h-[22rem] md:w-[22rem]",
  loading: "h-56 w-56 sm:h-72 sm:w-72 md:h-80 md:w-80",
  login: "h-32 w-32 sm:h-40 sm:w-40",
  arena: "h-12 w-12 opacity-90",
  compact: "h-10 w-10",
} as const;

const imageSizes: Record<keyof typeof variantStyles, string> = {
  navbar: "88px",
  sidebar: "72px",
  footer: "112px",
  intro: "352px",
  loading: "320px",
  login: "160px",
  arena: "48px",
  compact: "40px",
};

export type BrandLogoVariant = keyof typeof variantStyles;

export interface BrandLogoProps {
  variant?: BrandLogoVariant;
  className?: string;
  priority?: boolean;
  animated?: boolean;
  hoverGlow?: boolean;
  shimmer?: boolean;
}

export function BrandLogo({
  variant = "navbar",
  className,
  priority = false,
  animated = false,
  hoverGlow = false,
  shimmer = false,
}: BrandLogoProps) {
  const content = (
    <div
      className={cn(
        "brand-logo relative shrink-0 bg-transparent",
        hoverGlow && "brand-logo-hover",
        shimmer && "brand-logo-shimmer-active",
        variantStyles[variant],
        className
      )}
    >
      <Image
        src={BRAND_LOGO.src}
        alt={BRAND_LOGO.alt}
        width={BRAND_LOGO.width}
        height={BRAND_LOGO.height}
        priority={priority}
        draggable={false}
        className="brand-logo-mark h-full w-full select-none object-contain object-center"
        sizes={imageSizes[variant]}
      />
      {hoverGlow && (
        <span className="brand-logo-glow pointer-events-none absolute inset-0" aria-hidden />
      )}
      {shimmer && (
        <span className="brand-logo-sweep pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <span className="brand-logo-sweep-line absolute inset-y-0 w-1/3" />
        </span>
      )}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}

export function BrandLogoLink({
  href = "/",
  variant = "navbar",
  className,
  priority,
  animated,
  hoverGlow = true,
  shimmer,
}: BrandLogoProps & { href?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "brand-logo-link inline-flex shrink-0 items-center bg-transparent transition-opacity duration-300",
        className
      )}
      aria-label={BRAND_LOGO.alt}
    >
      <BrandLogo
        variant={variant}
        priority={priority}
        animated={animated}
        hoverGlow={hoverGlow}
        shimmer={shimmer}
      />
    </Link>
  );
}
