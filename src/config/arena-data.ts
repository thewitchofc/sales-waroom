export type RankTier = "bronze" | "silver" | "gold" | "elite" | "war_master";

export interface RankTierConfig {
  id: RankTier;
  label: string;
  labelHe: string;
  minXp: number;
  maxXp: number;
  color: string;
  border: string;
  glow: string;
}

export const RANK_TIERS: RankTierConfig[] = [
  {
    id: "bronze",
    label: "BRONZE",
    labelHe: "ברונזה",
    minXp: 0,
    maxXp: 999,
    color: "text-amber-600",
    border: "border-amber-600/40",
    glow: "rgba(180,83,9,0.25)",
  },
  {
    id: "silver",
    label: "SILVER",
    labelHe: "כסף",
    minXp: 1000,
    maxXp: 2499,
    color: "text-slate-300",
    border: "border-slate-400/40",
    glow: "rgba(148,163,184,0.25)",
  },
  {
    id: "gold",
    label: "GOLD",
    labelHe: "זהב",
    minXp: 2500,
    maxXp: 4999,
    color: "text-accent",
    border: "border-accent/40",
    glow: "rgba(212,175,85,0.35)",
  },
  {
    id: "elite",
    label: "ELITE",
    labelHe: "עילית",
    minXp: 5000,
    maxXp: 7999,
    color: "text-purple-400",
    border: "border-purple-500/40",
    glow: "rgba(168,85,247,0.3)",
  },
  {
    id: "war_master",
    label: "WAR MASTER",
    labelHe: "אדון מלחמה",
    minXp: 8000,
    maxXp: 99999,
    color: "text-red-400",
    border: "border-red-500/50",
    glow: "rgba(239,68,68,0.35)",
  },
];

export interface ArenaBadge {
  id: string;
  label: string;
  icon: string;
  rarity: "common" | "rare" | "legendary";
}

export interface BattleStats {
  authority: number;
  frameControl: number;
  confidence: number;
  objectionHandling: number;
  pressureResponse: number;
  closingPerformance: number;
}

export interface ArenaPlayer {
  id: string;
  name: string;
  rank: number;
  previousRank: number;
  score: number;
  tier: RankTier;
  xp: number;
  streak: number;
  wins: number;
  losses: number;
  badges: string[];
  isLive?: boolean;
  isPremium?: boolean;
  stats: BattleStats;
}

export interface WeeklyChallenge {
  id: string;
  title: string;
  titleHe: string;
  scenario: string;
  persona: string;
  pressureLevel: string;
  participants: number;
  prize: string;
  endsAt: Date;
  metrics: (keyof BattleStats)[];
}

export interface Season {
  id: number;
  name: string;
  nameHe: string;
  tagline: string;
  startDate: string;
  endDate: string;
  daysRemaining: number;
  totalBattles: number;
  activePlayers: number;
  rewards: string[];
}

export interface Tournament {
  id: string;
  name: string;
  nameHe: string;
  format: string;
  entryFee: string;
  prizePool: string;
  slots: number;
  filled: number;
  startsAt: Date;
  premiumOnly: boolean;
  pressureLevel: number;
}

export const CURRENT_USER: ArenaPlayer & { isPremium: boolean; handle: string } = {
  id: "user-1",
  name: "דנה כהן",
  handle: "DANA_CLOSER",
  rank: 7,
  previousRank: 11,
  score: 847,
  tier: "elite",
  xp: 4820,
  streak: 12,
  wins: 34,
  losses: 8,
  badges: ["frame-king", "pressure-immune", "streak-10"],
  isPremium: false,
  stats: {
    authority: 88,
    frameControl: 84,
    confidence: 91,
    objectionHandling: 86,
    pressureResponse: 79,
    closingPerformance: 82,
  },
};

export const CURRENT_SEASON: Season = {
  id: 4,
  name: "WAR PROTOCOL",
  nameHe: "פרוטוקול מלחמה",
  tagline: "Season 4 · Elite Closers Only",
  startDate: "2026-03-01",
  endDate: "2026-05-31",
  daysRemaining: 36,
  totalBattles: 12847,
  activePlayers: 2847,
  rewards: [
    "War Master Badge · Legendary",
    "Elite Persona Unlock · CFO Omega",
    "Premium Analytics · 90 Days",
    "Arena Champion Title · Season 4",
  ],
};

