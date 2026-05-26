import type { Metadata } from "next";
import { PrivacyPageContent } from "@/components/pages/privacy-page-content";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description:
    "מדיניות הפרטיות של Sales Waroom. איסוף מידע, שימוש, זכויות ויצירת קשר.",
};

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
