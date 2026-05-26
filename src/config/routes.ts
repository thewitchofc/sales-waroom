/**
 * App route groups and page composition map.
 *
 * (marketing)/  → public pages with MarketingShell (navbar + footer + HUD)
 * (auth)/       → login flow
 * (dashboard)/  → authenticated command center experience
 */

export type AppRouteGroup = "marketing" | "auth" | "dashboard";

export const appRoutes = {
  home: "/",
  demo: "/demo",
  platform: "/platform",
  training: "/training",
  analytics: "/analytics",
  pricing: "/pricing",
  about: "/about",
  login: "/login",
  dashboard: "/dashboard",
} as const;
