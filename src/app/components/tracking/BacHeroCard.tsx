import Panel from "../ui/Panel";
import SectionEyebrow from "../ui/SectionEyebrow";

type BacHeroCardProps = {
  currentBac: string;
  peakBacText?: string;
  onOpenInfo: () => void;
};

function splitBacValue(value: string) {
  const trimmed = value.trim();
  const unitMatch = trimmed.match(/[^\d.,\s+-]+$/u);
  const unit = unitMatch ? unitMatch[0] : "";
  const numberPart = unit ? trimmed.slice(0, -unit.length).trim() : trimmed;
  const separatorMatch = numberPart.match(/[.,]/);
  const separator = separatorMatch ? separatorMatch[0] : "";

  if (!separator) {
    return {
      whole: numberPart,
      separator: "",
      decimal: "",
      unit,
    };
  }

  const [whole, decimal] = numberPart.split(separator, 2);

  return {
    whole,
    separator,
    decimal: decimal ?? "",
    unit,
  };
}

export default function BacHeroCard({
  currentBac,
  peakBacText,
  onOpenInfo,
}: BacHeroCardProps) {
  const { whole, separator, decimal, unit } = splitBacValue(currentBac);

  return (
    <Panel className="relative mb-4 overflow-hidden px-5 py-6 text-center shadow-[0_28px_90px_rgba(0,0,0,0.55)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--theme-accent-soft)_0%,_rgba(0,0,0,0)_58%)]" />
      <div className="absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,var(--theme-accent-soft)_50%,rgba(255,255,255,0)_100%)]" />

      <button
        type="button"
        onClick={onOpenInfo}
        className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--theme-border)] bg-[rgba(255,255,255,0.04)] text-[11px] font-bold text-[var(--theme-accent)] shadow-[0_10px_24px_rgba(0,0,0,0.22)] transition active:scale-95"
        aria-label="How BAC is estimated"
      >
        ?
      </button>

      <div className="relative z-[1]">
        <div className="flex items-center justify-center">
          <SectionEyebrow className="text-[0.88rem] font-bold tracking-[0.26em] text-[var(--theme-text-primary)]/88">
            Live BAC
          </SectionEyebrow>
        </div>

        <div className="mt-4 flex items-end justify-center gap-2">
          <span className="text-[4.45rem] font-black leading-none tracking-[-0.055em] text-[var(--theme-accent)] sm:text-[4.95rem]">
            {whole}
          </span>
          {separator ? (
            <span className="pb-[0.42rem] text-[3.15rem] font-black leading-none tracking-[-0.02em] text-[var(--theme-accent)]/92 sm:text-[3.45rem]">
              {separator}
            </span>
          ) : null}
          {decimal ? (
            <span className="text-[4.45rem] font-black leading-none tracking-[-0.055em] text-[var(--theme-accent)] sm:text-[4.95rem]">
              {decimal}
            </span>
          ) : null}
          {unit ? (
            <span className="pb-[0.7rem] text-[1.5rem] font-semibold leading-none text-[var(--theme-text-secondary)] sm:text-[1.68rem]">
              {unit}
            </span>
          ) : null}
        </div>

        {peakBacText ? (
          <p className="mt-4 text-sm font-medium text-[var(--theme-text-secondary)]">
            Peak tonight <span className="text-[var(--theme-text-primary)]">{peakBacText}</span>
          </p>
        ) : null}
      </div>
    </Panel>
  );
}
