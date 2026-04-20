"use client";

import { themes } from "@/app/lib/themes";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeSwitcher() {
  const { themeName, setThemeName } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-4 top-4 z-[70] flex items-center gap-2 rounded-full border border-[var(--theme-border)] bg-[var(--theme-floating-bg)] px-3 py-2 text-sm font-semibold text-[var(--theme-text-primary)] shadow-[var(--theme-shadow)] backdrop-blur"
        aria-label="Choose theme"
      >
        <span
          className="h-2.5 w-2.5 rounded-full border border-[var(--theme-border)]"
          style={{ backgroundColor: "var(--theme-accent)" }}
        />
        Theme
      </button>

      {open ? (
        <div className="fixed inset-0 z-[80] flex items-start justify-end bg-[var(--theme-overlay)] px-4 py-20">
          <div className="w-full max-w-[220px] rounded-[24px] border border-[var(--theme-border)] bg-[var(--theme-surface)] p-3 shadow-[var(--theme-shadow)]">
            <div className="mb-2 flex items-center justify-between gap-3 px-2 py-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--theme-text-muted)]">
                Theme
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm font-semibold text-[var(--theme-text-secondary)]"
              >
                Close
              </button>
            </div>

            <div className="space-y-2">
              {Object.values(themes).map((theme) => {
                const selected = theme.name === themeName;

                return (
                  <button
                    key={theme.name}
                    type="button"
                    onClick={() => {
                      setThemeName(theme.name);
                      setOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-[18px] border px-3 py-3 text-left transition"
                    style={{
                      borderColor: selected
                        ? "var(--theme-accent)"
                        : "var(--theme-border)",
                      background: selected
                        ? "var(--theme-accent-soft)"
                        : "var(--theme-surface-muted)",
                      color: "var(--theme-text-primary)",
                    }}
                  >
                    <span className="font-semibold">{theme.label}</span>
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: theme.accent }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
