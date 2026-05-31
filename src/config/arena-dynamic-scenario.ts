import type { ArenaSimulationLevel } from "@/config/arena-simulation-prompt";
import {
  TRAINING_INDUSTRY_OPTIONS,
  TRAINING_SALE_TYPE_OPTIONS,
  TRAINING_WEAKNESS_OPTIONS,
  type TrainingWeakness,
  type UserTrainingProfile,
} from "@/config/user-training-profile";

export interface ArenaDynamicScenario {
  id: string;
  situation: string;
  situationLabel: string;
  emotionalState: string;
  personality: string;
  personalityLabel: string;
  speechTone: string;
  openingLine: string;
  pressure: number;
  irritability: number;
  skepticism: number;
  patience: number;
  energy: number;
  chaosBehaviors: string[];
  industryLabel: string;
  industryObjections: string[];
  saleContext: string;
  weaknessFocus: string[];
  difficultyLabel: string;
}

const SITUATIONS = [
  {
    id: "garage",
    label: "באמצע מוסך",
    context: "אתה במוסך, רעש של כלים, לא באמת יכול לדבר.",
  },
  {
    id: "kids",
    label: "ילדים בבית",
    context: "ילדים צורחים ברקע, אתה מוסה את הטלפון.",
  },
  {
    id: "driving",
    label: "באמצע נהיגה",
    context: "אתה נוהג, חצי תשומת לב, רוצה לנתק מהר.",
  },
  {
    id: "shopping",
    label: "באמצע קניות",
    context: "אתה בתור בקופה או בסuper, לחץ זמן.",
  },
  {
    id: "work",
    label: "באמצע עבודה",
    context: "באמצע יום עבודה עמוס, קולleagues ברקע.",
  },
  {
    id: "tired",
    label: "עייף/עייפה",
    context: "סוף יום ארוך, אין לך כוח לשיחות.",
  },
  {
    id: "stressed",
    label: "לחוץ/לחוצה בזמן",
    context: "יש לך פגישה בעוד 5 דקות.",
  },
  {
    id: "home_quiet",
    label: "בבית בשקט",
    context: "פתאום שיחה לא צפויה — מעורר חשד.",
  },
] as const;

const PERSONALITIES = [
  {
    id: "angry",
    label: "עצבני/עצבנית",
    traits: "קצר fuse, מתעצבן מהר, לא סובל בזבוז זמן.",
  },
  {
    id: "impatient",
    label: "חסר/ת סבלנות",
    traits: "קוצר, מקטע משפטים, רוצה תכל'ס.",
  },
  {
    id: "skeptic",
    label: "חשדן/ית",
    traits: "לא מאמין למילים, בודק כל משפט.",
  },
  {
    id: "anti_sales",
    label: "אנטי-מכירות",
    traits: "שונא שיחות מכירה, מחפש סיבה לנתק.",
  },
  {
    id: "indifferent",
    label: "אדיש/ה",
    traits: "לא ממש אכפת, עונה בקצרה, אולי יתנתק.",
  },
  {
    id: "high_ego",
    label: "אגו גבוה",
    traits: "חושב שאתה יודע הכל, מזלזל בנציג.",
  },
  {
    id: "cynical",
    label: "ציני/ת",
    traits: "לועג, סרקסטי, לא נותן קרדיט.",
  },
  {
    id: "confused",
    label: "מבולבל/ת",
    traits: "לא בטוח למה התקשרו, שואל שאלות לא קשורות.",
  },
] as const;

const EMOTIONAL_STATES = [
  "עצבני",
  "לחוץ",
  "עייף",
  "חשדן",
  "אדיש",
  "מבולבל",
  "ציני",
  "עצבני ועייף",
  "לחוץ וחסר סבלנות",
  "רגוע אבל סקפטי",
] as const;

const SPEECH_TONES = [
  "קצר וחתוך",
  "מרגיז ולוחץ",
  "קר ומנוכר",
  "סרקסטי",
  "ממהר",
  "מלמול ולא בטוח",
  "אגרסיבי אבל לא צועק",
  "משעמם ולא מעוניין",
] as const;

const OPENINGS = [
  "הלוווו מי זה עכשיו??",
  "רגע שנייה הילדים פה צורחים.",
  "תקשיב יש לי בדיוק דקה.",
  "מאיפה יש לכם את המספר שלי?",
  "אם זאת שיחת מכירה אני מנתק.",
  "אני באמצע קופה עכשיו דבר מהר.",
  "מה? מי זה?",
  "לא תפסו אותי בזמן גרוע.",
  "אני עסוק, מה אתה רוצה?",
  "שמע, יש לי שתי דקות וזהו.",
  "עוד שיחת מכירה? רציני?",
  "כן? דבר מהר.",
  "רגע— אני נוהג.",
  "אני לא בטוח שביקשתי שיחזרו אליי.",
  "...כן?",
] as const;

