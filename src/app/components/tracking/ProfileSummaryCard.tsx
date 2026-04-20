import Panel from "../ui/Panel";
import SectionEyebrow from "../ui/SectionEyebrow";

type ProfileSummaryCardProps = {
  name: string;
  gender: string;
  weight: string;
  height: string;
};

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-[var(--theme-surface-muted)] px-4 py-3">
      <span className="text-sm text-[var(--theme-text-secondary)]">{label}</span>
      <span className="text-base font-semibold text-[var(--theme-text-primary)]">
        {value}
      </span>
    </div>
  );
}

export default function ProfileSummaryCard({
  name,
  gender,
  weight,
  height,
}: ProfileSummaryCardProps) {
  return (
    <Panel className="mb-4">
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
          <div>
            <SectionEyebrow>Profile</SectionEyebrow>
            <p className="mt-2 text-xl font-bold text-[var(--theme-text-primary)]">
              {name || "Player"}
            </p>
          </div>
          <span className="rounded-full border border-[var(--theme-border)] px-3 py-1 text-sm font-medium text-[var(--theme-text-secondary)] transition group-open:border-[var(--theme-accent)] group-open:text-[var(--theme-accent)]">
            <span className="group-open:hidden">Show</span>
            <span className="hidden group-open:inline">Hide</span>
          </span>
        </summary>

        <div className="mt-4 space-y-2">
          <StatRow label="Name" value={name || "--"} />
          <StatRow label="Gender" value={gender || "--"} />
          <StatRow label="Weight" value={weight ? `${weight} kg` : "--"} />
          <StatRow label="Height" value={height ? `${height} cm` : "--"} />
        </div>
      </details>
    </Panel>
  );
}
