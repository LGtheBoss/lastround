"use client";

import { useState } from "react";
import type {
  FloatingFeedbackTone,
  FloatingFeedbackTrigger,
} from "@/app/components/feedback/FloatingFeedbackProvider";
import Panel from "../ui/Panel";
import {
  ACTION_ICON_STROKE,
  BeerIcon,
  GambleIcon,
  ShotIcon,
  SmokeIcon,
} from "./icons";

type RadialActionMenuProps = {
  handleBeer: () => void;
  handleShot: () => void;
  handleCigarette: () => void;
  openGambleInput: (originRect: DOMRect) => void;
  triggerFloatingFeedback: (payload: FloatingFeedbackTrigger) => void;
  gambleAnimationToken: number;
};

type ActionName = "beer" | "shot" | "smoke" | "gamble";

type ActionConfig = {
  label: string;
  name: ActionName;
  position: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const ACTION_BUTTON_SIZE = "h-[9.5rem] w-[9.5rem]";
const ACTION_ICON_SIZE = "h-[5.15rem] w-[5.15rem]";
const SMOKE_ICON_SIZE = "h-[5.4rem] w-[5.4rem]";
const GAMBLE_ICON_SIZE = "h-[5.05rem] w-[5.7rem]";
const ACTION_ZONE_SIZE = "h-[420px] w-[420px]";
const CONNECTOR_SIZE = "h-[226px] w-[226px]";

function ActionIcon({
  name,
  animateVersion,
}: {
  name: ActionName;
  animateVersion: number;
}) {
  const icon =
    name === "beer" ? (
      <BeerIcon
        className={ACTION_ICON_SIZE}
        strokeWidth={ACTION_ICON_STROKE}
      />
    ) : name === "shot" ? (
      <ShotIcon
        className={ACTION_ICON_SIZE}
        strokeWidth={ACTION_ICON_STROKE}
      />
    ) : name === "smoke" ? (
      <SmokeIcon
        className={SMOKE_ICON_SIZE}
        strokeWidth={ACTION_ICON_STROKE}
      />
    ) : (
      <GambleIcon
        className={GAMBLE_ICON_SIZE}
        strokeWidth={ACTION_ICON_STROKE}
      />
    );

  return (
    <span
      key={`${name}-${animateVersion}`}
      className={
        animateVersion > 0
          ? `action-icon-wrap action-icon-anim action-icon-anim-${name}`
          : "action-icon-wrap action-icon-idle"
      }
    >
      {icon}
    </span>
  );
}

function ActionBubble({
  label,
  name,
  position,
  onClick,
  animateVersion,
}: ActionConfig & { animateVersion: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`action-button absolute ${ACTION_BUTTON_SIZE} ${position}`}
    >
      <span className="action-button-surface">
        <span
          className={`action-icon-layer action-icon-layer-${name} text-[var(--theme-accent)]`}
        >
          <ActionIcon name={name} animateVersion={animateVersion} />
        </span>
        <span className="action-label text-[var(--theme-text-secondary)]">
          {label}
        </span>
      </span>
    </button>
  );
}

export default function RadialActionMenu({
  handleBeer,
  handleShot,
  handleCigarette,
  openGambleInput,
  triggerFloatingFeedback,
  gambleAnimationToken,
}: RadialActionMenuProps) {
  const [animationVersions, setAnimationVersions] = useState<
    Record<ActionName, number>
  >({
    beer: 0,
    shot: 0,
    smoke: 0,
    gamble: 0,
  });

  const triggerAnimation = (name: ActionName) => {
    setAnimationVersions((current) => ({
      ...current,
      [name]: current[name] + 1,
    }));
  };

  const runAction = (
    name: ActionName,
    action: () => void,
    feedback: string,
    tone: FloatingFeedbackTone = "accent",
    event?: React.MouseEvent<HTMLButtonElement>
  ) => {
    triggerAnimation(name);
    action();
    const rect = event?.currentTarget.getBoundingClientRect();
    if (rect) {
      triggerFloatingFeedback({
        label: feedback,
        tone,
        originRect: rect,
        anchorKey: name,
      });
    }
  };

  const actions: ActionConfig[] = [
    {
      label: "Smoke",
      name: "smoke",
      position: "left-1/2 top-0 -translate-x-1/2",
      onClick: (event) =>
        runAction("smoke", handleCigarette, "+1 Smoke", "accent", event),
    },
    {
      label: "Beer",
      name: "beer",
      position: "left-0 top-1/2 -translate-y-1/2",
      onClick: (event) =>
        runAction("beer", handleBeer, "+1 Beer", "accent", event),
    },
    {
      label: "Shot",
      name: "shot",
      position: "right-0 top-1/2 -translate-y-1/2",
      onClick: (event) =>
        runAction("shot", handleShot, "+1 Shot", "accent", event),
    },
    {
      label: "Gamble",
      name: "gamble",
      position: "bottom-0 left-1/2 -translate-x-1/2",
      onClick: (event) => openGambleInput(event.currentTarget.getBoundingClientRect()),
    },
  ];

  return (
    <Panel className="mb-4">
      <div className="relative flex min-h-[452px] items-center justify-center overflow-hidden px-1 py-5">
        <div className="absolute inset-3 rounded-[40px] bg-[radial-gradient(circle,_var(--theme-accent-soft)_0%,_rgba(0,0,0,0)_75%)]" />

        <div className={`relative ${ACTION_ZONE_SIZE}`}>
          <div
            className={`absolute left-1/2 top-1/2 ${CONNECTOR_SIZE} -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[38px] border border-[var(--theme-border)] bg-[var(--theme-surface-muted)]`}
          />

          {actions.map((action) => (
            <ActionBubble
              key={action.label}
              {...action}
              animateVersion={
                action.name === "gamble"
                  ? gambleAnimationToken
                  : animationVersions[action.name]
              }
            />
          ))}
        </div>
      </div>
    </Panel>
  );
}
