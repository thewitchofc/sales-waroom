export interface NavItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

/** תפריט ראשי — רק מה שצריך להחלטה ראשונה */
export const mainNav: NavItem[] = [
  { label: "דמו", href: "/demo", description: "לנסות שיחה עם AI" },
  { label: "חבילות", href: "/pricing", description: "מחירים ותוכניות" },
  { label: "אודות", href: "/about", description: "מה זה Sales Waroom" },
];

export const dashboardNav: NavItem[] = [
  { label: "תרגול", href: "/dashboard" },
  { label: "הזירה", href: "/arena" },
  { label: "דירוג", href: "/leaderboard" },
  { label: "עונה", href: "/season" },
  { label: "פרופיל", href: "/profile" },
];

export const footerNav: NavItem[] = [
  { label: "דמו", href: "/demo" },
  { label: "חבילות", href: "/pricing" },
  { label: "אודות", href: "/about" },
  { label: "התחברות", href: "/login" },
];

export const footerPlatformLinks: NavItem[] = [
  { label: "תרגול", href: "/dashboard" },
  { label: "אימון", href: "/training" },
  { label: "אנליטיקה", href: "/analytics" },
  { label: "פלטפורמה", href: "/platform" },
];

export const footerCommandLinks: NavItem[] = [
  { label: "הזירה", href: "/arena" },
  { label: "דירוג", href: "/leaderboard" },
  { label: "עונה", href: "/season" },
];

export const footerAccessLinks: NavItem[] = [
  { label: "חבילות", href: "/pricing" },
  { label: "התחברות", href: "/login" },
  { label: "אודות", href: "/about" },
];

export const productRoutes = [
  {
    title: "דמו",
    href: "/demo",
    label: "התחלה",
    description: "שיחת AI קצרה — רואים איך זה עובד.",
  },
  {
    title: "תרגול",
    href: "/dashboard",
    label: "יומיומי",
    description: "מתרגלים שיחות ומקבלים משוב מהמאמן.",
  },
  {
    title: "הזירה",
    href: "/arena",
    label: "תחרות",
    description: "אתגרים שבועיים ודירוג מול אחרים.",
  },
] as const;
