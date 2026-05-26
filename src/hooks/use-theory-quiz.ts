"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getQuestionsByCategory,
  shuffleQuestionOptions,
  shuffleQuestions,
  THEORY_QUIZ_SESSION_SIZE,
  type TheoryQuizCategory,
  type TheoryQuizQuestion,
} from "@/config/theory-quiz-data";

const STORAGE_KEY = "sales-waroom-theory-quiz";

export interface TheoryQuizProgress {
  answered: number;
  correct: number;
  bestScore: number;
  sessionsCompleted: number;
  lastScore: number | null;
}

export interface TheoryQuizSessionResult {
  score: number;
  total: number;
  correct: number;
  category: TheoryQuizCategory | "all";
}

const defaultProgress: TheoryQuizProgress = {
  answered: 0,
  correct: 0,
  bestScore: 0,
  sessionsCompleted: 0,
  lastScore: null,
};

function loadProgress(): TheoryQuizProgress {
  if (typeof window === "undefined") return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return defaultProgress;
  }
}

function saveProgress(progress: TheoryQuizProgress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function useTheoryQuiz(initialCategory: TheoryQuizCategory | "all" = "all") {
  const [category, setCategory] = useState<TheoryQuizCategory | "all">(
    initialCategory,
  );
  const [progress, setProgress] = useState<TheoryQuizProgress>(defaultProgress);
  const [questions, setQuestions] = useState<TheoryQuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionAnswers, setSessionAnswers] = useState<boolean[]>([]);
  const [phase, setPhase] = useState<"idle" | "active" | "summary">("idle");
  const [lastResult, setLastResult] = useState<TheoryQuizSessionResult | null>(
    null,
  );

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const currentQuestion = questions[currentIndex] ?? null;
  const totalInSession = questions.length;
  const answeredInSession = selectedIndex !== null ? currentIndex + 1 : currentIndex;
  const accuracy =
    progress.answered > 0
      ? Math.round((progress.correct / progress.answered) * 100)
      : 0;

  const startSession = useCallback(
    (nextCategory: TheoryQuizCategory | "all" = category) => {
      const pool = getQuestionsByCategory(nextCategory);
      const sessionQuestions = shuffleQuestions(pool)
        .slice(0, Math.min(THEORY_QUIZ_SESSION_SIZE, pool.length))
        .map(shuffleQuestionOptions);
      setCategory(nextCategory);
      setQuestions(sessionQuestions);
      setCurrentIndex(0);
      setSelectedIndex(null);
      setSessionCorrect(0);
      setSessionAnswers([]);
      setPhase("active");
      setLastResult(null);
    },
    [category],
  );

  const selectAnswer = useCallback(
    (optionIndex: number) => {
      if (!currentQuestion || selectedIndex !== null) return;

      setSelectedIndex(optionIndex);
      const isCorrect = optionIndex === currentQuestion.correctIndex;

      setProgress((prev) => {
        const next: TheoryQuizProgress = {
          ...prev,
          answered: prev.answered + 1,
          correct: prev.correct + (isCorrect ? 1 : 0),
        };
        saveProgress(next);
        return next;
      });

      if (isCorrect) {
        setSessionCorrect((prev) => prev + 1);
      }
      setSessionAnswers((prev) => [...prev, isCorrect]);
    },
    [currentQuestion, selectedIndex],
  );

  const goNext = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      const correctCount = sessionAnswers.filter(Boolean).length;
      const score = Math.round((correctCount / questions.length) * 100);
      const result: TheoryQuizSessionResult = {
        score,
        total: questions.length,
        correct: correctCount,
        category,
      };

      setProgress((prev) => {
        const next: TheoryQuizProgress = {
          ...prev,
          bestScore: Math.max(prev.bestScore, score),
          sessionsCompleted: prev.sessionsCompleted + 1,
          lastScore: score,
        };
        saveProgress(next);
        return next;
      });

      setLastResult(result);
      setPhase("summary");
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedIndex(null);
  }, [category, currentIndex, questions.length, sessionAnswers]);

  const resetToIdle = useCallback(() => {
    setPhase("idle");
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedIndex(null);
    setSessionCorrect(0);
  }, []);

  const sessionProgress = useMemo(() => {
    if (phase !== "active" || totalInSession === 0) return 0;
    const base = selectedIndex !== null ? currentIndex + 1 : currentIndex;
    return Math.round((base / totalInSession) * 100);
  }, [phase, totalInSession, selectedIndex, currentIndex]);

  return {
    category,
    setCategory,
    progress,
    accuracy,
    phase,
    questions,
    currentQuestion,
    currentIndex,
    totalInSession,
    answeredInSession,
    selectedIndex,
    sessionCorrect,
    sessionProgress,
    lastResult,
    startSession,
    selectAnswer,
    goNext,
    resetToIdle,
  };
}
