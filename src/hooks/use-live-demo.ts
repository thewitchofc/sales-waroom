"use client";

import { useEffect, useState, useCallback } from "react";
import {
  DEMO_TRANSCRIPT,
  COACH_FEEDBACK,
  COACHING_INSIGHTS,
  INITIAL_PSYCHOLOGY_SCORES,
  ACTIVE_PERSONA,
  PRESSURE_LEVELS,
  type TranscriptMessage,
  type CoachFeedback,
  type CoachingInsight,
  type PsychologyScores,
  type BehaviorMode,
  type ClientPersona,
  type PressureLevel,
} from "@/components/product/demo-data";

export type SimulationPhase = "connecting" | "live" | "analyzing" | "coaching" | "idle";

export type DemoScores = PsychologyScores;

const INITIAL_PRESSURE = PRESSURE_LEVELS.find((p) => p.code === "INTENSE") ?? PRESSURE_LEVELS[3];

export function useLiveDemo() {
  const [visibleMessages, setVisibleMessages] = useState<TranscriptMessage[]>([]);
  const [activeId, setActiveId] = useState<number | undefined>();
  const [isThinking, setIsThinking] = useState(false);
  const [phase, setPhase] = useState<SimulationPhase>("connecting");
  const [timelineIndex, setTimelineIndex] = useState(0);
  const [scores, setScores] = useState<DemoScores>(INITIAL_PSYCHOLOGY_SCORES);
  const [behaviorMode, setBehaviorMode] = useState<BehaviorMode>("leading");
  const [persona] = useState<ClientPersona>(ACTIVE_PERSONA);
  const [pressureLevel, setPressureLevel] = useState<PressureLevel>(INITIAL_PRESSURE);
  const [visibleFeedback, setVisibleFeedback] = useState<CoachFeedback[]>([]);
  const [visibleInsights, setVisibleInsights] = useState<CoachingInsight[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeObjection, setActiveObjection] = useState<string | null>(null);

  const replayProgress = Math.min((elapsed / 104) * 100, 100);

  const resetDemo = useCallback(() => {
    setVisibleMessages([]);
    setVisibleFeedback([]);
    setVisibleInsights([]);
    setMessageIndex(0);
    setTimelineIndex(0);
    setScores(INITIAL_PSYCHOLOGY_SCORES);
    setBehaviorMode("leading");
    setPressureLevel(INITIAL_PRESSURE);
    setElapsed(0);
    setActiveObjection(null);
    setPhase("connecting");
    setTimeout(() => setPhase("live"), 1200);
  }, []);

  const advanceDemo = useCallback(() => {
    if (messageIndex >= DEMO_TRANSCRIPT.length) {
      setPhase("idle");
      setIsSpeaking(false);
      setTimeout(resetDemo, 4000);
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
          setScores((s) => ({
            ...s,
            confidence: 74,
            objection: 62,
            pressure: 71,
            frameControl: 52,
            authority: 48,
            certainty: 61,
          }));
          setBehaviorMode("reactive");
          setTimelineIndex(3);
          setActiveObjection("איבוד פריים · מחיר");
          setPhase("live");
        }
        if (msg.type === "analysis") {
          setVisibleFeedback((prev) => {
            const next = [...prev];
            if (!next.find((f) => f.id === 3)) next.push(COACH_FEEDBACK[2]);
            if (!next.find((f) => f.id === 4)) next.push(COACH_FEEDBACK[3]);
            return next;
          });
          setVisibleInsights((prev) => [
            ...prev,
            COACHING_INSIGHTS[1],
            COACHING_INSIGHTS[2],
          ]);
          setScores({
            confidence: 58,
            objection: 51,
            pressure: 89,
            frameControl: 28,
            authority: 35,
            certainty: 42,
          });
          setBehaviorMode("reactive");
          setTimelineIndex(5);
          setActiveObjection("נכנעות · Reactive");
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
        setScores((s) => ({
          ...s,
          pressure: 68,
          objection: 71,
          frameControl: 72,
          certainty: 76,
        }));
        setBehaviorMode("neutral");
        setTimelineIndex(2);
        setActiveObjection("Frame test · מחיר");
      }
      if (msg.id === 5) {
        setScores((s) => ({
          ...s,
          frameControl: 58,
          authority: 62,
          certainty: 54,
          confidence: 66,
        }));
        setBehaviorMode("reactive");
        setVisibleFeedback((prev) => {
          if (prev.find((f) => f.id === 2)) return prev;
          return [...prev, COACH_FEEDBACK[1]];
        });
        setVisibleInsights((prev) => {
          if (prev.find((i) => i.id === 4)) return prev;
          return [...prev, COACHING_INSIGHTS[3]];
        });
        setTimelineIndex(4);
        setActiveObjection("Certainty drop");
      }
      if (msg.id === 6) {
        setTimelineIndex(4);
        setActiveObjection("בריחה · 'תשלח פרטים'");
      }
      setMessageIndex((i) => i + 1);

      setTimeout(() => setIsSpeaking(false), 1600);
    }
  }, [messageIndex, resetDemo]);

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
    behaviorMode,
    persona,
    pressureLevel,
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
