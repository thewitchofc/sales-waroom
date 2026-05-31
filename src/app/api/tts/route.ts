import OpenAI from "openai";
import {
  MAX_TTS_CHARS,
  OPENAI_TTS_MODEL,
  TTS_VOICES,
  type TtsRole,
} from "@/config/tts-config";

export const runtime = "nodejs";
export const maxDuration = 30;

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  return new OpenAI({ apiKey });
}

function sanitizeText(input: unknown) {
  if (typeof input !== "string") return "";
  return input.trim().slice(0, MAX_TTS_CHARS);
}

function sanitizeRole(input: unknown): TtsRole {
  return input === "coach" ? "coach" : "customer";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      text?: unknown;
      role?: unknown;
    };
    const text = sanitizeText(body.text);

    if (!text) {
      return Response.json({ error: "Text is required" }, { status: 400 });
    }

    const role = sanitizeRole(body.role);
    const openai = getOpenAIClient();

    const speech = await openai.audio.speech.create({
      model: OPENAI_TTS_MODEL,
      voice: TTS_VOICES[role],
      input: text,
      response_format: "mp3",
    });

    const buffer = Buffer.from(await speech.arrayBuffer());

    return new Response(buffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to generate speech";
    const status = message.includes("OPENAI_API_KEY") ? 503 : 500;
    return Response.json({ error: message }, { status });
  }
}
