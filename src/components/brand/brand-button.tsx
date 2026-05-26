"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface BrandButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost" | "command";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

/** Marketing / cinematic CTA button, separate from shadcn/ui Button */
export function BrandButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: BrandButtonProps) {
  const variants = {
    primary:
      "rounded-none border border-white/20 bg-white text-black hover:border-accent hover:shadow-[0_0_50px_rgba(212,175,85,0.35)] hover:-translate-y-0.5",
    secondary:
      "rounded-none glass-premium text-white border border-white/10 hover:border-accent/30 hover:glow-accent hover:-translate-y-0.5",
    ghost:
      "rounded-none text-muted-foreground hover:text-white hover:bg-white/[0.03] border border-transparent hover:border-white/5",
    command:
      "rounded-none bg-accent/10 text-accent border border-accent/30 hover:bg-accent hover:text-black hover:shadow-[0_0_50px_rgba(212,175,85,0.45),0_8px_32px_rgba(0,0,0,0.6)] hover:-translate-y-0.5",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-xs gap-2 tracking-wide",
    md: "px-7 py-3.5 text-sm gap-2",
    lg: "px-10 py-5 text-base gap-3",
  };

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative inline-flex items-center justify-center font-semibold transition-all duration-500 overflow-hidden group",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {(variant === "primary" || variant === "command") && (
        <>
          <span className="absolute inset-0 bg-gradient-to-l from-transparent via-white/40 to-transparent translate-x-[200%] group-hover:translate-x-[-200%] transition-transform duration-1000" />
          <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </>
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
