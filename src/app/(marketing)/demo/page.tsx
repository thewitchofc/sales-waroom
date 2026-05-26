import type { Metadata } from "next";
import { PageHero } from "@/components/pages/page-hero";
import { LivePlatform } from "@/components/sections/live-platform";

export const metadata: Metadata = {
  title: "דמו חי",
  description: "חוויית דמו אינטראקטיבית — שיחות AI, תמלול, Coach וניתוח בזמן אמת.",
};

export default function DemoPage() {
  return (
    <>
      <PageHero
        label="LIVE DEMO"
        title="הדמו שמרגיש כמו שיחה אמיתית"
        description="צפו בסימולציה חיה בעברית — transcript, waveform, scores ו-AI Coach שרצים ביחד."
      />
      <LivePlatform showHeader={false} />
    </>
  );
}
