type TrackingTabsProps = {
  activeTab: "track" | "timeline";
  onChange: (tab: "track" | "timeline") => void;
};

export default function TrackingTabs({
  activeTab,
  onChange,
}: TrackingTabsProps) {
  return (
    <div className="mb-4 grid grid-cols-2 gap-3 rounded-[24px] border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] p-2">
      {(["track", "timeline"] as const).map((tab) => {
        const selected = activeTab === tab;

        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className={`rounded-[18px] px-4 py-3 text-base font-semibold capitalize transition ${
              selected
                ? "bg-[var(--theme-button-bg)] text-[var(--theme-accent-contrast)] shadow-[var(--theme-shadow)]"
                : "bg-transparent text-[var(--theme-text-secondary)]"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
