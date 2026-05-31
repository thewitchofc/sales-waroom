import OpenAI from "openai";
import {
  OPENAI_COACH_MAX_TOKENS,
  OPENAI_MODEL,
  SALES_WARROOM_AI_COACH_FORMAT_PROMPT,
  SALES_WARROOM_AI_COACH_PROMPT,
  SALES_WARROOM_AI_PHILOSOPHY_PROMPT,
} from "@/config/ai-coach-prompt";

export const runtime = "nodejs";
export const maxDuration = 60;

type ChatRole = "user" | "assistant";

interface ChatMessage {
  role: ChatRole;
  content: string;
}

const MAX_MESSAGES = 24;
const MAX_CONTENT_LENGTH = 4000;

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

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  return new OpenAI({ apiKey });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { messages?: unknown };
    const messages = sanitizeMessages(body.messages);

    if (messages.length === 0) {
      return Response.json({ error: "Messages are required" }, { status: 400 });
    }

    const openai = getOpenAIClient();

    const stream = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      stream: true,
      max_tokens: OPENAI_COACH_MAX_TOKENS,
      messages: [
        { role: "system", content: SALES_WARROOM_AI_COACH_PROMPT },
        { role: "system", content: SALES_WARROOM_AI_PHILOSOPHY_PROMPT },
        { role: "system", content: SALES_WARROOM_AI_COACH_FORMAT_PROMPT },
        ...messages,
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
      error instanceof Error ? error.message : "Failed to start chat stream";
    const status = message.includes("OPENAI_API_KEY") ? 503 : 500;
    return Response.json({ error: message }, { status });
  }
}
