import type { NightEvent } from "@/app/lib/types";
import Panel from "../ui/Panel";
import SectionEyebrow from "../ui/SectionEyebrow";

type RecentEventsCardProps = {
  events: NightEvent[];
  getEventLabel: (event: NightEvent) => string;
  formatEventTime: (timestamp: string) => string;
};

export default function RecentEventsCard({
  events,
  getEventLabel,
  formatEventTime,
}: RecentEventsCardProps) {
  return (
    <Panel className="mb-4">
      <div className="flex items-center justify-between gap-3">
        <SectionEyebrow>Recent Events</SectionEyebrow>
        <span className="text-sm text-zinc-500">{events.length} total</span>
      </div>

      {events.length === 0 ? (
        <p className="mt-4 text-base text-zinc-400">No events yet.</p>
      ) : (
        <div className="mt-4 space-y-2">
          {events.slice(0, 5).map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between gap-3 rounded-[22px] border border-white/[0.05] bg-white/[0.03] px-4 py-3"
            >
              <span className="text-base font-medium text-white">
                {getEventLabel(event)}
              </span>
              <span className="text-sm text-zinc-400">
                {formatEventTime(event.timestamp)}
              </span>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}