function getWeekEnd(): Date {
  const now = new Date();
  const day = now.getDay();
  const daysUntilSunday = day === 0 ? 0 : 7 - day;
  const end = new Date(now);
  end.setDate(now.getDate() + daysUntilSunday);
  end.setHours(23, 59, 59, 999);
  return end;
}

function getTournamentStart(): Date {
  const start = new Date();
  start.setHours(start.getHours() + 2, 15, 0, 0);
  return start;
}

export const WEEKLY_CHALLENGE: WeeklyChallenge = {
  id: "wc-2026-w21",
  title: "CFO DOMINANCE CHALLENGE",
  titleHe: "אתגר שליטה · CFO דומיננטי",
  scenario:
    "אותו לקוח CFO סקепטי לכל המשתתפים. 12 דקות. אין תסריט. מי שומר frame, מנצח.",
  persona: "CFO סקепטי · CRIT Dominance",
  pressureLevel: "INTENSE · Level 4",
  participants: 847,
  prize: "War Master Points · 500 XP",
  endsAt: getWeekEnd(),
  metrics: [
    "authority",
    "frameControl",
    "confidence",
    "objectionHandling",
    "pressureResponse",
    "closingPerformance",
  ],
};

export const LIVE_TOURNAMENT: Tournament = {
  id: "t-s4-elite",
  name: "ELITE CLOSER CUP",
  nameHe: "גביע הקלוזרים העילית",
  format: "Single Elimination · 32 Slots",
  entryFee: "Premium",
  prizePool: "₪12,000 Credits",
  slots: 32,
  filled: 28,
  startsAt: getTournamentStart(),
  premiumOnly: true,
  pressureLevel: 5,
};

export const LEADERBOARD_PLAYERS: ArenaPlayer[] = [
  {
    id: "p1",
    name: "אורי שפירא",
    rank: 1,
    previousRank: 2,
    score: 984,
    tier: "war_master",
    xp: 9240,
    streak: 18,
    wins: 52,
    losses: 3,
    badges: ["war-master", "frame-king", "closer-elite"],
    isLive: true,
    isPremium: true,
    stats: { authority: 96, frameControl: 94, confidence: 97, objectionHandling: 92, pressureResponse: 91, closingPerformance: 95 },
  },
  {
    id: "p2",
    name: "נועה גולד",
    rank: 2,
    previousRank: 1,
    score: 971,
    tier: "war_master",
    xp: 8890,
    streak: 14,
    wins: 48,
    losses: 5,
    badges: ["pressure-immune", "streak-10"],
    isLive: true,
    isPremium: true,
    stats: { authority: 94, frameControl: 92, confidence: 95, objectionHandling: 90, pressureResponse: 93, closingPerformance: 91 },
  },
  {
    id: "p3",
    name: "יוסי לוי",
    rank: 3,
    previousRank: 5,
    score: 956,
    tier: "elite",
    xp: 6120,
    streak: 9,
    wins: 41,
    losses: 11,
    badges: ["frame-king"],
    isLive: false,
    isPremium: true,
    stats: { authority: 91, frameControl: 89, confidence: 92, objectionHandling: 88, pressureResponse: 85, closingPerformance: 87 },
  },
  {
    id: "p4",
    name: "מיכל אברהם",
    rank: 4,
    previousRank: 4,
    score: 941,
    tier: "elite",
    xp: 5890,
    streak: 7,
    wins: 38,
    losses: 9,
    badges: ["closer-elite"],
    isLive: true,
    isPremium: false,
    stats: { authority: 89, frameControl: 87, confidence: 90, objectionHandling: 86, pressureResponse: 84, closingPerformance: 88 },
  },
  {
    id: "p5",
    name: "עמית רוזן",
    rank: 5,
    previousRank: 3,
    score: 928,
    tier: "elite",
    xp: 5340,
    streak: 5,
    wins: 35,
    losses: 12,
    badges: [],
    isLive: false,
    isPremium: true,
    stats: { authority: 87, frameControl: 85, confidence: 88, objectionHandling: 84, pressureResponse: 82, closingPerformance: 85 },
  },
  {
    id: "p6",
    name: "רון דוד",
    rank: 6,
    previousRank: 8,
    score: 912,
    tier: "gold",
    xp: 4210,
    streak: 11,
    wins: 29,
    losses: 14,
    badges: ["streak-10"],
    isLive: true,
    isPremium: true,
    stats: { authority: 85, frameControl: 83, confidence: 86, objectionHandling: 82, pressureResponse: 80, closingPerformance: 83 },
  },
  CURRENT_USER,
  {
    id: "p8",
    name: "שירה מזרחי",
    rank: 8,
    previousRank: 7,
    score: 831,
    tier: "gold",
    xp: 3890,
    streak: 4,
    wins: 26,
    losses: 15,
    badges: [],
    isLive: false,
    isPremium: false,
    stats: { authority: 82, frameControl: 80, confidence: 84, objectionHandling: 79, pressureResponse: 77, closingPerformance: 80 },
  },
  {
    id: "p9",
    name: "תומר בן דוד",
    rank: 9,
    previousRank: 12,
    score: 819,
    tier: "gold",
    xp: 3650,
    streak: 6,
    wins: 24,
    losses: 16,
    badges: [],
    isLive: false,
    isPremium: true,
    stats: { authority: 80, frameControl: 78, confidence: 82, objectionHandling: 77, pressureResponse: 75, closingPerformance: 78 },
  },
  {
    id: "p10",
    name: "ליאור כץ",
    rank: 10,
    previousRank: 10,
    score: 804,
    tier: "silver",
    xp: 2100,
    streak: 3,
    wins: 18,
    losses: 19,
    badges: [],
    isLive: true,
    isPremium: false,
    stats: { authority: 76, frameControl: 74, confidence: 78, objectionHandling: 72, pressureResponse: 70, closingPerformance: 74 },
  },
];

