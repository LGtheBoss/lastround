import Panel from "../ui/Panel";
import SectionEyebrow from "../ui/SectionEyebrow";

type BacInfoModalProps = {
  onClose: () => void;
};

export default function BacInfoModal({ onClose }: BacInfoModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--theme-overlay)] px-4">
      <Panel className="w-full max-w-sm">
        <SectionEyebrow>BAC Info</SectionEyebrow>
        <h2 className="mt-3 text-3xl font-black text-[var(--theme-text-primary)]">
          Live BAC Estimate
        </h2>
        <p className="mt-3 text-base leading-7 text-[var(--theme-text-secondary)]">
          Estimated from your profile, tonight&apos;s drink settings, logged
          drinks, and time elapsed.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-2xl bg-[var(--theme-button-bg)] py-4 text-lg font-bold text-[var(--theme-accent-contrast)] transition active:scale-95"
        >
          Close
        </button>
      </Panel>
    </div>
  );
}
