/**
 * App route groups and page composition map.
 *
 * (marketing)/ → public pages with MarketingShell (navbar + footer + HUD)
 * (auth)/ → login flow
 * (dashboard)/ → authenticated command center + competitive arena
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
  accessibility: "/accessibility",
  privacy: "/privacy",
  login: "/login",
  dashboard: "/dashboard",
  theoryQuiz: "/theory-quiz",
  arena: "/arena",
  leaderboard: "/leaderboard",
  season: "/season",
  profile: "/profile",
} as const;

export const arenaRoutes = [
  appRoutes.arena,
  appRoutes.leaderboard,
  appRoutes.season,
  appRoutes.profile,
] as const;
