"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useAccessibility } from "@/providers/accessibility-provider";
import { accessibilityTools } from "@/config/accessibility-settings";

function AccessibilityIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM4.5 10a1.5 1.5 0 0 0 0 3H9v7.5a1.5 1.5 0 0 0 3 0V13h2v7.5a1.5 1.5 0 0 0 3 0V13h2.5a1.5 1.5 0 0 0 0-3H4.5z" />
    </svg>
  );
}

function ToolButton({
  active,
  label,
  description,
  onClick,
}: {
  active?: boolean;
  label: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active === undefined ? undefined : active}
      className={cn(
        "flex w-full flex-col gap-1 border px-3 py-3 text-start transition-colors",
        active
          ? "border-accent/40 bg-accent/10 text-white"
          : "border-white/10 bg-white/[0.02] text-white/75 hover:border-white/20 hover:bg-white/[0.04]",
      )}
    >
      <span className="text-sm font-medium">{label}</span>
      <span className="text-xs text-white/40">{description}</span>
    </button>
  );
}

export function AccessibilityWidget() {
  const {
    settings,
    panelOpen,
    togglePanel,
    closePanel,
    increaseFont,
    decreaseFont,
    toggleSetting,
    resetSettings,
  } = useAccessibility();

  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!panelOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePanel();
        buttonRef.current?.focus();
      }
    };

    const onClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        closePanel();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [panelOpen, closePanel]);

  const isToggleActive = (id: string) => {
    switch (id) {
      case "highContrast":
        return settings.highContrast;
      case "highlightLinks":
        return settings.highlightLinks;
      case "readableFont":
        return settings.readableFont;
      case "lineSpacing":
        return settings.lineSpacing;
      case "reduceMotion":
        return settings.reduceMotion;
      default:
        return false;
    }
  };

  const handleTool = (id: string) => {
    switch (id) {
      case "fontIncrease":
        increaseFont();
        break;
      case "fontDecrease":
        decreaseFont();
        break;
      case "highContrast":
        toggleSetting("highContrast");
        break;
      case "highlightLinks":
        toggleSetting("highlightLinks");
        break;
      case "readableFont":
        toggleSetting("readableFont");
        break;
      case "lineSpacing":
        toggleSetting("lineSpacing");
        break;
      case "reduceMotion":
        toggleSetting("reduceMotion");
        break;
    }
  };

  return (
    <div className="a11y-widget fixed bottom-5 end-5 z-[100] flex flex-col items-end gap-3">
      {panelOpen && (
        <div
          ref={panelRef}
          id="a11y-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-panel-title"
          className="a11y-panel w-[min(100vw-2rem,320px)] border border-white/10 bg-[#0a0a0a] shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <h2
              id="a11y-panel-title"
              className="text-sm font-semibold text-white"
            >
              הגדרות נגישות
            </h2>
            <button
              type="button"
              onClick={closePanel}
              className="px-2 py-1 text-xs text-white/50 hover:text-white"
              aria-label="סגירת תפריט נגישות"
            >
              ✕
            </button>
          </div>

          <div className="max-h-[min(70vh,420px)] space-y-2 overflow-y-auto p-3">
            {accessibilityTools.map((tool) => {
              const isToggle = !["fontIncrease", "fontDecrease"].includes(
                tool.id,
              );
              return (
                <ToolButton
                  key={tool.id}
                  label={tool.label}
                  description={tool.description}
                  active={isToggle ? isToggleActive(tool.id) : undefined}
                  onClick={() => handleTool(tool.id)}
                />
              );
            })}
          </div>

          <div className="space-y-2 border-t border-white/10 p-3">
            <button
              type="button"
              onClick={resetSettings}
              className="w-full border border-white/10 px-3 py-2.5 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
            >
              איפוס הגדרות
            </button>
            <Link
              href="/accessibility"
              onClick={closePanel}
              className="block w-full border border-accent/20 bg-accent/5 px-3 py-2.5 text-center text-sm text-accent/90 transition-colors hover:bg-accent/10"
            >
              הצהרת נגישות
            </Link>
          </div>
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        onClick={togglePanel}
        aria-expanded={panelOpen}
        aria-controls="a11y-panel"
        aria-label={panelOpen ? "סגירת תפריט נגישות" : "פתיחת תפריט נגישות"}
        className={cn(
          "a11y-widget-trigger flex size-14 items-center justify-center rounded-full border-2 shadow-lg transition-all",
          panelOpen
            ? "border-accent bg-accent text-black"
            : "border-accent/60 bg-[#0a0a0a] text-accent hover:border-accent hover:bg-accent/10",
        )}
      >
        <AccessibilityIcon className="size-7" />
      </button>
    </div>
  );
}
