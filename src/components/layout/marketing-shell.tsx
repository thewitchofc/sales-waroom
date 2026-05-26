"use client";

import { Navbar, Footer } from "@/components/layout/navbar";
import { WarRoomShell } from "@/components/layout/war-room-shell";

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <WarRoomShell>
      <Navbar />
      <main className="relative min-h-screen bg-black">{children}</main>
      <Footer />
    </WarRoomShell>
  );
}
