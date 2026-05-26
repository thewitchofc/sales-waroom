export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export const mainNav: NavItem[] = [
  { label: "דמו", href: "/demo", description: "חוויה אינטראקטיבית" },
  { label: "פלטפורמה", href: "/platform", description: "סקירת מערכת" },
  { label: "אימון", href: "/training", description: "סימולטור AI" },
  { label: "אנליטיקה", href: "/analytics", description: "מרכז ביצועים" },
  { label: "תמחור", href: "/pricing", description: "תוכניות" },
  { label: "אודות", href: "/about", description: "הסיפור שלנו" },
];

export const dashboardNav: NavItem[] = [
  { label: "מרכז פיקוד", href: "/dashboard" },
  { label: "סימולציות", href: "/dashboard#simulations" },
  { label: "אנליטיקה", href: "/dashboard#analytics" },
  { label: "Coach", href: "/dashboard#coaching" },
  { label: "צוות", href: "/dashboard#team" },
];

export const footerNav: NavItem[] = [
  { label: "פלטפורמה", href: "/platform" },
  { label: "תמחור", href: "/pricing" },
  { label: "אודות", href: "/about" },
  { label: "התחברות", href: "/login" },
];

export const productRoutes = [
  {
    title: "דמו חי",
    href: "/demo",
    label: "LIVE DEMO",
    description: "שיחת AI בעברית, תמלול, Coach וניתוח בזמן אמת.",
  },
  {
    title: "פלטפורמה",
    href: "/platform",
    label: "PLATFORM",
    description: "ארכיטקטורת מערכת הפעלה למכירות — מהשיחה ועד הפיקוד.",
  },
  {
    title: "אימון",
    href: "/training",
    label: "TRAINING",
    description: "סימולטור התנגדויות ואימון קולי תחת לחץ.",
  },
  {
    title: "אנליטיקה",
    href: "/analytics",
    label: "ANALYTICS",
    description: "דשבורד ביצועים, מגמות ותובנות AI.",
  },
] as const;
