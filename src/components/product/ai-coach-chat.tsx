"use client";

import { motion } from "framer-motion";
import { useAICoach } from "@/hooks/use-ai-coach";
import { SALES_WARROOM_AI_NAME } from "@/config/ai-coach-prompt";
import { BrandButton } from "@/components/brand/brand-button";
import { cn } from "@/lib/utils";

const scoreLabels: Record<string, string> = {
  authority: "סמכות",
  emotional_control: "שליטה רגשית",
  tonality: "טונציה",
  qualification: "העמקה",
  pressure_handling: "לחץ",
  frame_control: "פריים",
  urgency: "דחיפות",
  procrastination_handling: "דחיינות",
};

const starterPrompts = [
  "הלקוח אמר: יוקר לי. עניתי: אצלנו הכי טוב בשוק. מה הטעות?",
  "פתחתי ב: יש לי הצעה מדהימה. הלקוח נסגר. מה עשיתי לא נכון?",
  "הלקוח ביקש פרטים במייל. איך אני שומר את השיחה חיה?",
];

interface AICoachChatProps {
  compact?: boolean;
  showIntro?: boolean;
}

export function AICoachChat({ compact = false, showIntro = true }: AICoachChatProps) {
  const coach = useAICoach();

  return (
    <div
      className={cn(
        "relative border border-white/[0.08] bg-black/50",
        compact ? "space-y-0" : "",
      )}
    >
      <CoachHeader streaming={coach.streaming} />

      <div className="grid gap-0 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <CoachMessages
            messages={coach.messages}
            streaming={coach.streaming}
            showIntro={showIntro}
            onPrompt={coach.sendMessage}
          />
          <CoachInput
            input={coach.input}
            setInput={coach.setInput}
            streaming={coach.streaming}
            error={coach.error}
            onSubmit={() => void coach.sendMessage(coach.input)}
            onStop={coach.stopStreaming}
          />
        </div>
        <CoachAnalysis parsed={coach.parsedLatest} />
      </div>
    </div>
  );
}

export function CoachHeader({ streaming }: { streaming: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3 sm:px-5">
      <div>
        <p className="font-brand text-[10px] tracking-[0.16em] text-red-400">
          {SALES_WARROOM_AI_NAME}
        </p>
        <p className="mt-1 text-sm text-white/80">
          מאמן מכירות מלחמתי. בלי מוטיבציה ריקה.
        </p>
      </div>
      <motion.span
        className="text-[10px] text-red-400/80"
        animate={{ opacity: streaming ? [1, 0.35, 1] : 1 }}
        transition={{ duration: 1.2, repeat: streaming ? Infinity : 0 }}
      >
        {streaming ? "● מנתח" : "● מוכן"}
      </motion.span>
    </div>
  );
}

export function CoachMessages({
  messages,
  streaming,
  showIntro,
  onPrompt,
}: {
  messages: ReturnType<typeof useAICoach>["messages"];
  streaming: boolean;
  showIntro?: boolean;
  onPrompt: (text: string) => void;
}) {
  return (
    <div className="max-h-[420px] space-y-3 overflow-y-auto p-4 sm:p-5">
      {messages.length === 0 && showIntro ? (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-white/55">
            הדביקו מה שאמרתם, מה שהלקוח אמר, או תרחיש שלם. המאמן יחזיר ניתוח,
            תשובה מומלצת, וציונים.
          </p>
          <div className="space-y-2">
            {starterPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                disabled={streaming}
                onClick={() => void onPrompt(prompt)}
                className="block w-full border border-white/10 bg-black/40 px-3 py-2.5 text-start text-xs leading-relaxed text-white/70 transition-colors hover:border-accent/25 hover:text-white disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "border px-3 py-3 text-sm leading-relaxed sm:px-4",
              message.role === "user"
                ? "border-white/10 bg-white/[0.03] text-white/85"
                : "border-red-500/20 bg-red-500/[0.04] text-white/90",
            )}
          >
            <p className="mb-2 font-brand text-[9px] tracking-[0.12em] text-white/40">
              {message.role === "user" ? "את/ה" : SALES_WARROOM_AI_NAME}
            </p>
            <p className="whitespace-pre-wrap">{message.content || "..."}</p>
          </div>
        ))
      )}
    </div>
  );
}

export function CoachInput({
  input,
  setInput,
  streaming,
  error,
  onSubmit,
  onStop,
}: {
  input: string;
  setInput: (value: string) => void;
  streaming: boolean;
  error: string | null;
  onSubmit: () => void;
  onStop: () => void;
}) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="border-t border-white/[0.06] p-4 sm:p-5"
    >
      <label className="mb-2 block font-brand text-[9px] text-white/40">
        מה קרה בשיחה?
      </label>
      <textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        rows={3}
        placeholder="לדוגמה: הלקוח אמר יוקר לי ואני הסברתי למה המחיר הוגן..."
        className="w-full resize-none border border-white/10 bg-black/60 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-accent/35"
        disabled={streaming}
      />
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      <div className="mt-3 flex flex-wrap gap-3">
        <BrandButton
          type="submit"
          variant="command"
          disabled={streaming || !input.trim()}
        >
          {streaming ? "מנתח..." : "שליחה למאמן"}
        </BrandButton>
        {streaming && (
          <BrandButton type="button" variant="ghost" onClick={onStop}>
            עצירה
          </BrandButton>
        )}
      </div>
    </form>
  );
}

export function CoachAnalysis({
  parsed,
}: {
  parsed: ReturnType<typeof useAICoach>["parsedLatest"];
}) {
  return (
    <div className="border-t border-white/[0.06] p-4 sm:p-5 lg:col-span-2 lg:border-t-0 lg:border-s lg:border-white/[0.06]">
      <p className="font-brand text-[9px] tracking-[0.14em] text-accent">
        ניתוח מובנה
      </p>

      {!parsed ? (
        <p className="mt-4 text-sm text-white/45">
          אחרי תשובת המאמן תראו כאן coaching, response, וציונים.
        </p>
      ) : (
        <div className="mt-4 space-y-4">
          {parsed.coaching && (
            <section>
              <h3 className="font-brand text-[9px] text-red-400">COACHING</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                {parsed.coaching}
              </p>
            </section>
          )}
          {parsed.response && (
            <section className="border border-accent/20 bg-accent/5 p-3">
              <h3 className="font-brand text-[9px] text-accent">RESPONSE</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/85">
                {parsed.response}
              </p>
            </section>
          )}
          {Object.keys(parsed.scores).length > 0 && (
            <section>
              <h3 className="font-brand text-[9px] text-white/45">SCORES</h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {Object.entries(parsed.scores).map(([key, value]) => (
                  <div
                    key={key}
                    className="border border-white/10 bg-black/40 px-3 py-2"
                  >
                    <p className="text-[10px] text-white/45">
                      {scoreLabels[key] ?? key}
                    </p>
                    <p className="font-display text-lg font-bold text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
