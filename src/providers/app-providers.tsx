"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { CinematicIntro } from "@/components/layout/cinematic-intro";
import { AccessibilityProvider } from "@/providers/accessibility-provider";
import { AccessibilityWidget } from "@/components/accessibility/accessibility-widget";
import { SkipToContent } from "@/components/accessibility/skip-to-content";

import { SiteAtmosphere } from "@/components/ui/site-atmosphere";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
    >
      <AccessibilityProvider>
        <SiteAtmosphere />
        <SkipToContent />
        <CinematicIntro />
        <div className="relative z-0 min-h-screen">{children}</div>
        <AccessibilityWidget />
        <Toaster position="top-center" dir="rtl" richColors closeButton />
      </AccessibilityProvider>
    </ThemeProvider>
  );
}
