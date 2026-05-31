"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_USER_TRAINING_PROFILE,
  sanitizeUserTrainingProfile,
  type UserTrainingProfile,
} from "@/config/user-training-profile";

const STORAGE_KEY = "sales-waroom-training-profile";

function loadProfile(): UserTrainingProfile {
  if (typeof window === "undefined") return { ...DEFAULT_USER_TRAINING_PROFILE };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_USER_TRAINING_PROFILE };
    return sanitizeUserTrainingProfile(JSON.parse(raw));
  } catch {
    return { ...DEFAULT_USER_TRAINING_PROFILE };
  }
}

export function useUserTrainingProfile() {
  const [profile, setProfileState] = useState<UserTrainingProfile>(
    DEFAULT_USER_TRAINING_PROFILE,
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProfileState(loadProfile());
    setReady(true);
  }, []);

  const setProfile = useCallback((next: UserTrainingProfile) => {
    const sanitized = sanitizeUserTrainingProfile(next);
    setProfileState(sanitized);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
  }, []);

  const updateProfile = useCallback((patch: Partial<UserTrainingProfile>) => {
    setProfileState((current) => {
      const sanitized = sanitizeUserTrainingProfile({ ...current, ...patch });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
      return sanitized;
    });
  }, []);

  return { profile, setProfile, updateProfile, ready };
}
