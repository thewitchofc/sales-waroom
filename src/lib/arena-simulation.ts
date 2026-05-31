import type { ArenaDynamicScenario } from "@/config/arena-dynamic-scenario";
import type { ArenaSimulationLevel } from "@/config/arena-simulation-prompt";
import type { UserTrainingProfile } from "@/config/user-training-profile";

export type ArenaChatRole = "user" | "assistant";

export interface ArenaChatMessage {
  id: string;
  role: ArenaChatRole;
  content: string;
  customerText?: string;
}

export interface ArenaLiveScores {
  authority: number;
  pressure: number;
  qualification: number;
  tonality: number;
  emotional_control: number;
  urgency: number;
  procrastination_handling: number;
  positioning: number;
  pricing_confidence: number;
  follow_up_authority: number;
}

export interface ArenaParsedTurn {
  customer: string;
  scores: ArenaLiveScores;
  objection: string;
  correction: string;
}

export const DEFAULT_ARENA_SCORES: ArenaLiveScores = {
  authority: 50,
  pressure: 50,
  qualification: 50,
  tonality: 50,
  emotional_control: 50,
  urgency: 50,
  procrastination_handling: 50,
  positioning: 50,
  pricing_confidence: 50,
  follow_up_authority: 50,
};

export function createArenaMessageId() {
  return `arena-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function extractStreamingCustomer(content: string) {
  const match = content.match(
    /### CUSTOMER\s*([\s\S]*?)(?=### ANALYSIS|$)/i,
  );
  if (!match?.[1]) return "";

  const text = match[1].trim();
  if (!text || /^\[[\s\S]*\]$/.test(text)) return "";

  return text;
}

export function isCustomerSectionComplete(content: string) {
  return /### ANALYSIS/i.test(content);
}

export function parseArenaTurn(content: string): ArenaParsedTurn {
  const customerMatch = content.match(
    /### CUSTOMER\s*([\s\S]*?)(?=### ANALYSIS|$)/i,
  );
  const analysisMatch = content.match(
    /### ANALYSIS\s*([\s\S]*?)(?=### OBJECTION|$)/i,
  );
  const objectionMatch = content.match(
    /### OBJECTION\s*([\s\S]*?)(?=### CORRECTION|$)/i,
  );
  const correctionMatch = content.match(/### CORRECTION\s*([\s\S]*?)$/i);

  const scores = { ...DEFAULT_ARENA_SCORES };
  if (analysisMatch?.[1]) {
    for (const line of analysisMatch[1].split("\n")) {
      const match = line.match(/([a-z_]+):\s*(\d{1,3})/i);
      if (!match) continue;
      const key = match[1].toLowerCase() as keyof ArenaLiveScores;
      if (key in scores) scores[key] = Number(match[2]);
    }
  }

  return {
    customer: customerMatch?.[1]?.trim() ?? content.trim(),
    scores,
    objection: objectionMatch?.[1]?.trim() ?? "",
    correction: correctionMatch?.[1]?.trim() ?? "",
  };
}

export async function streamArenaSimulation({
  messages,
  level,
  start,
  scenario,
  userProfile,
  onDelta,
  onScenario,
  onDone,
  onError,
  signal,
}: {
  messages: Pick<ArenaChatMessage, "role" | "content">[];
  level: ArenaSimulationLevel;
  start?: boolean;
  scenario?: ArenaDynamicScenario | null;
  userProfile?: UserTrainingProfile;
  onDelta: (text: string) => void;
  onScenario?: (scenario: ArenaDynamicScenario) => void;
  onDone?: () => void;
  onError?: (message: string) => void;
  signal?: AbortSignal;
}) {
  const response = await fetch("/api/arena", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, level, start, scenario, userProfile }),
    signal,
  });

  if (!response.ok) {
    let message = "Failed to reach arena simulation";
    try {
      const payload = (await response.json()) as { error?: string };
      if (payload.error) message = payload.error;
    } catch {
      // ignore
    }
    onError?.(message);
    throw new Error(message);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    const message = "Streaming is not supported";
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
        const parsed = JSON.parse(payload) as {
          text?: string;
          error?: string;
          scenario?: ArenaDynamicScenario;
        };
        if (parsed.error) {
          onError?.(parsed.error);
          throw new Error(parsed.error);
        }
        if (parsed.scenario) onScenario?.(parsed.scenario);
        if (parsed.text) onDelta(parsed.text);
      } catch (error) {
        if (error instanceof SyntaxError) continue;
        throw error;
      }
    }
  }

  onDone?.();
}
