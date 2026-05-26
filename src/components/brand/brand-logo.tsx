"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BRAND_LOGO } from "@/config/site";

export { BRAND_LOGO };

const variantStyles = {
  navbar: "h-11 w-11 sm:h-12 sm:w-12",
  sidebar: "h-10 w-10",
  footer: "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]",
  intro: "h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44",
  loading: "h-20 w-20 sm:h-24 sm:w-24",
  login: "h-[4.5rem] w-[4.5rem] sm:h-20 sm:w-20",
  arena: "h-9 w-9 opacity-80",
  compact: "h-8 w-8",
} as const;

const imageSizes: Record<keyof typeof variantStyles, string> = {
  navbar: "48px",
  sidebar: "40px",
  footer: "72px",
  intro: "176px",
  loading: "96px",
  login: "80px",
  arena: "36px",
  compact: "32px",
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
        "brand-logo relative shrink-0",
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
        className="h-full w-full select-none object-contain object-center"
        sizes={imageSizes[variant]}
      />
      {hoverGlow && (
        <span className="brand-logo-glow pointer-events-none absolute inset-0 rounded-sm" aria-hidden />
      )}
      {shimmer && (
        <span className="brand-logo-sweep pointer-events-none absolute inset-0 overflow-hidden rounded-sm" aria-hidden>
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
        "brand-logo-link inline-flex shrink-0 items-center p-1 transition-opacity duration-300",
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
