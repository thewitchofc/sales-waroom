import type { Metadata } from "next";
import { AccessibilityPageContent } from "@/components/pages/accessibility-page-content";

export const metadata: Metadata = {
  title: "הצהרת נגישות",
  description: 'פרטי נגישות, תקן ת"י 5568, ודרכי פנייה. Sales Waroom.',
};

export default function AccessibilityPage() {
  return <AccessibilityPageContent />;
}
