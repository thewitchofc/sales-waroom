import type { Metadata } from "next";
import { PageHero } from "@/components/pages/page-hero";
import { Pricing } from "@/components/sections/pricing";

export const metadata: Metadata = {
  title: "חבילות",
  description: "רמות גישה ל-Sales Waroom, ממפעיל עצמאי ועד מרכז פיקוד ארגוני.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        compact
        label="חבילות · SALES WAROOM"
        title="שלוש רמות גישה"
        description="בחרו רמה. הזירה והדירוג פתוחים למנויים."
      />
      <Pricing showHeader={false} />
    </>
  );
}
