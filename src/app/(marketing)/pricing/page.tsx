import type { Metadata } from "next";
import { PageHero } from "@/components/pages/page-hero";
import { Pricing } from "@/components/sections/pricing";
import { PricingLiveHud } from "@/components/sections/pricing-live-hud";
import { PricingArenaSection } from "@/components/sections/pricing-arena-section";

export const metadata: Metadata = {
  title: "חבילות",
  description: "רמות גישה ל-Sales Waroom, ממפעיל עצמאי ועד מרכז פיקוד ארגוני.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        label="חבילות · SALES WAROOM"
        title="לא קונים תוכנה. מקבלים סיווג."
        description="שלוש רמות גישה. הזירה פתוחה למנויים. הדירוג מתעדכן כל שבוע."
      />
      <PricingLiveHud />
      <Pricing showHeader={false} />
      <PricingArenaSection />
    </>
  );
}
