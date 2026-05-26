"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BrandLink } from "@/components/brand/brand-link";
import { PREMIUM_ARENA_FEATURES } from "@/config/arena-data";

export function PremiumGate({
  title = "הזירה פרימיום",
  description = "תחרויות דירוג, טורנירים שבועיים ו-פרסונות עילית, רק למנויי חדר מלחמה.",
  children,
  blur = true,
}: {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  blur?: boolean;
}) {
  return (
    <div className="relative overflow-hidden">
      {children && (
        <div className={blur ? "pointer-events-none select-none blur-sm opacity-40" : ""}>
          {children}
        </div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      >
        <div className="max-w-md border border-accent/30 bg-black/90 p-6 text-center md:p-8">
          <div className="mb-3 font-brand text-[10px] tracking-[0.3em] text-accent">
            🔒 {title}
          </div>
          <h3 className="font-display text-xl font-black text-white">נדרש פרימיום</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
          <ul className="mt-4 space-y-1.5 text-start text-xs text-white/60">
            {PREMIUM_ARENA_FEATURES.slice(0, 4).map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="text-accent">▸</span> {f}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <BrandLink href="/pricing" variant="command" size="sm">
              שדרג לפרימיום
            </BrandLink>
            <Link
              href="/login"
              className="interactive-surface border border-white/10 px-4 py-2 text-xs text-muted-foreground hover:text-white"
            >
              התחברות
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function PremiumBadge() {
  return (
    <span className="border border-accent/40 bg-accent/10 px-2 py-0.5 font-brand text-[8px] text-accent">
      פרימיום
    </span>
  );
}
