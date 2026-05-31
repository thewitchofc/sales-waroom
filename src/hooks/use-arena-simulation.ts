"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ARENA_SIMULATION_LEVELS,
  type ArenaSimulationLevel,
} from "@/config/arena-simulation-prompt";
import {
  createArenaMessageId,
  DEFAULT_ARENA_SCORES,
  parseArenaTurn,
  streamArenaSimulation,
  type ArenaChatMessage,
  type ArenaLiveScores,
} from "@/lib/arena-simulation";
import { speakHebrew, stopHebrewSpeech } from "@/lib/speak-hebrew";

export type ArenaSessionStatus = "idle" | "live" | "thinking";

export interface ArenaTranscriptEntry {
  id: string;
  speaker: "user" | "customer";
  text: string;
  time: string;
}

function formatTimer(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function useArenaSimulation(initialLevel: ArenaSimulationLevel = "hard") {
  const [level, setLevel] = useState<ArenaSimulationLevel>(initialLevel);
  const [status, setStatus] = useState<ArenaSessionStatus>("idle");
  const [messages, setMessages] = useState<ArenaChatMessage[]>([]);
  const [transcript, setTranscript] = useState<ArenaTranscriptEntry[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [scores, setScores] = useState<ArenaLiveScores>(DEFAULT_ARENA_SCORES);
  const [objection, setObjection] = useState("");
  const [correction, setCorrection] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const abortRef = useRef<AbortController | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const latestTurn = useMemo(() => {
    const lastAssistant = [...messages]
      .reverse()
      .find((message) => message.role === "assistant");
    if (!lastAssistant?.content) return null;
    return parseArenaTurn(lastAssistant.content);
  }, [messages]);

  useEffect(() => {
    if (status === "live") {
      timerRef.current = setInterval(() => setElapsed((v) => v + 1), 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
    if (timerRef.current) clearInterval(timerRef.current);
    return undefined;
  }, [status]);

  const pushTranscript = useCallback(
    (speaker: "user" | "customer", text: string) => {
      setTranscript((prev) => [
        ...prev,
        {
          id: createArenaMessageId(),
          speaker,
          text,
          time: formatTimer(elapsed),
        },
      ]);
    },
    [elapsed],
  );

  const runTurn = useCallback(
    async ({
      nextMessages,
      start = false,
      userLine,
    }: {
      nextMessages: ArenaChatMessage[];
      start?: boolean;
      userLine?: string;
    }) => {
      setError(null);
      setStatus("thinking");

      const assistantId = createArenaMessageId();
      setMessages([
        ...nextMessages,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      abortRef.current?.abort();
      abortRef.current = new AbortController();

      if (userLine) pushTranscript("user", userLine);

      let fullContent = "";

      try {
        await streamArenaSimulation({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
          level,
          start,
          signal: abortRef.current.signal,
          onDelta: (delta) => {
            fullContent += delta;
            setMessages((current) =>
              current.map((message) =>
                message.id === assistantId
                  ? { ...message, content: message.content + delta }
                  : message,
              ),
            );
          },
        });

        if (fullContent) {
          const parsed = parseArenaTurn(fullContent);
          setScores(parsed.scores);
          setObjection(parsed.objection);
          setCorrection(parsed.correction);
          pushTranscript("customer", parsed.customer);
          void speakHebrew(parsed.customer, "customer");
        }

        setStatus("live");
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        const message =
          err instanceof Error ? err.message : "שגיאה בסימולציה";
        setError(message);
        setStatus("live");
      }
    },
    [level, pushTranscript],
  );

  const startSession = useCallback(async () => {
    setMessages([]);
    setTranscript([]);
    setScores(DEFAULT_ARENA_SCORES);
    setObjection("");
    setCorrection("");
    setElapsed(0);
    setStatus("live");
    await runTurn({ nextMessages: [], start: true });
  }, [runTurn]);

  const sendMessage = useCallback(
    async (rawText: string) => {
      const text = rawText.trim();
      if (!text || status === "thinking") return;

      const userMessage: ArenaChatMessage = {
        id: createArenaMessageId(),
        role: "user",
        content: text,
      };
      const nextMessages = [...messages, userMessage];
      setMessages(nextMessages);
      setInput("");
      await runTurn({ nextMessages, userLine: text });
    },
    [messages, runTurn, status],
  );

  const stopSession = useCallback(() => {
    abortRef.current?.abort();
    stopHebrewSpeech();
    setStatus("idle");
  }, []);

  const resetSession = useCallback(() => {
    abortRef.current?.abort();
    stopHebrewSpeech();
    setMessages([]);
    setTranscript([]);
    setScores(DEFAULT_ARENA_SCORES);
    setObjection("");
    setCorrection("");
    setElapsed(0);
    setInput("");
    setError(null);
    setStatus("idle");
  }, []);

  return {
    level,
    setLevel,
    levelMeta: ARENA_SIMULATION_LEVELS[level],
    status,
    messages,
    transcript,
    input,
    setInput,
    error,
    scores,
    objection,
    correction,
    latestTurn,
    elapsed,
    formatTimer: () => formatTimer(elapsed),
    startSession,
    sendMessage,
    stopSession,
    resetSession,
  };
}

export type ArenaSimulationState = ReturnType<typeof useArenaSimulation>;