export const ARENA_BADGES: Record<string, ArenaBadge> = {
  "frame-king": { id: "frame-king", label: "Frame King", icon: "FK", rarity: "rare" },
  "pressure-immune": { id: "pressure-immune", label: "Pressure Immune", icon: "PI", rarity: "rare" },
  "closer-elite": { id: "closer-elite", label: "Closer Elite", icon: "CE", rarity: "legendary" },
  "streak-10": { id: "streak-10", label: "10-Win Streak", icon: "S10", rarity: "common" },
  "war-master": { id: "war-master", label: "War Master", icon: "WM", rarity: "legendary" },
};

export const STAT_LABELS: Record<keyof BattleStats, { label: string; labelHe: string }> = {
  authority: { label: "AUTHORITY", labelHe: "סמכות" },
  frameControl: { label: "FRAME", labelHe: "שליטה בפריים" },
  confidence: { label: "CONFIDENCE", labelHe: "ביטחון" },
  objectionHandling: { label: "OBJECTION", labelHe: "התנגדויות" },
  pressureResponse: { label: "PRESSURE", labelHe: "תגובה ללחץ" },
  closingPerformance: { label: "CLOSING", labelHe: "סגירה" },
};

export const PREMIUM_ARENA_FEATURES = [
  "Weekly ranked tournaments",
  "Live competitive arena",
  "Elite dominant personas",
  "Advanced battle analytics",
  "Real-time rank tracking",
  "Season championship entry",
];

export function getTierForXp(xp: number): RankTierConfig {
  return [...RANK_TIERS].reverse().find((t) => xp >= t.minXp) ?? RANK_TIERS[0];
}

export function getTierConfig(tier: RankTier): RankTierConfig {
  return RANK_TIERS.find((t) => t.id === tier) ?? RANK_TIERS[0];
}

export function getXpProgress(xp: number): { current: number; next: number; pct: number } {
  const tier = getTierForXp(xp);
  const nextTier = RANK_TIERS[RANK_TIERS.indexOf(tier) + 1];
  if (!nextTier) return { current: xp, next: tier.maxXp, pct: 100 };
  const range = nextTier.minXp - tier.minXp;
  const progress = xp - tier.minXp;
  return { current: xp, next: nextTier.minXp, pct: Math.min((progress / range) * 100, 100) };
}

export function getRankMovement(rank: number, previousRank: number): number {
  return previousRank - rank;
}
