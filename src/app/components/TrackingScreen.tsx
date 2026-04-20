"use client";

import { useState } from "react";
import { formatSignedValue } from "@/app/lib/formatters";
import { useFloatingFeedback } from "@/app/components/feedback/FloatingFeedbackProvider";
import type { NightEvent } from "@/app/lib/types";
import BacHeroCard from "./tracking/BacHeroCard";
import BacInfoModal from "./tracking/BacInfoModal";
import GamblingModal from "./tracking/GamblingModal";
import ProfileSummaryCard from "./tracking/ProfileSummaryCard";
import RadialActionMenu from "./tracking/RadialActionMenu";
import TimelineTab from "./tracking/TimelineTab";
import TrackingHeader from "./tracking/TrackingHeader";
import TrackingTabs from "./tracking/TrackingTabs";
import AppShell from "./ui/AppShell";

type Props = {
  name: string;
  gender: string;
  weight: string;
  height: string;
  currentBac: string;
  peakBacText?: string;
  beers: number;
  shots: number;
  cigarettes: number;
  gambleTotal: number;
  startTimeText: string;
  events: NightEvent[];
  showGambleInput: boolean;
  gambleInput: string;
  gambleDraft: number;
  setGambleInput: (value: string) => void;
  addQuickGambleAmount: (amount: number) => void;
  commitCustomGambleAmount: () => number | null;
  clearGambleDraft: () => void;
  handleBeer: () => void;
  handleShot: () => void;
  handleCigarette: () => void;
  openGambleInput: () => void;
  confirmGamble: () => void;
  cancelGamble: () => void;
  endNight: () => void;
  getEventLabel: (event: NightEvent) => string;
  formatEventTime: (timestamp: string) => string;
};

export default function TrackingScreen(props: Props) {
  const [showInfo, setShowInfo] = useState(false);
  const [activeTab, setActiveTab] = useState<"track" | "timeline">("track");
  const [gambleOriginRect, setGambleOriginRect] = useState<DOMRect | null>(null);
  const [gambleAnimationToken, setGambleAnimationToken] = useState(0);
  const { triggerFloatingFeedback } = useFloatingFeedback();

  const handleOpenGambleInput = (originRect: DOMRect) => {
    setGambleOriginRect(originRect);
    props.openGambleInput();
  };

  const handleConfirmGamble = () => {
    if (props.gambleDraft === 0) return;

    const tone = props.gambleDraft > 0 ? "positive" : "negative";
    const message = `${formatSignedValue(props.gambleDraft)}\u20ac`;

    props.confirmGamble();
    setGambleAnimationToken((value) => value + 1);

    if (gambleOriginRect) {
      triggerFloatingFeedback({
        label: message,
        tone,
        originRect: gambleOriginRect,
        anchorKey: "gamble",
      });
    }
  };

  const handleCommitCustomGamble = () => {
    const amount = props.commitCustomGambleAmount();

    if (!amount) return false;

    const tone = amount > 0 ? "positive" : "negative";
    const message = `${formatSignedValue(amount)}\u20ac`;

    setGambleAnimationToken((value) => value + 1);

    if (gambleOriginRect) {
      triggerFloatingFeedback({
        label: message,
        tone,
        originRect: gambleOriginRect,
        anchorKey: "gamble",
      });
    }

    return true;
  };

  return (
    <AppShell>
      <TrackingHeader startTimeText={props.startTimeText} />
      <TrackingTabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "track" ? (
        <>
          <BacHeroCard
            currentBac={props.currentBac}
            peakBacText={props.peakBacText}
            onOpenInfo={() => setShowInfo(true)}
          />
          <ProfileSummaryCard
            name={props.name}
            gender={props.gender}
            weight={props.weight}
            height={props.height}
          />
          <RadialActionMenu
            handleBeer={props.handleBeer}
            handleShot={props.handleShot}
            handleCigarette={props.handleCigarette}
            openGambleInput={handleOpenGambleInput}
            triggerFloatingFeedback={triggerFloatingFeedback}
            gambleAnimationToken={gambleAnimationToken}
          />
        </>
      ) : (
        <TimelineTab
          events={props.events}
          getEventLabel={props.getEventLabel}
          formatEventTime={props.formatEventTime}
        />
      )}

      <div className="pt-2">
        <button
          type="button"
          onClick={props.endNight}
          className="w-full rounded-2xl bg-[var(--theme-button-bg)] py-4 text-xl font-bold text-[var(--theme-accent-contrast)] transition active:scale-95"
        >
          End Night
        </button>
      </div>

      {showInfo ? <BacInfoModal onClose={() => setShowInfo(false)} /> : null}

      {props.showGambleInput ? (
        <GamblingModal
          gambleInput={props.gambleInput}
          gambleDraft={props.gambleDraft}
          setGambleInput={props.setGambleInput}
          addQuickGambleAmount={props.addQuickGambleAmount}
          commitCustomGambleAmount={handleCommitCustomGamble}
          clearGambleDraft={props.clearGambleDraft}
          cancelGamble={props.cancelGamble}
          confirmGamble={handleConfirmGamble}
        />
      ) : null}
    </AppShell>
  );
}
