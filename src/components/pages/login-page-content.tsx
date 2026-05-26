"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogoLink } from "@/components/brand/brand-logo";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CinematicBackground } from "@/components/ui/cinematic-bg";
import { HudFrame } from "@/components/ui/hud-elements";
import { BrandButton } from "@/components/brand/brand-button";
import { Waveform } from "@/components/ui/waveform";

export function LoginPageContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 1200);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
      <CinematicBackground />

      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-md"
      >
        <BrandLogoLink href="/" variant="login" animated hoverGlow shimmer className="mb-10 justify-center" />

        <HudFrame label="SECURE ACCESS" className="panel-surface border border-white/10 bg-black/80 p-8">
          <h1 className="mb-2 font-display text-2xl font-bold text-white">כניסה למערכת</h1>
          <p className="mb-8 text-sm text-muted-foreground">
            הזינו פרטי גישה ל-Command Center
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block font-brand text-[9px] text-muted-foreground">
                EMAIL
              </label>
              <input
                type="email"
                defaultValue="dana@company.com"
                className="w-full border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-accent/40"
                required
              />
            </div>
            <div>
              <label className="mb-2 block font-brand text-[9px] text-muted-foreground">
                PASSWORD
              </label>
              <input
                type="password"
                defaultValue="••••••••"
                className="w-full border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-accent/40"
                required
              />
            </div>

            <BrandButton
              type="submit"
              variant="command"
              className="w-full"
              disabled={loading}
            >
              {loading ? "מתחבר..." : "כניסה ל-Command Center"}
            </BrandButton>
          </form>

          <div className="mt-6 border border-white/5 bg-black/40 p-3">
            <Waveform bars={32} active={loading} className="h-8" />
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            אין לכם חשבון?{" "}
            <Link href="/pricing" className="text-accent hover:underline">
              לצפייה בתוכניות
            </Link>
          </p>
        </HudFrame>
      </motion.div>
    </div>
  );
}
