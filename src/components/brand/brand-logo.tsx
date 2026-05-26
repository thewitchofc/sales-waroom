"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BRAND_LOGO } from "@/config/site";

export { BRAND_LOGO };

/** Height-led sizing — full wordmark including tagline */
const variantStyles = {
  navbar: "h-14 w-auto sm:h-16",
  sidebar: "h-12 w-auto sm:h-14",
  footer: "h-20 w-auto sm:h-24",
  hero: "h-44 w-auto sm:h-56 md:h-64 lg:h-72",
  intro: "h-48 w-auto sm:h-64 md:h-72",
  loading: "h-40 w-auto sm:h-52",
  login: "h-28 w-auto sm:h-36",
  arena: "h-10 w-auto opacity-90",
  compact: "h-8 w-auto",
} as const;

const imageSizes: Record<keyof typeof variantStyles, string> = {
  navbar: "180px",
  sidebar: "160px",
  footer: "240px",
  hero: "480px",
  intro: "400px",
  loading: "320px",
  login: "200px",
  arena: "64px",
  compact: "48px",
};

export type BrandLogoVariant = keyof typeof variantStyles;

export interface BrandLogoProps {
  variant?: BrandLogoVariant;
  className?: string;
  priority?: boolean;
}

export function BrandLogo({
  variant = "navbar",
  className,
  priority = false,
}: BrandLogoProps) {
  return (
    <div
      className={cn(
        "brand-logo relative inline-flex shrink-0 items-center bg-transparent",
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
        className="brand-logo-mark h-full w-auto max-w-full select-none object-contain object-center"
        sizes={imageSizes[variant]}
      />
    </div>
  );
}

export function BrandLogoLink({
  href = "/",
  variant = "navbar",
  className,
  priority,
}: BrandLogoProps & { href?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "brand-logo-link inline-flex shrink-0 items-center bg-transparent transition-opacity duration-300 hover:opacity-90",
        className
      )}
      aria-label={BRAND_LOGO.alt}
    >
      <BrandLogo variant={variant} priority={priority} />
    </Link>
  );
}
