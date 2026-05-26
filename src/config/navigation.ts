export interface NavItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

export const mainNav: NavItem[] = [
  { label: "הזירה", href: "/arena", description: "תחרות AI", badge: "חי" },
  { label: "דמו", href: "/demo", description: "חוויה אינטראקטיבית" },
  { label: "פלטפורמה", href: "/platform", description: "סקירת מערכת" },
  { label: "אימון", href: "/training", description: "סימולטור AI" },
  { label: "אנליטיקה", href: "/analytics", description: "מרכז ביצועים" },
  { label: "חבילות", href: "/pricing", description: "תוכניות" },
  { label: "אודות", href: "/about", description: "הסיפור שלנו" },
];

export const dashboardNav: NavItem[] = [
  { label: "מרכז פיקוד", href: "/dashboard" },
  { label: "⚔ הזירה", href: "/arena", badge: "חי" },
  { label: "לוח דירוג", href: "/leaderboard" },
  { label: "עונה", href: "/season" },
  { label: "פרופיל", href: "/profile" },
  { label: "סימולציות", href: "/dashboard#simulations" },
  { label: "מאמן", href: "/dashboard#coaching" },
  { label: "צוות", href: "/dashboard#team" },
];

export const footerNav: NavItem[] = [
  { label: "הזירה", href: "/arena" },
  { label: "פלטפורמה", href: "/platform" },
  { label: "חבילות", href: "/pricing" },
  { label: "אודות", href: "/about" },
  { label: "התחברות", href: "/login" },
];

export const footerPlatformLinks: NavItem[] = [
  { label: "דמו חי", href: "/demo" },
  { label: "פלטפורמה", href: "/platform" },
  { label: "אימון", href: "/training" },
  { label: "אנליטיקה", href: "/analytics" },
];

export const footerCommandLinks: NavItem[] = [
  { label: "הזירה", href: "/arena" },
  { label: "לוח דירוג", href: "/leaderboard" },
  { label: "עונה", href: "/season" },
  { label: "מרכז פיקוד", href: "/dashboard" },
];

export const footerAccessLinks: NavItem[] = [
  { label: "חבילות", href: "/pricing" },
  { label: "התחברות", href: "/login" },
  { label: "אודות", href: "/about" },
];

export const productRoutes = [
  {
    title: "הזירה",
    href: "/arena",
    label: "תחרותי",
    description: "תחרות שבועית, לוח דירוג חי, עונות וטורנירים, אי-ספורט למכירות.",
  },
  {
    title: "דמו חי",
    href: "/demo",
    label: "דמו חי",
    description: "שיחת AI בעברית, תמלול, מאמן וניתוח בזמן אמת.",
  },
  {
    title: "פלטפורמה",
    href: "/platform",
    label: "פלטפורמה",
    description: "ארכיטקטורת מערכת הפעלה למכירות, מהשיחה ועד הפיקוד.",
  },
  {
    title: "אימון",
    href: "/training",
    label: "אימון",
    description: "סימולטור התנגדויות ואימון קולי תחת לחץ.",
  },
  {
    title: "אנליטיקה",
    href: "/analytics",
    label: "אנליטיקה",
    description: "דשבורד ביצועים, מגמות ותובנות AI.",
  },
] as const;
