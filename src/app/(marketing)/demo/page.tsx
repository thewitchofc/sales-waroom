import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { SectionSkeleton } from "@/components/ui/section-skeleton";

const LivePlatform = dynamic(
  () =>
    import("@/components/sections/live-platform").then((m) => ({
      default: m.LivePlatform,
    })),
  { loading: () => <SectionSkeleton className="py-24" /> }
);

export const metadata: Metadata = {
  title: "דמו",
  description: "נסו שיחת תרגול עם AI — בלי הרשמה.",
};

export default function DemoPage() {
  return <LivePlatform />;
}
