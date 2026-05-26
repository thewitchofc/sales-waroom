import { mainNav } from "@/config/navigation";

export const BRAND_LOGO = {
  src: "/assets/sales-waroom-logo.png",
  alt: "Sales Waroom",
  width: 734,
  height: 553,
} as const;

export const siteConfig = {
  name: "SALES WAROOM",
  nameHe: "SALES WAROOM",
  tagline: "הכסף על הרצפה",
  logo: BRAND_LOGO,
  description:
    "סימולציות מכירה AI, אימון תחת לחץ, ודירוגים חיים, פלטפורמת SaaS לצוותי מכירות.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  locale: "he-IL",
  direction: "rtl" as const,
  links: {
    demo: "/demo",
    dashboard: "/dashboard",
    login: "/login",
    pricing: "/pricing",
    arena: "/arena",
  },
  nav: mainNav,
} as const;

export type SiteConfig = typeof siteConfig;
