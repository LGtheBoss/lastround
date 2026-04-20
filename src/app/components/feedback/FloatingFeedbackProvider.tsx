"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import FloatingFeedbackLayer from "./FloatingFeedbackLayer";

export type FloatingFeedbackTone = "accent" | "positive" | "negative";

export type FloatingFeedbackTrigger = {
  label: string;
  tone?: FloatingFeedbackTone;
  originRect: DOMRect;
  anchorKey?: string;
};

type FloatingFeedbackItem = {
  id: number;
  label: string;
  tone: FloatingFeedbackTone;
  anchorKey: string;
  x: number;
  y: number;
  delayMs: number;
};

type FloatingFeedbackContextValue = {
  triggerFloatingFeedback: (payload: FloatingFeedbackTrigger) => void;
};

const FloatingFeedbackContext =
  createContext<FloatingFeedbackContextValue | null>(null);

const LIFETIME_MS = 1600;

export function FloatingFeedbackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<FloatingFeedbackItem[]>([]);

  const triggerFloatingFeedback = useCallback(
    ({
      label,
      tone = "accent",
      originRect,
      anchorKey,
    }: FloatingFeedbackTrigger) => {
      const id = Date.now() + Math.random();
      const rawX = Math.round(originRect.left + originRect.width / 2);
      const baseY = originRect.top - 10;
      const resolvedAnchorKey =
        anchorKey ?? `${rawX}:${Math.round(originRect.top)}`;

      setItems((current) => {
        const anchorItem = current.find(
          (item) => item.anchorKey === resolvedAnchorKey
        );
        const x = anchorItem ? anchorItem.x : rawX;
        const stackIndex = current.filter(
          (item) => item.anchorKey === resolvedAnchorKey
        ).length;

        return [
          ...current,
          {
            id,
            label,
            tone,
            anchorKey: resolvedAnchorKey,
            x,
            y: baseY - stackIndex * 8,
            delayMs: stackIndex * 45,
          },
        ];
      });

      window.setTimeout(() => {
        setItems((current) => current.filter((item) => item.id !== id));
      }, LIFETIME_MS);
    },
    []
  );

  const value = useMemo(
    () => ({
      triggerFloatingFeedback,
    }),
    [triggerFloatingFeedback]
  );

  return (
    <FloatingFeedbackContext.Provider value={value}>
      {children}
      <FloatingFeedbackLayer items={items} />
    </FloatingFeedbackContext.Provider>
  );
}

export function useFloatingFeedback() {
  const context = useContext(FloatingFeedbackContext);

  if (!context) {
    throw new Error(
      "useFloatingFeedback must be used within FloatingFeedbackProvider"
    );
  }

  return context;
}
