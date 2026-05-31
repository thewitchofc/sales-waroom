import type { TtsRole } from "@/config/tts-config";

let currentAudio: HTMLAudioElement | null = null;
let currentObjectUrl: string | null = null;
let abortController: AbortController | null = null;
let voicesReady = false;

function cleanupAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = "";
    currentAudio = null;
  }
  if (currentObjectUrl) {
    URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = null;
  }
}

function pickHebrewVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;

  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((voice) => voice.lang === "he-IL") ??
    voices.find((voice) => voice.lang.startsWith("he")) ??
    null
  );
}

function ensureVoicesLoaded(onReady: () => void) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  if (voicesReady || window.speechSynthesis.getVoices().length > 0) {
    voicesReady = true;
    onReady();
    return;
  }

  window.speechSynthesis.addEventListener(
    "voiceschanged",
    () => {
      voicesReady = true;
      onReady();
    },
    { once: true },
  );
}

function speakWithBrowser(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  const speak = () => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "he-IL";
    utterance.rate = 0.95;

    const voice = pickHebrewVoice();
    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
  };

  ensureVoicesLoaded(speak);
}

export function isHebrewSpeechSupported() {
  return typeof window !== "undefined";
}

export function stopHebrewSpeech() {
  abortController?.abort();
  abortController = null;
  cleanupAudio();

  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

export async function speakHebrew(text: string, role: TtsRole = "customer") {
  const clean = text.trim();
  if (!clean || typeof window === "undefined") return;

  stopHebrewSpeech();
  abortController = new AbortController();

  try {
    const response = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: clean, role }),
      signal: abortController.signal,
    });

    if (!response.ok) {
      throw new Error("TTS request failed");
    }

    const blob = await response.blob();
    currentObjectUrl = URL.createObjectURL(blob);
    currentAudio = new Audio(currentObjectUrl);

    await currentAudio.play();
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") return;
    speakWithBrowser(clean);
  }
}
