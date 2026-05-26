"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { CinematicIntro } from "@/components/layout/cinematic-intro";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
      <CinematicIntro />
      {children}
      <Toaster position="top-center" dir="rtl" richColors closeButton />
    </ThemeProvider>
  );
}
