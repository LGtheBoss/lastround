import Panel from "../ui/Panel";
import SectionEyebrow from "../ui/SectionEyebrow";

type TrackingHeaderProps = {
  startTimeText: string;
};

export default function TrackingHeader({
  startTimeText,
}: TrackingHeaderProps) {
  return (
    <Panel className="mb-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <SectionEyebrow>LastRound</SectionEyebrow>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-[var(--theme-accent)]">
            Night in Progress
          </h1>
          <p className="mt-2 text-center text-base text-[var(--theme-text-secondary)]">
            Every night has a LastRound.
          </p>
        </div>

        <div className="shrink-0 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] px-4 py-3 text-right">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--theme-text-muted)]">
            Started
          </p>
          <p className="mt-1 text-lg font-bold text-[var(--theme-text-primary)]">
            {startTimeText}
          </p>
        </div>
      </div>
    </Panel>
  );
}
