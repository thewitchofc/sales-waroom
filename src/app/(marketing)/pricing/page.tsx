import type { Metadata } from "next";
import { PageHero } from "@/components/pages/page-hero";
import { Pricing } from "@/components/sections/pricing";

export const metadata: Metadata = {
  title: "תמחור",
  description: "תוכניות Sales Waroom — מסוכן עצמאי ועד enterprise.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        label="PRICING"
        title="השקיעו במיומנות שמדפיסה הכנסות"
        description="14 יום ניסיון חינם. גישה מיידית ל-Command Center."
      />
      <Pricing showHeader={false} />
    </>
  );
}
