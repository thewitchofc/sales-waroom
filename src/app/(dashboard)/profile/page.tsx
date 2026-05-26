import type { Metadata } from "next";
import { ProfilePageContent } from "@/components/pages/profile-page-content";

export const metadata: Metadata = {
  title: "Profile",
  description: "פרופיל לוחם, rank, XP, badges, battle statistics.",
};

export default function ProfilePage() {
  return <ProfilePageContent />;
}
