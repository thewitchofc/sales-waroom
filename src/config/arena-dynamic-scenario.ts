import type { ArenaSimulationLevel } from "@/config/arena-simulation-prompt";
import { ARENA_SIMULATION_LEVELS } from "@/config/arena-simulation-prompt";
import {
  TRAINING_INDUSTRY_OPTIONS,
  TRAINING_SALE_TYPE_OPTIONS,
  TRAINING_WEAKNESS_OPTIONS,
  type TrainingWeakness,
  type UserTrainingProfile,
} from "@/config/user-training-profile";

export interface ArenaDifficultyLayer {
  level: ArenaSimulationLevel;
  label: string;
  styleLabel: string;
  styleDescription: string;
  objectionLevel: number;
  pressure: number;
  control: number;
  sophistication: number;
  manipulation: number;
  speechSpeed: number;
  interruptions: number;
  patience: number;
  behaviors: string[];
  openingTone: string;
}

export interface ArenaSituationLayer {
  situation: string;
  situationLabel: string;
  environment: string;
  mood: string;
  availability: number;
  energy: number;
  situationalOpening: string;
  chaosBehaviors: string[];
}

export interface ArenaDynamicScenario {
  id: string;
  level: ArenaSimulationLevel;
  difficultyLabel: string;
  difficulty: ArenaDifficultyLayer;
  situationLayer: ArenaSituationLayer;
  openingLine: string;
  industryLabel: string;
  industryObjections: string[];
  saleContext: string;
  weaknessFocus: string[];
}

const SITUATIONS = [
  {
    id: "garage",
    label: "באמצע מוסך",
    context: "אתה במוסך, רעש של כלים, לא באמת יכול לדבר.",
    environment: "רעש כלים, מכונית על הרampa, מוסך עמוס.",
    moods: ["עצבני מהרעש", "ממהר לסיים", "מוסח ולא מתרכז"],
    availability: { min: 2, max: 4 },
    energy: { min: 4, max: 7 },
    openings: [
      "רגע— אני במוסך, דבר מהר.",
      "שומע? יש פה רעש, מה אתה רוצה?",
      "שנייה, אני באמצע תיקון.",
    ],
  },
  {
    id: "kids",
    label: "ילדים בבית",
    context: "ילדים צורחים ברקע, אתה מושך את הטלפון.",
    environment: "ילדים צורחים, בית רועש, מולטי-טאסקינג.",
    moods: ["מוסח", "עייף", "לחוץ מהרעש בבית"],
    availability: { min: 2, max: 5 },
    energy: { min: 3, max: 6 },
    openings: [
      "רגע שנייה הילדים פה צורחים.",
      "שמע, יש פה בלגן— מה?",
      "תדבר מהר, אין לי שקט פה.",
    ],
  },
  {
    id: "driving",
    label: "באמצע נהיגה",
    context: "אתה נוהג, חצי תשומת לב.",
    environment: "על הכביש, תשומת לב מפוצלת.",
    moods: ["ממהר", "מוסח", "לחוץ בזמן"],
    availability: { min: 1, max: 3 },
    energy: { min: 5, max: 8 },
    openings: [
      "רגע— אני נוהג.",
      "כן? תדבר מהר, אני על הכביש.",
      "שנייה, יש לי יציאה.",
    ],
  },
  {
    id: "shopping",
    label: "באמצע קניות",
    context: "אתה בתור בקופה או בסופר.",
    environment: "תור, עגלת קניות, אנשים מסביב.",
    moods: ["עסוק", "מהיר", "ממורמר מהתור"],
    availability: { min: 3, max: 6 },
    energy: { min: 4, max: 7 },
    openings: [
      "אני באמצע קופה— דבר מהר.",
      "רגע, אני בתור, מה?",
      "כן? יש לי דקה.",
    ],
  },
  {
    id: "work",
    label: "באמצע עבודה",
    context: "באמצע יום עבודה עמוס.",
    environment: "משרד/עבודה, קולleagues, מיילים פתוחים.",
    moods: ["עסוק", "ממוקד", "חשדן לגבי הפרעה"],
    availability: { min: 2, max: 5 },
    energy: { min: 5, max: 8 },
    openings: [
      "אני בעבודה, מה אתה רוצה?",
      "יש לי דקה— דבר.",
      "כן? אני באמצע משהו.",
    ],
  },
  {
    id: "tired",
    label: "עייף/עייפה",
    context: "סוף יום ארוך, אין כוח לשיחות.",
    environment: "בבית אחרי יום ארוך, על הספה או במיטה.",
    moods: ["עייף", "אדיש", "רוצה לנוח"],
    availability: { min: 4, max: 7 },
    energy: { min: 2, max: 4 },
    openings: [
      "...כן? מי זה?",
      "שמע, יום ארוך. מה?",
      "רגע, לא בזמן הכי טוב.",
    ],
  },
  {
    id: "stressed",
    label: "לחוץ/לחוצה בזמן",
    context: "יש לך פגישה בעוד כמה דקות.",
    environment: "ספירה לאחור לפגישה, שעון לוחץ.",
    moods: ["לחוץ", "מהיר", "חסר סבלנות לזמן"],
    availability: { min: 2, max: 4 },
    energy: { min: 6, max: 9 },
    openings: [
      "תקשיב יש לי בדיוק דקה.",
      "יש לי פגישה עוד 5 דקות— דבר.",
      "מהר, אין לי זמן.",
    ],
  },
  {
    id: "home_quiet",
    label: "בבית בשקט",
    context: "שיחה לא צפויה בבית.",
    environment: "בבית, שקט יחסי, לא ציפית לשיחה.",
    moods: ["מופתע", "חשדן", "לא בטוח למה מתקשרים"],
    availability: { min: 5, max: 8 },
    energy: { min: 4, max: 6 },
    openings: [
      "מאיפה יש לכם את המספר שלי?",
      "כן? מי זה?",
      "לא בטוח שביקשתי שיחזרו אליי.",
    ],
  },
] as const;

