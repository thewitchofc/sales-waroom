export type TtsRole = "customer" | "coach";

export const OPENAI_TTS_MODEL =
  process.env.OPENAI_TTS_MODEL?.trim() || "tts-1-hd";

export const TTS_VOICES: Record<TtsRole, string> = {
  customer: process.env.OPENAI_TTS_VOICE_CUSTOMER?.trim() || "coral",
  coach: process.env.OPENAI_TTS_VOICE_COACH?.trim() || "onyx",
};

export const MAX_TTS_CHARS = 3000;
