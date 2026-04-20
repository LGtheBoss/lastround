import { useState } from "react";
import { formatSignedValue } from "@/app/lib/formatters";
import Panel from "../ui/Panel";

type GamblingModalProps = {
  gambleInput: string;
  gambleDraft: number;
  setGambleInput: (value: string) => void;
  addQuickGambleAmount: (amount: number) => void;
  commitCustomGambleAmount: () => boolean;
  clearGambleDraft: () => void;
  cancelGamble: () => void;
  confirmGamble: () => void;
};

function QuickButton({
  label,
  onClick,
  tone,
}: {
  label: string;
  onClick: () => void;
  tone: "positive" | "negative";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl border py-4 text-lg font-bold transition active:scale-95"
      style={{
        borderColor:
          tone === "positive"
            ? "var(--theme-positive-soft)"
            : "var(--theme-negative-soft)",
        backgroundColor:
          tone === "positive"
            ? "var(--theme-positive-soft)"
            : "var(--theme-negative-soft)",
        color:
          tone === "positive"
            ? "var(--theme-positive)"
            : "var(--theme-negative)",
      }}
    >
      {label}
    </button>
  );
}

export default function GamblingModal({
  gambleInput,
  gambleDraft,
  setGambleInput,
  addQuickGambleAmount,
  commitCustomGambleAmount,
  clearGambleDraft,
  cancelGamble,
  confirmGamble,
}: GamblingModalProps) {
  const [showCustomInput, setShowCustomInput] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[var(--theme-overlay)] px-4 py-4 backdrop-blur-[2px] sm:items-center">
      <Panel className="w-full max-w-md bg-[linear-gradient(180deg,rgba(10,10,10,0.985)_0%,rgba(6,6,6,0.995)_100%)] shadow-[0_28px_90px_rgba(0,0,0,0.62)]">
        <h2 className="text-3xl font-black text-[var(--theme-text-primary)]">
          Gambling
        </h2>

        <div className="mt-4 rounded-[22px] border border-[var(--theme-border)] bg-[rgba(255,255,255,0.045)] p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--theme-text-muted)]">
            Preview
          </p>
          <p className="mt-2 text-4xl font-black text-[var(--theme-text-primary)]">
            {formatSignedValue(gambleDraft)}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <QuickButton
            label="+5"
            tone="positive"
            onClick={() => addQuickGambleAmount(5)}
          />
          <QuickButton
            label="+20"
            tone="positive"
            onClick={() => addQuickGambleAmount(20)}
          />
          <QuickButton
            label="+50"
            tone="positive"
            onClick={() => addQuickGambleAmount(50)}
          />
          <QuickButton
            label="-5"
            tone="negative"
            onClick={() => addQuickGambleAmount(-5)}
          />
          <QuickButton
            label="-20"
            tone="negative"
            onClick={() => addQuickGambleAmount(-20)}
          />
          <QuickButton
            label="-50"
            tone="negative"
            onClick={() => addQuickGambleAmount(-50)}
          />
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowCustomInput(true)}
            className="w-full rounded-2xl border border-[var(--theme-border)] bg-[rgba(255,255,255,0.04)] px-5 py-4 text-base font-bold text-[var(--theme-text-primary)] transition active:scale-95"
          >
            Custom
          </button>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={clearGambleDraft}
            className="rounded-2xl border border-[var(--theme-border)] bg-[rgba(255,255,255,0.04)] py-4 text-base font-bold text-[var(--theme-text-primary)] transition active:scale-95"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={cancelGamble}
            className="rounded-2xl border border-[var(--theme-border)] bg-[rgba(255,255,255,0.04)] py-4 text-base font-bold text-[var(--theme-text-primary)] transition active:scale-95"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmGamble}
            className="rounded-2xl bg-[var(--theme-button-bg)] py-4 text-base font-bold text-[var(--theme-accent-contrast)] transition active:scale-95"
          >
            Confirm
          </button>
        </div>
      </Panel>

      {showCustomInput ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--theme-overlay)] px-6 backdrop-blur-[2px]">
          <Panel className="w-full max-w-xs bg-[linear-gradient(180deg,rgba(10,10,10,0.99)_0%,rgba(6,6,6,0.995)_100%)] shadow-[0_28px_90px_rgba(0,0,0,0.62)]">
            <h3 className="text-2xl font-black text-[var(--theme-text-primary)]">
              Custom
            </h3>
            <div className="mt-4">
              <input
                type="number"
                inputMode="decimal"
                value={gambleInput}
                onChange={(event) => setGambleInput(event.target.value)}
                placeholder="Enter amount"
                className="w-full rounded-2xl border border-[var(--theme-border)] bg-[rgba(255,255,255,0.045)] px-4 py-4 text-lg text-[var(--theme-text-primary)] outline-none transition placeholder:text-[var(--theme-text-muted)] focus:border-[var(--theme-accent)]"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShowCustomInput(false)}
                className="rounded-2xl border border-[var(--theme-border)] bg-[rgba(255,255,255,0.04)] py-4 text-base font-bold text-[var(--theme-text-primary)] transition active:scale-95"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const didCommit = commitCustomGambleAmount();
                  if (didCommit) {
                    setShowCustomInput(false);
                  }
                }}
                className="rounded-2xl bg-[var(--theme-button-bg)] py-4 text-base font-bold text-[var(--theme-accent-contrast)] transition active:scale-95"
              >
                Add
              </button>
            </div>
          </Panel>
        </div>
      ) : null}
    </div>
  );
}