const SITUATIONAL_CHAOS = [
  "הזכר את הסביבה — רעש, תור, ילדים, נהיגה, עבודה",
  "הראה שאתה לא 100% פנוי — 'רגע', 'שנייה', 'תחזור על זה'",
  "ענה לפעמים במילה אחת כי אתה עסוק",
  "שתיקה קצרה — '...מממ', '...רגע'",
  "בלבול רגעי — 'על מה מדובר?'",
  "אל תהיה מושלם — תגובות לא מלוטשות",
] as const;

const DIFFICULTY_CONFIG: Record<
  ArenaSimulationLevel,
  {
    styleLabel: string;
    styleDescription: string;
    openingTone: string;
    openings: string[];
    behaviors: string[];
    traits: {
      objectionLevel: { min: number; max: number };
      pressure: { min: number; max: number };
      control: { min: number; max: number };
      sophistication: { min: number; max: number };
      manipulation: { min: number; max: number };
      speechSpeed: { min: number; max: number };
      interruptions: { min: number; max: number };
      patience: { min: number; max: number };
    };
  }
> = {
  entry: {
    styleLabel: "מנומס אבל סקפטי",
    styleDescription:
      "עדיין מקשיב, לא אגרסивי. התנגדויות קלות. לא שולט בשיחה — אבל גם לא נכנע מהר.",
    openingTone: "מנומס, קצר, סקפטי — לא תוקפני",
    openings: [
      "כן? מי זה?",
      "שלום, על מה השיחה?",
      "רגע, ספרו לי בקצרה.",
      "כן, יש לי רגע.",
    ],
    behaviors: [
      "התנגדויות קלות — 'צריך לחשוב', 'יקר לי'",
      "לא מניפולציה — שאל שאלות פשוטות",
      "עדיין נותן מרחב לנציג לדבר",
      "לא קוטע באגרסיביות",
    ],
    traits: {
      objectionLevel: { min: 2, max: 4 },
      pressure: { min: 2, max: 4 },
      control: { min: 2, max: 4 },
      sophistication: { min: 2, max: 4 },
      manipulation: { min: 1, max: 3 },
      speechSpeed: { min: 3, max: 5 },
      interruptions: { min: 1, max: 3 },
      patience: { min: 6, max: 9 },
    },
  },
  medium: {
    styleLabel: "לחץ בינוני",
    styleDescription:
      "פחות סבלנות, מתנגד יותר, מתחיל לבדוק. מפריע לפעמים.",
    openingTone: "ישיר, לא סבלני, לא מנומס מדי",
    openings: [
      "כן? מה אתה רוצה?",
      "יש לי דקה— דבר.",
      "שמע, מה זה?",
      "לא תפסו אותי בזמן הכי טוב.",
    ],
    behaviors: [
      "התנגדויות ברורות — מחיר, זמן, 'תשלחי פרטים'",
      "קוטע לפעמים — 'רגע', 'מה?'",
      "בודק אם הנציג מוביל או נמאס",
      "מעלה התנגדות כל 2-3 תורות",
    ],
    traits: {
      objectionLevel: { min: 4, max: 6 },
      pressure: { min: 4, max: 6 },
      control: { min: 4, max: 6 },
      sophistication: { min: 4, max: 6 },
      manipulation: { min: 3, max: 5 },
      speechSpeed: { min: 5, max: 7 },
      interruptions: { min: 3, max: 5 },
      patience: { min: 4, max: 6 },
    },
  },
  hard: {
    styleLabel: "אגרסיבי וחד",
    styleDescription:
      "קצר רוח, בודק פריים, שולט בשיחה, חשדן, לא נותן לנציג להוביל בקלות.",
    openingTone: "חד, לחוץ, בודק גבולות מהשנייה הראשונה",
    openings: [
      "אני עסוק, מה אתה רוצה?",
      "שמע, יש לי שתי דקות וזהו.",
      "עוד שיחת מכירה? רציני?",
      "אם זאת מכירה— תדבר מהר.",
    ],
    behaviors: [
      "שולט בקצב — 'לא, רגע', 'עצור'",
      "התנגדויות חזקות — מחיר, מתחרים, אמון",
      "מניפולציה קלה — 'יש לי הצעה אחרת', 'אין לי זמן'",
      "קוטע באמצע אם הנציג מפשט",
    ],
    traits: {
      objectionLevel: { min: 6, max: 8 },
      pressure: { min: 6, max: 8 },
      control: { min: 6, max: 8 },
      sophistication: { min: 6, max: 8 },
      manipulation: { min: 5, max: 7 },
      speechSpeed: { min: 6, max: 8 },
      interruptions: { min: 5, max: 7 },
      patience: { min: 2, max: 4 },
    },
  },
  elite: {
    styleLabel: "עילית — cynical ואפס סבלנות",
    styleDescription:
      "מתנגד לכל דבר, מניפולטיבי, חד, ציני, בודק גבולות ומחויבות. שולט בשיחה לגמרי.",
    openingTone: "עצבני/ציני, אפס סבלנות, על הגנתי",
    openings: [
      "הלוווו מי זה עכשיו??",
      "אם זאת שיחת מכירה אני מנתק.",
      "מאיפה יש לכם את המספר שלי?",
      "עוד אחד? תן לי סיבה שלא לנתק.",
    ],
    behaviors: [
      "מתנגד לכל דבר — גם כשיש ערך",
      "מניפולציה פסיכולוגית — guilt, comparison, fake urgency reversal",
      "קוטע כל הזמן, משנה נושא, ציני",
      "בודק מחויבות — 'תשלח PDF' כמלכודת",
      "אפס סבלנות — ניתוק אם הנציג נחלש",
    ],
    traits: {
      objectionLevel: { min: 8, max: 10 },
      pressure: { min: 8, max: 10 },
      control: { min: 8, max: 10 },
      sophistication: { min: 8, max: 10 },
      manipulation: { min: 7, max: 10 },
      speechSpeed: { min: 7, max: 10 },
      interruptions: { min: 7, max: 10 },
      patience: { min: 1, max: 3 },
    },
  },
};

