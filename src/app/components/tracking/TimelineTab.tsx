"use client";

import { useMemo } from "react";
import type { NightEvent } from "@/app/lib/types";
import Panel from "../ui/Panel";
import SectionEyebrow from "../ui/SectionEyebrow";

type TimelineTabProps = {
  events: NightEvent[];
  getEventLabel: (event: NightEvent) => string;
  formatEventTime: (timestamp: string) => string;
};

export default function TimelineTab({
  events,
  getEventLabel,
  formatEventTime,
}: TimelineTabProps) {
  const chronologicalEvents = useMemo(
    () =>
      [...events].sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      ),
    [events]
  );

  return (
    <Panel className="mb-4">
      <div className="flex items-center justify-between gap-3">
        <SectionEyebrow>Timeline</SectionEyebrow>
        <span className="text-sm text-[var(--theme-text-muted)]">
          {events.length} total
        </span>
      </div>

      {chronologicalEvents.length === 0 ? (
        <p className="mt-4 text-base text-[var(--theme-text-secondary)]">
          No events yet.
        </p>
      ) : (
        <div className="mt-4 space-y-2">
          {chronologicalEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between gap-3 rounded-[22px] border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] px-4 py-3"
            >
              <span className="text-base font-medium text-[var(--theme-text-primary)]">
                {getEventLabel(event)}
              </span>
              <span className="text-sm text-[var(--theme-text-secondary)]">
                {formatEventTime(event.timestamp)}
              </span>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}
