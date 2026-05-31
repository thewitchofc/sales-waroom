export type CoachChatRole = "user" | "assistant";

export interface CoachChatMessage {
  id: string;
  role: CoachChatRole;
  content: string;
}

export async function streamCoachChat({
  messages,
  onDelta,
  onDone,
  onError,
  signal,
}: {
  messages: Pick<CoachChatMessage, "role" | "content">[];
  onDelta: (text: string) => void;
  onDone?: () => void;
  onError?: (message: string) => void;
  signal?: AbortSignal;
}) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
    signal,
  });

  if (!response.ok) {
    let message = "Failed to reach AI coach";
    try {
      const payload = (await response.json()) as { error?: string };
      if (payload.error) message = payload.error;
    } catch {
      // ignore parse errors
    }
    onError?.(message);
    throw new Error(message);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    const message = "Streaming is not supported in this browser";
    onError?.(message);
    throw new Error(message);
  }

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const payload = line.slice(6).trim();
      if (!payload || payload === "[DONE]") continue;

      try {
        const parsed = JSON.parse(payload) as { text?: string; error?: string };
        if (parsed.error) {
          onError?.(parsed.error);
          throw new Error(parsed.error);
        }
        if (parsed.text) onDelta(parsed.text);
      } catch (error) {
        if (error instanceof SyntaxError) continue;
        throw error;
      }
    }
  }

  onDone?.();
}

export function createCoachMessageId() {
  return `coach-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function parseCoachSections(content: string) {
  const coachingMatch = content.match(
    /### COACHING\s*([\s\S]*?)(?=### RESPONSE|$)/i,
  );
  const responseMatch = content.match(
    /### RESPONSE\s*([\s\S]*?)(?=### SCORES|$)/i,
  );
  const scoresMatch = content.match(/### SCORES\s*([\s\S]*?)$/i);

  const scores: Record<string, number> = {};
  if (scoresMatch?.[1]) {
    for (const line of scoresMatch[1].split("\n")) {
      const match = line.match(/([a-z_]+):\s*(\d{1,3})/i);
      if (match) scores[match[1].toLowerCase()] = Number(match[2]);
    }
  }

  return {
    coaching: coachingMatch?.[1]?.trim() ?? "",
    response: responseMatch?.[1]?.trim() ?? "",
    scores,
  };
}

export function getCoachSpeechText(content: string) {
  const { coaching, response } = parseCoachSections(content);
  return [coaching, response].filter(Boolean).join("\n\n");
}

export function isCoachSpeechReady(content: string) {
  if (!/### SCORES/i.test(content)) return false;
  return getCoachSpeechText(content).length > 0;
}