const EXPERIENCE_NUDGE: Record<UserTrainingProfile["experienceLevel"], number> = {
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

function scaleDifficultyTrait(
  range: { min: number; max: number },
  experienceLevel: UserTrainingProfile["experienceLevel"],
  invertNudge = false,
) {
  const nudge = invertNudge
    ? -EXPERIENCE_NUDGE[experienceLevel]
    : EXPERIENCE_NUDGE[experienceLevel];
  const min = clamp(range.min + nudge, 1, 10);
  const max = clamp(range.max + nudge, min, 10);
  return randomInt(min, max);
}

function buildDifficultyLayer(
  level: ArenaSimulationLevel,
  profile: UserTrainingProfile,
): ArenaDifficultyLayer {
  const config = DIFFICULTY_CONFIG[level];
  const meta = ARENA_SIMULATION_LEVELS[level];

  return {
    level,
    label: meta.label,
    styleLabel: config.styleLabel,
    styleDescription: config.styleDescription,
    objectionLevel: scaleDifficultyTrait(
      config.traits.objectionLevel,
      profile.experienceLevel,
    ),
    pressure: scaleDifficultyTrait(config.traits.pressure, profile.experienceLevel),
    control: scaleDifficultyTrait(config.traits.control, profile.experienceLevel),
    sophistication: scaleDifficultyTrait(
      config.traits.sophistication,
      profile.experienceLevel,
    ),
    manipulation: scaleDifficultyTrait(
      config.traits.manipulation,
      profile.experienceLevel,
    ),
    speechSpeed: scaleDifficultyTrait(
      config.traits.speechSpeed,
      profile.experienceLevel,
    ),
    interruptions: scaleDifficultyTrait(
      config.traits.interruptions,
      profile.experienceLevel,
    ),
    patience: scaleDifficultyTrait(
      config.traits.patience,
      profile.experienceLevel,
      true,
    ),
    behaviors: [...config.behaviors],
    openingTone: config.openingTone,
  };
}

function buildSituationLayer(): ArenaSituationLayer {
  const situation = pickRandom(SITUATIONS);

  return {
    situation: situation.context,
    situationLabel: situation.label,
    environment: situation.environment,
    mood: pickRandom(situation.moods),
    availability: randomInt(situation.availability.min, situation.availability.max),
    energy: randomInt(situation.energy.min, situation.energy.max),
    situationalOpening: pickRandom(situation.openings),
    chaosBehaviors: pickRandomMany(SITUATIONAL_CHAOS, 2),
  };
}

function buildCombinedOpening(
  level: ArenaSimulationLevel,
  situationLayer: ArenaSituationLayer,
): string {
  const difficultyOpening = pickRandom(DIFFICULTY_CONFIG[level].openings);
  return `${situationLayer.situationalOpening} / ${difficultyOpening}`;
}

function buildWeaknessFocus(profile: UserTrainingProfile) {
  const selected =
    profile.weaknesses.length > 0
      ? profile.weaknesses
      : (["objections", "authority"] as TrainingWeakness[]);

  return selected.map((weakness) => TRAINING_WEAKNESS_OPTIONS[weakness].coachFocus);
}

function getDifficultyExample(
  level: ArenaSimulationLevel,
  situationLabel: string,
): string {
  const examples: Record<ArenaSimulationLevel, string> = {
    entry: `רמה 1 + ${situationLabel} = לקוח מנומס אבל סקפטי, עדיין מקשיב.`,
    medium: `רמה 2 + ${situationLabel} = לקוח עם הפרעות מהסביבה + לחץ בינוני.`,
    hard: `רמה 3 + ${situationLabel} = לקוח חשדן שמנסה לשלוט בשיחה.`,
    elite: `עילית + ${situationLabel} = לקוח עצבני עם אפס סבלנות שמתנגד לכל דבר.`,
  };
  return examples[level];
}

export function generateArenaDynamicScenario({
  level,
  profile,
}: {
  level: ArenaSimulationLevel;
  profile: UserTrainingProfile;
}): ArenaDynamicScenario {
  const difficulty = buildDifficultyLayer(level, profile);
  const situationLayer = buildSituationLayer();
  const industry = TRAINING_INDUSTRY_OPTIONS[profile.industry];
  const sale = TRAINING_SALE_TYPE_OPTIONS[profile.saleType];

  return {
    id: `scenario-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    level,
    difficultyLabel: `${difficulty.label} · ${difficulty.styleLabel}`,
    difficulty,
    situationLayer,
    openingLine: buildCombinedOpening(level, situationLayer),
    industryLabel: industry.label,
    industryObjections: pickRandomMany(industry.objections, 3),
    saleContext: sale.callContext,
    weaknessFocus: buildWeaknessFocus(profile),
  };
}

export function buildArenaScenarioPrompt(
  scenario: ArenaDynamicScenario,
  profile: UserTrainingProfile,
) {
  const industry = TRAINING_INDUSTRY_OPTIONS[profile.industry];
  const { difficulty, situationLayer } = scenario;

  return `LIVE SCENARIO — two independent layers. Combine them. Never ignore the user's chosen difficulty level.

=== LAYER 1: DIFFICULTY (user chose ${difficulty.label}) ===
This controls HOW hard the customer fights — professional sales resistance.
Style: ${difficulty.styleLabel} — ${difficulty.styleDescription}
Opening tone: ${difficulty.openingTone}

Difficulty traits (1-10):
- objection level: ${difficulty.objectionLevel}
- pressure on salesperson: ${difficulty.pressure}
- conversation control: ${difficulty.control}
- sophistication: ${difficulty.sophistication}
- manipulation: ${difficulty.manipulation}
- speech speed (higher = shorter/faster): ${difficulty.speechSpeed}
- interruptions (higher = more cuts): ${difficulty.interruptions}
- patience (higher = more patient): ${difficulty.patience}

Difficulty behaviors:
${difficulty.behaviors.map((item) => `- ${item}`).join("\n")}

Example blend: ${getDifficultyExample(scenario.level, situationLayer.situationLabel)}

=== LAYER 2: SITUATION (random chaos — where/what/mood) ===
This controls WHERE the customer is and human mess — NOT how skilled they are at resisting.
Location: ${situationLayer.situationLabel} — ${situationLayer.situation}
Environment: ${situationLayer.environment}
Mood (situational): ${situationLayer.mood}
Availability/distraction (1-10, lower = less available): ${situationLayer.availability}
Energy (situational): ${situationLayer.energy}

Situational chaos:
${situationLayer.chaosBehaviors.map((item) => `- ${item}`).join("\n")}

=== CONTEXT ===
Call: ${scenario.saleContext}
Industry: ${scenario.industryLabel}
Buyer mindset: ${industry.buyerMindset}

Industry objections (weave naturally):
${scenario.industryObjections.map((item) => `- ${item}`).join("\n")}

Exploit salesperson weaknesses if shown:
${scenario.weaknessFocus.map((item) => `- ${item}`).join("\n")}

Opening inspiration (adapt — merge situation + difficulty tone):
"${scenario.openingLine}"

Rules:
- Difficulty level ALWAYS wins for objection strength, control, manipulation, patience.
- Situation ALWAYS wins for environment, distraction, mood, energy.
- Same location can feel easy or brutal depending on difficulty — both layers must show.
- Sound like a real Israeli on the phone. Never repeat phrasing. Never sound like a bot.`;
}

export function buildArenaSessionOpenPrompt(scenario: ArenaDynamicScenario) {
  const { difficulty, situationLayer } = scenario;

  return `פתח את השיחה עכשיו. אתה הלקוח.

רמת קושי (חובה): ${difficulty.label} — ${difficulty.styleLabel}
סיטואציה (רנדומלית): ${situationLayer.situationLabel} — ${situationLayer.situation}
מצב רוח מהסיטואציה: ${situationLayer.mood}
טון פתיחה לפי קושי: ${difficulty.openingTone}
השראה לפתיחה: "${scenario.openingLine}"

התחל מיד. שילוב של קושי מקצועי + כאוס אנושי. קצר. לא מושלם.`;
}

function number(value: unknown, fallback: number) {
  return typeof value === "number" && value >= 1 && value <= 10 ? value : fallback;
}

function sanitizeDifficultyLayer(
  raw: Partial<ArenaDifficultyLayer> | undefined,
  level: ArenaSimulationLevel,
): ArenaDifficultyLayer {
  const defaults = buildDifficultyLayer(level, {
    industry: "general",
    experienceLevel: "intermediate",
    saleType: "b2c_phone",
    weaknesses: [],
  });

  if (!raw) return defaults;

  return {
    level,
    label: String(raw.label ?? defaults.label),
    styleLabel: String(raw.styleLabel ?? defaults.styleLabel),
    styleDescription: String(raw.styleDescription ?? defaults.styleDescription),
    objectionLevel: number(raw.objectionLevel, defaults.objectionLevel),
    pressure: number(raw.pressure, defaults.pressure),
    control: number(raw.control, defaults.control),
    sophistication: number(raw.sophistication, defaults.sophistication),
    manipulation: number(raw.manipulation, defaults.manipulation),
    speechSpeed: number(raw.speechSpeed, defaults.speechSpeed),
    interruptions: number(raw.interruptions, defaults.interruptions),
    patience: number(raw.patience, defaults.patience),
    behaviors: Array.isArray(raw.behaviors)
      ? raw.behaviors.filter((item) => typeof item === "string")
      : defaults.behaviors,
    openingTone: String(raw.openingTone ?? defaults.openingTone),
  };
}

function sanitizeSituationLayer(
  raw: Partial<ArenaSituationLayer> | undefined,
): ArenaSituationLayer {
  const fallback = buildSituationLayer();

  if (!raw) return fallback;

  return {
    situation: String(raw.situation ?? fallback.situation),
    situationLabel: String(raw.situationLabel ?? fallback.situationLabel),
    environment: String(raw.environment ?? fallback.environment),
    mood: String(raw.mood ?? fallback.mood),
    availability: number(raw.availability, fallback.availability),
    energy: number(raw.energy, fallback.energy),
    situationalOpening: String(
      raw.situationalOpening ?? fallback.situationalOpening,
    ),
    chaosBehaviors: Array.isArray(raw.chaosBehaviors)
      ? raw.chaosBehaviors.filter((item) => typeof item === "string").slice(0, 5)
      : fallback.chaosBehaviors,
  };
}

export function sanitizeArenaDynamicScenario(
  input: unknown,
  fallbackLevel: ArenaSimulationLevel = "hard",
): ArenaDynamicScenario | null {
  if (!input || typeof input !== "object") return null;
  const raw = input as Partial<ArenaDynamicScenario> & {
    situation?: string;
    situationLabel?: string;
    pressure?: number;
    patience?: number;
    emotionalState?: string;
    energy?: number;
  };

  const level =
    raw.level && raw.level in ARENA_SIMULATION_LEVELS
      ? raw.level
      : fallbackLevel;

  if (raw.difficulty && raw.situationLayer && typeof raw.id === "string") {
    return {
      id: raw.id,
      level,
      difficultyLabel: String(
        raw.difficultyLabel ?? ARENA_SIMULATION_LEVELS[level].label,
      ),
      difficulty: sanitizeDifficultyLayer(raw.difficulty, level),
      situationLayer: sanitizeSituationLayer(raw.situationLayer),
      openingLine: String(raw.openingLine ?? "כן? מי זה?"),
      industryLabel: String(raw.industryLabel ?? "כללי"),
      industryObjections: Array.isArray(raw.industryObjections)
        ? raw.industryObjections.filter((item) => typeof item === "string")
        : [],
      saleContext: String(raw.saleContext ?? "שיחת מכירה"),
      weaknessFocus: Array.isArray(raw.weaknessFocus)
        ? raw.weaknessFocus.filter((item) => typeof item === "string")
        : [],
    };
  }

  if (typeof raw.id !== "string" || typeof raw.situation !== "string") {
    return null;
  }

  return {
    id: raw.id,
    level,
    difficultyLabel: String(raw.difficultyLabel ?? ARENA_SIMULATION_LEVELS[level].label),
    difficulty: sanitizeDifficultyLayer(
      { pressure: raw.pressure, patience: raw.patience },
      level,
    ),
    situationLayer: sanitizeSituationLayer({
      situation: raw.situation,
      situationLabel: raw.situationLabel,
      mood: raw.emotionalState,
      energy: raw.energy,
    }),
    openingLine: String(raw.openingLine ?? "כן? מי זה?"),
    industryLabel: String(raw.industryLabel ?? "כללי"),
    industryObjections: Array.isArray(raw.industryObjections)
      ? raw.industryObjections.filter((item) => typeof item === "string")
      : [],
    saleContext: String(raw.saleContext ?? "שיחת מכירה"),
    weaknessFocus: Array.isArray(raw.weaknessFocus)
      ? raw.weaknessFocus.filter((item) => typeof item === "string")
      : [],
  };
}

export function getScenarioDisplayTags(scenario: ArenaDynamicScenario) {
  return [
    scenario.difficulty.label,
    scenario.situationLayer.situationLabel,
    scenario.situationLayer.mood,
    scenario.industryLabel,
  ];
}