const CHAOS_BEHAVIORS = [
  "קטע את הנציג באמצע משפט — 'רגע', 'חכה', 'מה?'",
  "הזכר הפרעה מהסיטואציה — ילדים, רעש, תור, נהיגה",
  "ענה במילה אחת לפעמים: 'כן', 'לא', 'אולי', 'לא יודע'",
  "שתיקה קצרה לפני תשובה — '...מממ', '...רגע'",
  "שנה אנרגיה תוך כדי השיחה — מעצבן לציני או מאדיש ללחוץ",
  "בלבול — 'על מה מדובר?', 'מי אתם בכלל?'",
  "ציניות — 'יפה, עוד אחד', 'שמעתי את זה'",
  "אל תהיה מושלם — תגובות לא מלוטשות, לא מסודרות",
  "אל תחזור על אותה התנגדות — גוון כל פעם",
  "הראה שאתה עסוק — 'רגע', 'שנייה', 'תחזור על זה'",
] as const;

const LEVEL_BANDS: Record<
  ArenaSimulationLevel,
  { min: number; max: number; label: string }
> = {
  entry: { min: 2, max: 5, label: "רמה 1 — סקפטי אבל עדיין מקשיב" },
  medium: { min: 4, max: 7, label: "רמה 2 — לחץ בינוני, פחות סבלנות" },
  hard: { min: 6, max: 9, label: "רמה 3 — אגרסיבי, קצר רוח" },
  elite: { min: 7, max: 10, label: "עילית — cynical, בודק גבולות" },
};

const EXPERIENCE_OFFSET: Record<UserTrainingProfile["experienceLevel"], number> =
  {
    beginner: -1,
    intermediate: 0,
    advanced: 1,
  };

