"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  createCoachMessageId,
  getCoachSpeechText,
  isCoachSpeechReady,
  parseCoachSections,
  streamCoachChat,
  type CoachChatMessage,
} from "@/lib/ai-coach-chat";
import { speakHebrew, stopHebrewSpeech } from "@/lib/speak-hebrew";

export function useAICoach() {
  const [messages, setMessages] = useState<CoachChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const speechStartedRef = useRef(false);

  const latestAssistant = useMemo(() => {
    return [...messages]
      .reverse()
      .find((message) => message.role === "assistant");
  }, [messages]);

  const parsedLatest = useMemo(() => {
    if (!latestAssistant?.content) return null;
    return parseCoachSections(latestAssistant.content);
  }, [latestAssistant]);

  const sendMessage = useCallback(
    async (rawText: string) => {
      const text = rawText.trim();
      if (!text || streaming) return;

      setError(null);
      const userMessage: CoachChatMessage = {
        id: createCoachMessageId(),
        role: "user",
        content: text,
      };
      const assistantId = createCoachMessageId();
      const nextMessages = [...messages, userMessage];

      setMessages([
        ...nextMessages,
        { id: assistantId, role: "assistant", content: "" },
      ]);
      setInput("");
      setStreaming(true);
      speechStartedRef.current = false;

      abortRef.current?.abort();
      abortRef.current = new AbortController();

      let fullContent = "";

      try {
        await streamCoachChat({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
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

            if (!speechStartedRef.current && isCoachSpeechReady(fullContent)) {
              speechStartedRef.current = true;
              const speechText = getCoachSpeechText(fullContent);
              if (speechText) void speakHebrew(speechText, "coach");
            }
          },
        });

        if (!speechStartedRef.current) {
          const speechText = getCoachSpeechText(fullContent);
          if (speechText) void speakHebrew(speechText, "coach");
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        const message =
          err instanceof Error ? err.message : "שגיאה בחיבור למאמן AI";
        setError(message);
      } finally {
        setStreaming(false);
      }
    },
    [messages, streaming],
  );

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
    stopHebrewSpeech();
  }, []);

  const resetChat = useCallback(() => {
    abortRef.current?.abort();
    stopHebrewSpeech();
    setMessages([]);
    setInput("");
    setError(null);
    setStreaming(false);
  }, []);

  return {
    messages,
    input,
    setInput,
    streaming,
    error,
    parsedLatest,
    sendMessage,
    stopStreaming,
    resetChat,
  };
}

export type AICoachState = ReturnType<typeof useAICoach>;
