"use client";

import { Navbar, Footer } from "@/components/layout/navbar";
import { WarRoomShell } from "@/components/layout/war-room-shell";
import { AnimatedPage } from "@/components/layout/animated-page";

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <WarRoomShell>
      <Navbar />
      <AnimatedPage>
        <main className="relative min-h-screen bg-black">{children}</main>
      </AnimatedPage>
      <Footer />
    </WarRoomShell>
  );
}
