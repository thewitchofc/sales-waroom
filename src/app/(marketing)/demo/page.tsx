import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { PageHero } from "@/components/pages/page-hero";
import { SectionSkeleton } from "@/components/ui/section-skeleton";

const LivePlatform = dynamic(
  () =>
    import("@/components/sections/live-platform").then((m) => ({
      default: m.LivePlatform,
    })),
  { loading: () => <SectionSkeleton className="py-24" /> }
);

export const metadata: Metadata = {
  title: "דמו חי",
  description: "חוויית דמו אינטראקטיבית, שיחות AI, תמלול, מאמן וניתוח בזמן אמת.",
};

export default function DemoPage() {
  return (
    <>
      <PageHero
        compact
        label="דמו חי · SALES WAROOM"
        title="הדמו שמרגיש כמו שיחה אמיתית"
        description="סימולציה חיה בעברית, תמלול, ניתוח AI, ציונים ומאמן, במערכת פיקוד אחת."
      />
      <LivePlatform showHeader={false} />
    </>
  );
}