function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function pickRandomMany<T>(items: readonly T[], count: number): T[] {
  const copy = [...items];
  const picked: T[] = [];
  while (picked.length < count && copy.length > 0) {
    const index = Math.floor(Math.random() * copy.length);
    picked.push(copy.splice(index, 1)[0]);
  }
  return picked;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function scaleTrait(
  level: ArenaSimulationLevel,
  experienceLevel: UserTrainingProfile["experienceLevel"],
  key: "pressure" | "irritability" | "skepticism" | "patience" | "energy",
) {
  const band = LEVEL_BANDS[level];
  const offset = EXPERIENCE_OFFSET[experienceLevel];
  let min = band.min + offset;
  let max = band.max + offset;

  if (key === "patience") {
    min = 11 - max - 1;
    max = 11 - band.min - offset;
  }

  if (key === "energy") {
    min = Math.max(2, band.min + offset - 1);
    max = Math.min(10, band.max + offset);
  }

  min = clamp(min, 1, 10);
  max = clamp(max, min, 10);
  return randomInt(min, max);
}

function buildWeaknessFocus(profile: UserTrainingProfile) {
  const selected =
    profile.weaknesses.length > 0
      ? profile.weaknesses
      : (["objections", "authority"] as TrainingWeakness[]);

  return selected.map((weakness) => TRAINING_WEAKNESS_OPTIONS[weakness].coachFocus);
}

export function generateArenaDynamicScenario({
  level,
  profile,
}: {
  level: ArenaSimulationLevel;
  profile: UserTrainingProfile;
}): ArenaDynamicScenario {
  const situation = pickRandom(SITUATIONS);
  const personality = pickRandom(PERSONALITIES);
  const industry = TRAINING_INDUSTRY_OPTIONS[profile.industry];
  const sale = TRAINING_SALE_TYPE_OPTIONS[profile.saleType];
  const weaknessFocus = buildWeaknessFocus(profile);

  return {
    id: `scenario-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    situation: situation.context,
    situationLabel: situation.label,
    emotionalState: pickRandom(EMOTIONAL_STATES),
    personality: personality.traits,
    personalityLabel: personality.label,
    speechTone: pickRandom(SPEECH_TONES),
    openingLine: pickRandom(OPENINGS),
    pressure: scaleTrait(level, profile.experienceLevel, "pressure"),
    irritability: scaleTrait(level, profile.experienceLevel, "irritability"),
    skepticism: scaleTrait(level, profile.experienceLevel, "skepticism"),
    patience: scaleTrait(level, profile.experienceLevel, "patience"),
    energy: scaleTrait(level, profile.experienceLevel, "energy"),
    chaosBehaviors: pickRandomMany(CHAOS_BEHAVIORS, 3),
    industryLabel: industry.label,
    industryObjections: pickRandomMany(industry.objections, 3),
    saleContext: sale.callContext,
    weaknessFocus,
    difficultyLabel: LEVEL_BANDS[level].label,
  };
}

export function buildArenaScenarioPrompt(
  scenario: ArenaDynamicScenario,
  profile: UserTrainingProfile,
) {
  const industry = TRAINING_INDUSTRY_OPTIONS[profile.industry];

  return `LIVE SCENARIO — treat this as a real call, not a chatbot roleplay.

Current situation: ${scenario.situation} (${scenario.situationLabel})
Emotional state: ${scenario.emotionalState}
Personality: ${scenario.personalityLabel} — ${scenario.personality}
Speech tone: ${scenario.speechTone}
Call context: ${scenario.saleContext}
Industry: ${scenario.industryLabel}
Buyer mindset: ${industry.buyerMindset}

Trait levels (1-10): pressure ${scenario.pressure}, irritability ${scenario.irritability}, skepticism ${scenario.skepticism}, patience ${scenario.patience}, energy ${scenario.energy}
Difficulty: ${scenario.difficultyLabel}

Industry-relevant objections to weave in naturally:
${scenario.industryObjections.map((item) => `- ${item}`).join("\n")}

Salesperson weaknesses to exploit if they show up in the call:
${scenario.weaknessFocus.map((item) => `- ${item}`).join("\n")}

Chaos behaviors — use 1-2 per turn, stay human and messy:
${scenario.chaosBehaviors.map((item) => `- ${item}`).join("\n")}

Opening inspiration (adapt to situation, do not copy robotically):
"${scenario.openingLine}"

Human realism rules:
- Sound like a real Israeli on the phone — imperfect, distracted, interrupted.
- Vary length: sometimes one word, sometimes two sentences.
- Change mood mid-call if the salesperson is weak or strong.
- Never repeat the same objection phrasing twice in one call.
- Reference your situation when distracted (kids, driving, work, queue).
- This is live sales chaos training — not a polite assistant.`;
}

export function buildArenaSessionOpenPrompt(scenario: ArenaDynamicScenario) {
  return `פתח את השיחה עכשיו. אתה הלקוח.
הסיטואציה: ${scenario.situationLabel} — ${scenario.situation}
מצב רגשי: ${scenario.emotionalState}
פתח בטון: ${scenario.speechTone}
השראה לפתיחה (התאם טבעית): "${scenario.openingLine}"
התחל מיד. קצר. אנושי. לא מושלם.`;
}

export function sanitizeArenaDynamicScenario(
  input: unknown,
): ArenaDynamicScenario | null {
  if (!input || typeof input !== "object") return null;
  const raw = input as Partial<ArenaDynamicScenario>;
  if (typeof raw.id !== "string" || typeof raw.situation !== "string") {
    return null;
  }

  const number = (value: unknown, fallback: number) =>
    typeof value === "number" && value >= 1 && value <= 10 ? value : fallback;

  return {
    id: raw.id,
    situation: raw.situation,
    situationLabel: String(raw.situationLabel ?? "שיחה חיה"),
    emotionalState: String(raw.emotionalState ?? "סקפטי"),
    personality: String(raw.personality ?? "קשה"),
    personalityLabel: String(raw.personalityLabel ?? "לקוח קשה"),
    speechTone: String(raw.speechTone ?? "קצר"),
    openingLine: String(raw.openingLine ?? "כן? מי זה?"),
    pressure: number(raw.pressure, 6),
    irritability: number(raw.irritability, 6),
    skepticism: number(raw.skepticism, 6),
    patience: number(raw.patience, 4),
    energy: number(raw.energy, 6),
    chaosBehaviors: Array.isArray(raw.chaosBehaviors)
      ? raw.chaosBehaviors.filter((item) => typeof item === "string").slice(0, 5)
      : [],
    industryLabel: String(raw.industryLabel ?? "כללי"),
    industryObjections: Array.isArray(raw.industryObjections)
      ? raw.industryObjections.filter((item) => typeof item === "string").slice(0, 5)
      : [],
    saleContext: String(raw.saleContext ?? "שיחת מכירה"),
    weaknessFocus: Array.isArray(raw.weaknessFocus)
      ? raw.weaknessFocus.filter((item) => typeof item === "string").slice(0, 5)
      : [],
    difficultyLabel: String(raw.difficultyLabel ?? "רמה 3"),
  };
}

export function getScenarioDisplayTags(scenario: ArenaDynamicScenario) {
  return [
    scenario.situationLabel,
    scenario.personalityLabel,
    scenario.emotionalState,
    scenario.industryLabel,
  ];
}
