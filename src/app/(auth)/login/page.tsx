import type { Metadata } from "next";
import { LoginPageContent } from "@/components/pages/login-page-content";

export const metadata: Metadata = {
  title: "התחברות",
  description: "כניסה מאובטחת ל Sales Waroom מרכז פיקוד.",
};

export default function LoginPage() {
  return <LoginPageContent />;
}
