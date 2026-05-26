import type { Metadata } from "next";
import { ProfilePageContent } from "@/components/pages/profile-page-content";

export const metadata: Metadata = {
  title: "פרופיל",
  description: "פרופיל לוחם, דירוג, XP, תגים וסטטיסטיקות קרב.",
};

export default function ProfilePage() {
  return <ProfilePageContent />;
}
