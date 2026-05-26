import { Navbar, Footer } from "@/components/layout/navbar";
import PageTransition from "@/components/layout/page-transition";
import { WarRoomShell } from "@/components/layout/war-room-shell";
import { Hero } from "@/components/sections/hero";
import { LivePlatform } from "@/components/sections/live-platform";
import { TrustedBy } from "@/components/sections/trusted-by";
import { ObjectionSimulator } from "@/components/sections/objection-simulator";
import { VoiceTraining } from "@/components/sections/voice-training";
import { AnalyticsDashboard } from "@/components/sections/analytics-dashboard";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { FinalCTA } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <PageTransition>
      <WarRoomShell>
        <main className="relative min-h-screen bg-black">
          <Navbar />
          <Hero />
          <LivePlatform />
          <ObjectionSimulator />
          <VoiceTraining />
          <AnalyticsDashboard />
          <TrustedBy />
          <Testimonials />
          <Pricing />
          <FinalCTA />
          <Footer />
        </main>
      </WarRoomShell>
    </PageTransition>
  );
}
