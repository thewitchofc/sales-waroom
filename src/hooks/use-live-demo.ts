"use client";

import { useEffect, useState, useCallback } from "react";
import {
  DEMO_TRANSCRIPT,
  COACH_FEEDBACK,
  COACHING_INSIGHTS,
  type TranscriptMessage,
  type CoachFeedback,
  type CoachingInsight,
} from "@/components/product/demo-data";

export type SimulationPhase = "connecting" | "live" | "analyzing" | "coaching" | "idle";

export interface DemoScores {
  confidence: number;
  objection: number;
  pressure: number;
}

export function useLiveDemo() {
  const [visibleMessages, setVisibleMessages] = useState<TranscriptMessage[]>([]);
  const [activeId, setActiveId] = useState<number | undefined>();
  const [isThinking, setIsThinking] = useState(false);
  const [phase, setPhase] = useState<SimulationPhase>("connecting");
  const [timelineIndex, setTimelineIndex] = useState(0);
  const [scores, setScores] = useState<DemoScores>({
    confidence: 91,
    objection: 88,
    pressure: 42,
  });
  const [visibleFeedback, setVisibleFeedback] = useState<CoachFeedback[]>([]);
  const [visibleInsights, setVisibleInsights] = useState<CoachingInsight[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeObjection, setActiveObjection] = useState<string | null>(null);

  const replayProgress = Math.min((elapsed / 104) * 100, 100);

  const advanceDemo = useCallback(() => {
    if (messageIndex >= DEMO_TRANSCRIPT.length) {
      setPhase("idle");
      setIsSpeaking(false);
      setTimeout(() => {
        setVisibleMessages([]);
        setVisibleFeedback([]);
        setVisibleInsights([]);
        setMessageIndex(0);
        setTimelineIndex(0);
        setScores({ confidence: 91, objection: 88, pressure: 42 });
        setElapsed(0);
        setActiveObjection(null);
        setPhase("connecting");
        setTimeout(() => setPhase("live"), 1200);
      }, 4000);
      return;
    }

    const msg = DEMO_TRANSCRIPT[messageIndex];
    const needsThinking = msg.type === "coach" || msg.type === "analysis";

    if (needsThinking) {
      setIsSpeaking(false);
      setIsThinking(true);
      setPhase(msg.type === "coach" ? "coaching" : "analyzing");

      setTimeout(() => {
        setIsThinking(false);
        setVisibleMessages((prev) => [...prev, msg]);
        setActiveId(msg.id);
        setIsSpeaking(msg.type === "prospect" || msg.type === "user");

        if (msg.type === "coach") {
          setVisibleFeedback((prev) => [...prev, COACH_FEEDBACK[0]]);
          setVisibleInsights((prev) => [...prev, COACHING_INSIGHTS[0]]);
          setScores((s) => ({ ...s, confidence: 74, objection: 62, pressure: 71 }));
          setTimelineIndex(3);
          setActiveObjection("מחיר");
          setPhase("live");
        }
        if (msg.type === "analysis") {
          setVisibleFeedback((prev) => {
            const next = [...prev];
            if (!next.find((f) => f.id === 2)) next.push(COACH_FEEDBACK[1]);
            if (!next.find((f) => f.id === 3)) next.push(COACH_FEEDBACK[2]);
            return next;
          });
          setVisibleInsights((prev) => [
            ...prev,
            COACHING_INSIGHTS[1],
            COACHING_INSIGHTS[2],
          ]);
          setScores({ confidence: 58, objection: 51, pressure: 89 });
          setTimelineIndex(5);
          setActiveObjection("איבוד פריים");
          setPhase("analyzing");
        }
        setMessageIndex((i) => i + 1);
      }, 1800);
    } else {
      setIsSpeaking(true);
      setPhase("live");
      setVisibleMessages((prev) => [...prev, msg]);
      setActiveId(msg.id);

      if (msg.id === 3) {
        setScores((s) => ({ ...s, pressure: 68, objection: 71 }));
        setTimelineIndex(2);
        setActiveObjection("מחיר");
      }
      if (msg.id === 6) {
        setTimelineIndex(4);
        setActiveObjection("סגירה מוקדמת");
      }
      setMessageIndex((i) => i + 1);

      setTimeout(() => setIsSpeaking(false), 1600);
    }
  }, [messageIndex]);

  useEffect(() => {
    const timer = setTimeout(() => setPhase("live"), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const delay = messageIndex === 0 ? 800 : 2800;
    const timeout = setTimeout(advanceDemo, delay);
    return () => clearTimeout(timeout);
  }, [advanceDemo, messageIndex]);

  const formatElapsed = () => {
    const m = Math.floor(elapsed / 60);
    const s = elapsed % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const waveformActive = isSpeaking || isThinking || phase === "live";

  return {
    visibleMessages,
    activeId,
    isThinking,
    isSpeaking,
    phase,
    timelineIndex,
    scores,
    visibleFeedback,
    visibleInsights,
    elapsed,
    replayProgress,
    formatElapsed,
    waveformActive,
    activeObjection,
  };
}

export type LiveDemoState = ReturnType<typeof useLiveDemo>;
