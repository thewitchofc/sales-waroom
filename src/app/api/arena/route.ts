import OpenAI from "openai";
import {
  ARENA_CUSTOMER_SYSTEM_PROMPT,
  ARENA_SESSION_OPEN_PROMPT,
  buildArenaFormatPrompt,
  type ArenaSimulationLevel,
} from "@/config/arena-simulation-prompt";
import { OPENAI_MODEL } from "@/config/ai-coach-prompt";

export const runtime = "nodejs";
export const maxDuration = 60;

type ChatRole = "user" | "assistant";

interface ChatMessage {
  role: ChatRole;
  content: string;
}

const MAX_MESSAGES = 24;
const MAX_CONTENT_LENGTH = 4000;
const LEVELS: ArenaSimulationLevel[] = ["entry", "medium", "hard", "elite"];

function sanitizeMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return [];

  return input
    .filter((message): message is ChatMessage => {
      if (!message || typeof message !== "object") return false;
      const role = (message as ChatMessage).role;
      const content = (message as ChatMessage).content;
      return (
        (role === "user" || role === "assistant") &&
        typeof content === "string" &&
        content.trim().length > 0 &&
        content.length <= MAX_CONTENT_LENGTH
      );
    })
    .slice(-MAX_MESSAGES);
}

function sanitizeLevel(input: unknown): ArenaSimulationLevel {
  if (typeof input === "string" && LEVELS.includes(input as ArenaSimulationLevel)) {
    return input as ArenaSimulationLevel;
  }
  return "hard";
}

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  return new OpenAI({ apiKey });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      messages?: unknown;
      level?: unknown;
      start?: boolean;
    };

    const level = sanitizeLevel(body.level);
    const start = body.start === true;
    const messages = sanitizeMessages(body.messages);

    if (!start && messages.length === 0) {
      return Response.json({ error: "Messages are required" }, { status: 400 });
    }

    const conversation: ChatMessage[] = start
      ? [{ role: "user", content: ARENA_SESSION_OPEN_PROMPT }]
      : messages;

    const openai = getOpenAIClient();

    const stream = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      stream: true,
      messages: [
        { role: "system", content: ARENA_CUSTOMER_SYSTEM_PROMPT },
        { role: "system", content: buildArenaFormatPrompt(level) },
        ...conversation,
      ],
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content;
            if (text) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text })}\n\n`),
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Stream failed";
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: message })}\n\n`,
            ),
          );
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to start arena stream";
    const status = message.includes("OPENAI_API_KEY") ? 503 : 500;
    return Response.json({ error: message }, { status });
  }
}
