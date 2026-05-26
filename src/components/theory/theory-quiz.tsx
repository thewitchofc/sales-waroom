"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  THEORY_QUIZ_CATEGORY_LABELS,
  THEORY_QUIZ_OPTION_LABELS,
  THEORY_QUIZ_QUESTIONS,
  THEORY_QUIZ_SESSION_SIZE,
  type TheoryQuizCategory,
} from "@/config/theory-quiz-data";
import { useTheoryQuiz } from "@/hooks/use-theory-quiz";
import { BrandButton } from "@/components/brand/brand-button";
import { cn } from "@/lib/utils";

const categories = Object.keys(
  THEORY_QUIZ_CATEGORY_LABELS,
) as TheoryQuizCategory[];

interface TheoryQuizProps {
  compact?: boolean;
  defaultCategory?: TheoryQuizCategory | "all";
  showIntro?: boolean;
}

export function TheoryQuiz({
  compact = false,
  defaultCategory = "all",
  showIntro = true,
}: TheoryQuizProps) {
  const quiz = useTheoryQuiz(defaultCategory);

  return (
    <div
      className={cn(
        "relative",
        compact ? "space-y-6" : "mx-auto max-w-3xl space-y-8",
      )}
    >
      {showIntro && quiz.phase === "idle" && (
        <header className={cn("space-y-3", compact ? "text-center" : "")}>
          {!compact && (
            <p className="font-brand text-[10px] tracking-[0.2em] text-accent">
              מבחן תיאוריה
            </p>
          )}
          <h2
            className={cn(
              "font-display font-black text-white",
              compact ? "text-2xl" : "text-3xl sm:text-4xl",
            )}
          >
            {compact ? "שאלון אמריקאי" : "תשובות אמריקאיות. ציון. חזרה עד שזוכרים."}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {compact
              ? "4 תשובות, משוב מיידי, ללא הגבלה. זמין בכל החבילות."
              : "בחרו נושא, ענו על 10 שאלות, קבלו הסבר אחרי כל תשובה. חוזרים עד שהידע נשאר."}
          </p>
        </header>
      )}

      {quiz.phase === "idle" && (
        <IdlePanel quiz={quiz} compact={compact} />
      )}

      {quiz.phase === "active" && quiz.currentQuestion && (
        <ActivePanel quiz={quiz} compact={compact} />
      )}

      {quiz.phase === "summary" && quiz.lastResult && (
        <SummaryPanel quiz={quiz} compact={compact} />
      )}
    </div>
  );
}

function StatBlock({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="border border-white/10 bg-black/40 px-4 py-3 text-center">
      <p className="font-brand text-[8px] tracking-[0.14em] text-white/40">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 font-display text-xl font-bold",
          accent ? "text-accent" : "text-white",
        )}
      >
        {value}
      </p>
    </div>
  );
}

function IdlePanel({
  quiz,
  compact,
}: {
  quiz: ReturnType<typeof useTheoryQuiz>;
  compact?: boolean;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatBlock label="שאלות במאגר" value={String(THEORY_QUIZ_QUESTIONS.length)} />
        <StatBlock label="נענו" value={String(quiz.progress.answered)} />
        <StatBlock label="דיוק כולל" value={`${quiz.accuracy}%`} />
        <StatBlock
          label="שיא"
          value={`${quiz.progress.bestScore}%`}
          accent
        />
      </div>

      <div className="space-y-3">
        <p className="font-brand text-[9px] tracking-[0.14em] text-white/45">
          בחר נושא
        </p>
        <div className="flex flex-wrap gap-2">
          <CategoryChip
            active={quiz.category === "all"}
            onClick={() => quiz.setCategory("all")}
          >
            הכל
          </CategoryChip>
          {categories.map((cat) => (
            <CategoryChip
              key={cat}
              active={quiz.category === cat}
              onClick={() => quiz.setCategory(cat)}
            >
              {THEORY_QUIZ_CATEGORY_LABELS[cat].label}
            </CategoryChip>
          ))}
        </div>
        {quiz.category !== "all" && (
          <p className="text-xs text-muted-foreground">
            {THEORY_QUIZ_CATEGORY_LABELS[quiz.category].description}
          </p>
        )}
      </div>

      <div className={cn("flex gap-3", compact ? "justify-center" : "")}>
        <BrandButton
          variant="command"
          size={compact ? "md" : "lg"}
          onClick={() => quiz.startSession(quiz.category)}
        >
          התחלת סבב ({THEORY_QUIZ_SESSION_SIZE} שאלות)
        </BrandButton>
      </div>
    </div>
  );
}

function CategoryChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "border px-3 py-1.5 font-brand text-[9px] tracking-[0.1em] transition-colors",
        active
          ? "border-accent/40 bg-accent/10 text-accent"
          : "border-white/10 bg-black/30 text-white/50 hover:border-white/20 hover:text-white/75",
      )}
    >
      {children}
    </button>
  );
}

