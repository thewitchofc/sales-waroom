"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  A11Y_STORAGE_KEY,
  defaultAccessibilitySettings,
  type AccessibilitySettings,
} from "@/config/accessibility-settings";

interface AccessibilityContextValue {
  settings: AccessibilitySettings;
  panelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  togglePanel: () => void;
  increaseFont: () => void;
  decreaseFont: () => void;
  toggleSetting: (key: keyof Omit<AccessibilitySettings, "fontScale">) => void;
  resetSettings: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

function loadSettings(): AccessibilitySettings {
  if (typeof window === "undefined") return defaultAccessibilitySettings;
  try {
    const raw = localStorage.getItem(A11Y_STORAGE_KEY);
    if (!raw) return defaultAccessibilitySettings;
    return { ...defaultAccessibilitySettings, ...JSON.parse(raw) };
  } catch {
    return defaultAccessibilitySettings;
  }
}

function applySettingsToDocument(settings: AccessibilitySettings) {
  const root = document.documentElement;
  root.classList.remove("a11y-font-1", "a11y-font-2");
  if (settings.fontScale === 1) root.classList.add("a11y-font-1");
  if (settings.fontScale === 2) root.classList.add("a11y-font-2");

  root.classList.toggle("a11y-high-contrast", settings.highContrast);
  root.classList.toggle("a11y-highlight-links", settings.highlightLinks);
  root.classList.toggle("a11y-readable-font", settings.readableFont);
  root.classList.toggle("a11y-line-spacing", settings.lineSpacing);
  root.classList.toggle("a11y-reduce-motion", settings.reduceMotion);
}

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultAccessibilitySettings);
  const [panelOpen, setPanelOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loaded = loadSettings();
    setSettings(loaded);
    applySettingsToDocument(loaded);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    applySettingsToDocument(settings);
    localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(settings));
  }, [settings, hydrated]);

  const persist = useCallback((next: AccessibilitySettings) => {
    setSettings(next);
  }, []);

  const increaseFont = useCallback(() => {
    setSettings((s) => ({ ...s, fontScale: Math.min(2, s.fontScale + 1) as 0 | 1 | 2 }));
  }, []);

  const decreaseFont = useCallback(() => {
    setSettings((s) => ({ ...s, fontScale: Math.max(0, s.fontScale - 1) as 0 | 1 | 2 }));
  }, []);

  const toggleSetting = useCallback(
    (key: keyof Omit<AccessibilitySettings, "fontScale">) => {
      setSettings((s) => ({ ...s, [key]: !s[key] }));
    },
    []
  );

  const resetSettings = useCallback(() => {
    persist(defaultAccessibilitySettings);
  }, [persist]);

  const value = useMemo(
    () => ({
      settings,
      panelOpen,
      openPanel: () => setPanelOpen(true),
      closePanel: () => setPanelOpen(false),
      togglePanel: () => setPanelOpen((o) => !o),
      increaseFont,
      decreaseFont,
      toggleSetting,
      resetSettings,
    }),
    [settings, panelOpen, increaseFont, decreaseFont, toggleSetting, resetSettings]
  );

  return (
    <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility must be used within AccessibilityProvider");
  return ctx;
}
