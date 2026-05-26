"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BrandLinkProps {
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "command";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

export function BrandLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: BrandLinkProps) {
  const variants = {
    primary:
      "rounded-none border border-white/20 bg-white text-black hover:border-accent hover:shadow-[0_0_50px_rgba(212,175,85,0.35)]",
    secondary:
      "rounded-none glass-premium text-white border border-white/10 hover:border-accent/30 hover:glow-accent",
    ghost:
      "rounded-none text-muted-foreground hover:text-white hover:bg-white/[0.03] border border-transparent hover:border-white/5",
    command:
      "rounded-none bg-accent/10 text-accent border border-accent/30 hover:bg-accent hover:text-black hover:shadow-[0_0_50px_rgba(212,175,85,0.45)]",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-xs gap-2 tracking-wide",
    md: "px-7 py-3.5 text-sm gap-2",
    lg: "px-10 py-5 text-base gap-3",
  };

  return (
    <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }} className="inline-flex">
      <Link
        href={href}
        className={cn(
          "relative inline-flex items-center justify-center font-semibold transition-all duration-500 overflow-hidden group",
          variants[variant],
          sizes[size],
          className
        )}
      >
        {(variant === "primary" || variant === "command") && (
          <span className="absolute inset-0 bg-gradient-to-l from-transparent via-white/40 to-transparent translate-x-[200%] group-hover:translate-x-[-200%] transition-transform duration-1000" />
        )}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Link>
    </motion.div>
  );
}
