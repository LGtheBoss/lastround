import { useState } from "react";
import { formatCurrency } from "@/app/lib/formatters";
import AppShell from "./ui/AppShell";
import Panel from "./ui/Panel";
import SectionEyebrow from "./ui/SectionEyebrow";

type EventType = "beer" | "shot" | "cigarette" | "gamble";

type NightEvent = {
  id: string;
  type: EventType;
  value?: number;
  timestamp: string;
};

type RoundUpScreenProps = {
  rank: string;
  degeneracyScore: number;
  highlightText: string;
  beers: number;
  shots: number;
  cigarettes: number;
  gambleTotal: number;
  peakBacText: string;
  peakTimeText: string;
  startTimeText: string;
  endTimeText: string;
  durationText: string;
  copyMessage: string;
  handleCopyShareText: () => void;
  name: string;
  gender: string;
  weight: string;
  height: string;
  events: NightEvent[];
  getEventLabel: (event: NightEvent) => string;
  formatEventTime: (timestamp: string) => string;
  backToStart: () => void;
  continueNight: () => void;
};

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl bg-[var(--theme-surface-muted)] p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--theme-text-muted)]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-black">{value}</p>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-[var(--theme-text-secondary)]">{label}</span>
      <span className="font-semibold text-[var(--theme-text-primary)]">
        {value}
      </span>
    </div>
  );
}

export default function RoundUpScreen({
  rank,
  degeneracyScore,
  highlightText,
  beers,
  shots,
  cigarettes,
  gambleTotal,
  peakBacText,
  peakTimeText,
  startTimeText,
  endTimeText,
  durationText,
  copyMessage,
  handleCopyShareText,
  name,
  gender,
  weight,
  height,
  events,
  getEventLabel,
  formatEventTime,
  backToStart,
  continueNight,
}: RoundUpScreenProps) {
  const [timelineExpanded, setTimelineExpanded] = useState(false);
  const visibleEvents = timelineExpanded ? events : events.slice(0, 5);

  return (
    <AppShell>
      <div className="w-full space-y-5">
        <Panel className="space-y-5">
          <div className="space-y-2 text-center">
            <SectionEyebrow className="tracking-[0.35em]">
              LastRound
            </SectionEyebrow>
            <h1 className="text-5xl font-black tracking-tight text-[var(--theme-accent)]">
              RoundUp
            </h1>
            <p className="text-lg text-[var(--theme-text-secondary)]">
              Tonight&apos;s Damage Report
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MetricCard label="Rank" value={rank} />
            <MetricCard label="Score" value={degeneracyScore} />
          </div>

          <div className="rounded-2xl bg-[var(--theme-surface-muted)] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--theme-text-muted)]">
              Highlight
            </p>
            <p className="mt-2 text-lg font-bold">{highlightText}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MetricCard label="Beers" value={beers} />
            <MetricCard label="Shots" value={shots} />
            <MetricCard label="Cigarettes" value={cigarettes} />
            <MetricCard label="Gamble P/L" value={formatCurrency(gambleTotal)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MetricCard label="Peak BAC" value={peakBacText} />
            <MetricCard label="Peak Time" value={peakTimeText} />
          </div>

          <div className="rounded-2xl bg-[var(--theme-surface-muted)] p-4">
            <div className="space-y-2">
              <InfoRow label="Started" value={startTimeText} />
              <InfoRow label="Ended" value={endTimeText} />
              <InfoRow label="Duration" value={durationText} />
            </div>
          </div>
        </Panel>

        <Panel>
          <SectionEyebrow>Share</SectionEyebrow>
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={handleCopyShareText}
              className="rounded-2xl bg-[var(--theme-button-bg)] px-5 py-4 text-lg font-bold text-[var(--theme-accent-contrast)] transition active:scale-95"
            >
              Share RoundUp
            </button>
            {copyMessage ? (
              <span className="text-sm text-[var(--theme-text-secondary)]">
                {copyMessage}
              </span>
            ) : null}
          </div>
        </Panel>

        <Panel>
          <SectionEyebrow>Profile</SectionEyebrow>
          <div className="mt-3 space-y-2">
            <InfoRow label="Name" value={name || "--"} />
            <InfoRow label="Gender" value={gender || "--"} />
            <InfoRow label="Weight" value={`${weight || "--"} kg`} />
            <InfoRow label="Height" value={`${height || "--"} cm`} />
          </div>
        </Panel>

        <Panel>
          <div className="flex items-center justify-between gap-3">
            <SectionEyebrow>Timeline</SectionEyebrow>
            {events.length > 5 ? (
              <button
                type="button"
                onClick={() => setTimelineExpanded((value) => !value)}
                className="text-sm font-semibold text-[var(--theme-accent)]"
              >
                {timelineExpanded ? "Show less" : "Show full timeline"}
              </button>
            ) : null}
          </div>

          {events.length === 0 ? (
            <p className="mt-3 text-sm text-[var(--theme-text-secondary)]">
              No events logged.
            </p>
          ) : (
            <div className="mt-3 space-y-2">
              {visibleEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between rounded-2xl bg-[var(--theme-surface-muted)] px-3 py-2 text-sm"
                >
                  <span>{getEventLabel(event)}</span>
                  <span className="text-[var(--theme-text-secondary)]">
                    {formatEventTime(event.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Panel>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={continueNight}
            className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] py-4 text-lg font-bold text-[var(--theme-text-primary)] transition active:scale-95"
          >
            Continue Night
          </button>

          <button
            type="button"
            onClick={backToStart}
            className="rounded-2xl bg-[var(--theme-button-bg)] py-4 text-lg font-bold text-[var(--theme-accent-contrast)] transition active:scale-95"
          >
            Start New Night
          </button>
        </div>
      </div>
    </AppShell>
  );
}
