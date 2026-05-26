import type { Metadata } from "next";
import { PageHero } from "@/components/pages/page-hero";
import { AnalyticsDashboard } from "@/components/sections/analytics-dashboard";

export const metadata: Metadata = {
  title: "אנליטיקה",
  description: "דשבורד ביצועים, מגמות, תובנות AI ודוחות צוות.",
};

export default function AnalyticsPage() {
  return (
    <>
      <PageHero
        label="ANALYTICS"
        title="כל מדד. כל חולשה. לפני שזה עולה ביוק."
        description="מגמות ביטחון, מיומנויות, coaching insights ודוחות ביצועים, בזמן אמת."
      />
      <AnalyticsDashboard showHeader={false} />
    </>
  );
}
