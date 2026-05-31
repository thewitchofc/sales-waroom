"use client";

import type { ReactNode } from "react";
import { useUserTrainingProfile } from "@/hooks/use-user-training-profile";
import {
  TRAINING_EXPERIENCE_OPTIONS,
  TRAINING_INDUSTRY_OPTIONS,
  TRAINING_SALE_TYPE_OPTIONS,
  TRAINING_WEAKNESS_OPTIONS,
  type TrainingIndustry,
  type TrainingExperienceLevel,
  type TrainingSaleType,
  type TrainingWeakness,
} from "@/config/user-training-profile";
import { cn } from "@/lib/utils";

export function TrainingProfileForm({ compact = false }: { compact?: boolean }) {
  const { profile, setProfile, ready } = useUserTrainingProfile();

  if (!ready) {
    return (
      <p className="text-sm text-white/45">טוען פרופיל אימון...</p>
    );
  }

  const toggleWeakness = (weakness: TrainingWeakness) => {
    const exists = profile.weaknesses.includes(weakness);
    const weaknesses = exists
      ? profile.weaknesses.filter((item) => item !== weakness)
      : [...profile.weaknesses, weakness];
    setProfile({ ...profile, weaknesses });
  };

  return (
    <div className={cn("space-y-5", compact ? "space-y-4" : "")}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="תחום מכירה">
          <select
            value={profile.industry}
            onChange={(event) =>
              setProfile({
                ...profile,
                industry: event.target.value as TrainingIndustry,
              })
            }
            className="w-full border border-white/10 bg-black px-3 py-2.5 text-sm text-white outline-none"
          >
            {Object.entries(TRAINING_INDUSTRY_OPTIONS).map(([key, option]) => (
              <option key={key} value={key} className="bg-black">
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="סוג מכירה">
          <select
            value={profile.saleType}
            onChange={(event) =>
              setProfile({
                ...profile,
                saleType: event.target.value as TrainingSaleType,
              })
            }
            className="w-full border border-white/10 bg-black px-3 py-2.5 text-sm text-white outline-none"
          >
            {Object.entries(TRAINING_SALE_TYPE_OPTIONS).map(([key, option]) => (
              <option key={key} value={key} className="bg-black">
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="רמת ניסיון">
        <div className="grid gap-2 sm:grid-cols-3">
          {(
            Object.entries(TRAINING_EXPERIENCE_OPTIONS) as [
              TrainingExperienceLevel,
              (typeof TRAINING_EXPERIENCE_OPTIONS)[TrainingExperienceLevel],
            ][]
          ).map(([key, option]) => (
            <button
              key={key}
              type="button"
              onClick={() =>
                setProfile({ ...profile, experienceLevel: key })
              }
              className={cn(
                "border px-3 py-3 text-start text-sm transition-colors",
                profile.experienceLevel === key
                  ? "border-red-500/40 bg-red-500/10 text-white"
                  : "border-white/10 text-white/60 hover:border-white/20 hover:text-white",
              )}
            >
              <span className="block font-medium">{option.label}</span>
              <span className="mt-1 block text-xs text-white/45">
                {option.difficultyHint}
              </span>
            </button>
          ))}
        </div>
      </Field>

      <Field label="חולשות לאימון (אופציונלי)">
        <div className="flex flex-wrap gap-2">
          {(
            Object.entries(TRAINING_WEAKNESS_OPTIONS) as [
              TrainingWeakness,
              (typeof TRAINING_WEAKNESS_OPTIONS)[TrainingWeakness],
            ][]
          ).map(([key, option]) => {
            const active = profile.weaknesses.includes(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleWeakness(key)}
                className={cn(
                  "border px-3 py-1.5 text-xs transition-colors",
                  active
                    ? "border-accent/40 bg-accent/10 text-white"
                    : "border-white/10 text-white/55 hover:text-white",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </Field>

      <p className="text-xs leading-relaxed text-white/40">
        הסימולציה ב-Arena תתאים לקוחות, התנגדויות ולחץ לפי הפרופיל הזה. כל
        &quot;התחל שיחה&quot; יוצר סיטואציה חדשה ורנדומלית.
      </p>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 font-brand text-[9px] tracking-[0.12em] text-white/45">
        {label}
      </p>
      {children}
    </div>
  );
}