function ActivePanel({
  quiz,
  compact,
}: {
  quiz: ReturnType<typeof useTheoryQuiz>;
  compact?: boolean;
}) {
  const q = quiz.currentQuestion!;
  const answered = quiz.selectedIndex !== null;
  const categoryLabel =
    quiz.category === "all"
      ? THEORY_QUIZ_CATEGORY_LABELS[q.category].label
      : THEORY_QUIZ_CATEGORY_LABELS[quiz.category].label;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-brand text-[9px] tracking-[0.14em] text-accent">
            {categoryLabel}. שאלה {quiz.currentIndex + 1} מתוך{" "}
            {quiz.totalInSession}
          </span>
          <span className="font-brand text-[9px] text-white/40">
            נכון בסבב: {quiz.sessionCorrect}
          </span>
        </div>
        <div className="h-1 overflow-hidden bg-white/5">
          <motion.div
            className="h-full bg-accent/70"
            initial={{ width: 0 }}
            animate={{ width: `${quiz.sessionProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="border border-white/10 bg-black/50 p-5 sm:p-6">
        {q.context && (
          <p className="mb-4 border-s-2 border-white/10 ps-4 text-sm italic text-white/55">
            {q.context}
          </p>
        )}
        <h3 className="font-display text-lg font-bold leading-relaxed text-white sm:text-xl">
          {q.prompt}
        </h3>
      </div>

      <div className="grid gap-2 sm:gap-3">
        {q.options.map((option, index) => {
          const isSelected = quiz.selectedIndex === index;
          const isCorrect = index === q.correctIndex;
          let state: "default" | "correct" | "wrong" | "missed" = "default";

          if (answered) {
            if (isCorrect) state = "correct";
            else if (isSelected) state = "wrong";
            else if (!isSelected && !isCorrect) state = "missed";
          }

          return (
            <button
              key={option}
              type="button"
              disabled={answered}
              onClick={() => quiz.selectAnswer(index)}
              className={cn(
                "flex w-full items-start gap-3 border px-4 py-3.5 text-start text-sm transition-colors",
                state === "default" &&
                  "border-white/10 bg-black/30 text-white/85 hover:border-accent/25 hover:bg-accent/5",
                state === "correct" &&
                  "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
                state === "wrong" &&
                  "border-red-500/40 bg-red-500/10 text-red-200",
                state === "missed" && answered && "border-white/5 opacity-45",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex size-6 shrink-0 items-center justify-center font-brand text-[10px]",
                  state === "correct" && "bg-emerald-500/20 text-emerald-300",
                  state === "wrong" && "bg-red-500/20 text-red-300",
                  state === "default" && "border border-white/15 text-white/50",
                )}
              >
                {THEORY_QUIZ_OPTION_LABELS[index]}
              </span>
              <span className="leading-relaxed">{option}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              "border p-4 sm:p-5",
              quiz.selectedIndex === q.correctIndex
                ? "border-emerald-500/25 bg-emerald-500/5"
                : "border-red-500/25 bg-red-500/5",
            )}
          >
            <p className="font-brand text-[9px] tracking-[0.12em] text-white/45">
              {quiz.selectedIndex === q.correctIndex ? "נכון" : "לא נכון"}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              {q.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {answered && (
        <div className={cn("flex gap-3", compact ? "justify-center" : "")}>
          <BrandButton variant="command" onClick={quiz.goNext}>
            {quiz.currentIndex + 1 >= quiz.totalInSession
              ? "סיום וציון"
              : "השאלה הבאה"}
          </BrandButton>
        </div>
      )}
    </div>
  );
}

function SummaryPanel({
  quiz,
  compact,
}: {
  quiz: ReturnType<typeof useTheoryQuiz>;
  compact?: boolean;
}) {
  const result = quiz.lastResult!;
  const passed = result.score >= 70;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div
        className={cn(
          "border p-6 text-center sm:p-8",
          passed
            ? "border-accent/30 bg-accent/5"
            : "border-white/10 bg-black/50",
        )}
      >
        <p className="font-brand text-[9px] tracking-[0.16em] text-white/45">
          ציון הסבב
        </p>
        <p
          className={cn(
            "mt-3 font-display text-5xl font-black sm:text-6xl",
            passed ? "text-accent" : "text-white",
          )}
        >
          {result.score}%
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          {result.correct} נכונות מתוך {result.total}
        </p>
        <p className="mt-4 text-sm text-white/70">
          {passed
            ? "המשיכו לסבב נוסף עד שהתשובות יוצאות בלי לחשוב."
            : "חזרו על הנושאים שטעיתם. כל סבב מערבב שאלות מחדש."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatBlock label="שיא אישי" value={`${quiz.progress.bestScore}%`} accent />
        <StatBlock label="סבבים" value={String(quiz.progress.sessionsCompleted)} />
        <StatBlock label="דיוק כולל" value={`${quiz.accuracy}%`} />
      </div>

      <div className={cn("flex flex-wrap gap-3", compact ? "justify-center" : "")}>
        <BrandButton
          variant="command"
          onClick={() => quiz.startSession(quiz.category)}
        >
          סבב נוסף
        </BrandButton>
        <BrandButton variant="secondary" onClick={quiz.resetToIdle}>
          חזרה לנושאים
        </BrandButton>
      </div>
    </motion.div>
  );
}
