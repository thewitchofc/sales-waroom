"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  generateArenaDynamicScenario,
  getScenarioDisplayTags,
  type ArenaDynamicScenario,
} from "@/config/arena-dynamic-scenario";
import {
  ARENA_SIMULATION_LEVELS,
  type ArenaSimulationLevel,
} from "@/config/arena-simulation-prompt";
import {
  createArenaMessageId,
  DEFAULT_ARENA_SCORES,
  extractStreamingCustomer,
  isCustomerSectionComplete,
  parseArenaTurn,
  streamArenaSimulation,
  type ArenaChatMessage,
  type ArenaLiveScores,
} from "@/lib/arena-simulation";
import { speakHebrew, stopHebrewSpeech } from "@/lib/speak-hebrew";
import { useUserTrainingProfile } from "@/hooks/use-user-training-profile";

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
  const { profile } = useUserTrainingProfile();
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
  const [scenario, setScenario] = useState<ArenaDynamicScenario | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ttsStartedRef = useRef(false);
  const customerTranscriptIdRef = useRef<string | null>(null);
  const activeScenarioRef = useRef<ArenaDynamicScenario | null>(null);

  const scenarioTags = useMemo(
    () => (scenario ? getScenarioDisplayTags(scenario) : []),
    [scenario],
  );

  const latestTurn = useMemo(() => {
    const lastAssistant = [...messages]
      .reverse()
      .find((message) => message.role === "assistant");
    if (!lastAssistant?.content) return null;
    return parseArenaTurn(lastAssistant.content);
  }, [messages]);

  useEffect(() => {
    if (status === "live" || status === "thinking") {
      timerRef.current = setInterval(() => setElapsed((v) => v + 1), 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
    if (timerRef.current) clearInterval(timerRef.current);
    return undefined;
  }, [status]);

  const upsertCustomerTranscript = useCallback(
    (text: string) => {
      setTranscript((prev) => {
        if (customerTranscriptIdRef.current) {
          return prev.map((entry) =>
            entry.id === customerTranscriptIdRef.current
              ? { ...entry, text }
              : entry,
          );
        }

        const id = createArenaMessageId();
        customerTranscriptIdRef.current = id;
        return [
          ...prev,
          {
            id,
            speaker: "customer" as const,
            text,
            time: formatTimer(elapsed),
          },
        ];
      });
    },
    [elapsed],
  );

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
      turnScenario,
    }: {
      nextMessages: ArenaChatMessage[];
      start?: boolean;
      userLine?: string;
      turnScenario?: ArenaDynamicScenario | null;
    }) => {
      setError(null);
      setStatus("thinking");
      ttsStartedRef.current = false;
      customerTranscriptIdRef.current = null;

      const assistantId = createArenaMessageId();
      setMessages([
        ...nextMessages,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      abortRef.current?.abort();
      abortRef.current = new AbortController();

      if (userLine) pushTranscript("user", userLine);

      const scenarioForTurn =
        turnScenario ?? activeScenarioRef.current ?? scenario;

      let fullContent = "";

      try {
        await streamArenaSimulation({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
          level,
          start,
          scenario: scenarioForTurn,
          userProfile: profile,
          signal: abortRef.current.signal,
          onScenario: (nextScenario) => {
            activeScenarioRef.current = nextScenario;
            setScenario(nextScenario);
          },
          onDelta: (delta) => {
            fullContent += delta;
            setMessages((current) =>
              current.map((message) =>
                message.id === assistantId
                  ? { ...message, content: message.content + delta }
                  : message,
              ),
            );

            const customerText = extractStreamingCustomer(fullContent);
            if (customerText) {
              upsertCustomerTranscript(customerText);
            }

            if (
              isCustomerSectionComplete(fullContent) &&
              !ttsStartedRef.current
            ) {
              const parsed = parseArenaTurn(fullContent);
              ttsStartedRef.current = true;
              setStatus("live");
              if (parsed.customer) {
                void speakHebrew(parsed.customer, "customer");
              }
            }
          },
        });

        if (fullContent) {
          const parsed = parseArenaTurn(fullContent);
          setScores(parsed.scores);
          setObjection(parsed.objection);
          setCorrection(parsed.correction);

          if (!customerTranscriptIdRef.current && parsed.customer) {
            pushTranscript("customer", parsed.customer);
          }

          if (!ttsStartedRef.current && parsed.customer) {
            void speakHebrew(parsed.customer, "customer");
          }
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
    [level, profile, pushTranscript, scenario, upsertCustomerTranscript],
  );

  const startSession = useCallback(async () => {
    const nextScenario = generateArenaDynamicScenario({ level, profile });
    activeScenarioRef.current = nextScenario;
    setScenario(nextScenario);
    setMessages([]);
    setTranscript([]);
    setScores(DEFAULT_ARENA_SCORES);
    setObjection("");
    setCorrection("");
    setElapsed(0);
    setStatus("thinking");
    await runTurn({
      nextMessages: [],
      start: true,
      turnScenario: nextScenario,
    });
  }, [level, profile, runTurn]);

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
    activeScenarioRef.current = null;
    setScenario(null);
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

  const canType =
    status === "live" ||
    (status === "thinking" &&
      transcript.some((entry) => entry.speaker === "customer"));

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
    scenario,
    scenarioTags,
    elapsed,
    canType,
    formatTimer: () => formatTimer(elapsed),
    startSession,
    sendMessage,
    stopSession,
    resetSession,
  };
}

export type ArenaSimulationState = ReturnType<typeof useArenaSimulation>;
