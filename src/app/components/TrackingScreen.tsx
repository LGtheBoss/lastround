type EventType = "beer" | "shot" | "cigarette" | "gamble";

type NightEvent = {
  id: string;
  type: EventType;
  value?: number;
  timestamp: string;
};

type TrackingScreenProps = {
  name: string;
  gender: string;
  weight: string;
  height: string;
  currentBac: string;
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
  addCustomGambleAmount: () => void;
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

function StatRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-zinc-400">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}

function formatDraft(value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value}`;
}

export default function TrackingScreen({
  name,
  gender,
  weight,
  height,
  currentBac,
  beers,
  shots,
  cigarettes,
  gambleTotal,
  startTimeText,
  events,
  showGambleInput,
  gambleInput,
  gambleDraft,
  setGambleInput,
  addQuickGambleAmount,
  addCustomGambleAmount,
  clearGambleDraft,
  handleBeer,
  handleShot,
  handleCigarette,
  openGambleInput,
  confirmGamble,
  cancelGamble,
  endNight,
  getEventLabel,
  formatEventTime,
}: TrackingScreenProps) {
  return (
    <main className="min-h-screen bg-black px-4 py-5 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        <div className="mb-5 rounded-[28px] border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-5 shadow-2xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                LastRound
              </p>
              <h1 className="mt-2 text-3xl font-black">Night in Progress</h1>
              <p className="mt-1 text-sm text-zinc-400">Track the chaos.</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Started
              </p>
              <p className="mt-1 text-sm font-bold">{startTimeText}</p>
            </div>
          </div>
        </div>

        <div className="mb-4 rounded-[26px] border border-zinc-800 bg-zinc-950 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Profile
          </p>
          <div className="mt-3 space-y-2">
            <StatRow label="Name" value={name || "--"} />
            <StatRow label="Gender" value={gender || "--"} />
            <StatRow label="Weight" value={`${weight} kg`} />
            <StatRow label="Height" value={`${height} cm`} />
          </div>
        </div>

        <div className="mb-4 rounded-[26px] border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-5 shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Live BAC
          </p>
          <p className="mt-3 text-4xl font-black">{currentBac}</p>
          <p className="mt-2 text-sm text-zinc-400">
            Estimated from your profile, drink settings, and session time.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleBeer}
            className="rounded-[24px] border border-zinc-800 bg-zinc-950 py-9 text-xl font-bold transition active:scale-95"
          >
            🍺 Beer
          </button>

          <button
            onClick={handleShot}
            className="rounded-[24px] border border-zinc-800 bg-zinc-950 py-9 text-xl font-bold transition active:scale-95"
          >
            🥃 Shot
          </button>

          <button
            onClick={handleCigarette}
            className="rounded-[24px] border border-zinc-800 bg-zinc-950 py-9 text-xl font-bold transition active:scale-95"
          >
            🚬 Cigarette
          </button>

          <button
            onClick={openGambleInput}
            className="rounded-[24px] border border-zinc-800 bg-zinc-950 py-9 text-xl font-bold transition active:scale-95"
          >
            🎰 Gamble
          </button>
        </div>

        <div className="mt-4 rounded-[26px] border border-zinc-800 bg-zinc-950 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Live stats
          </p>
          <div className="mt-3 space-y-2">
            <StatRow label="Beers" value={beers} />
            <StatRow label="Shots" value={shots} />
            <StatRow label="Cigarettes" value={cigarettes} />
            <StatRow label="Gamble P/L" value={`€${gambleTotal}`} />
          </div>
        </div>

        <div className="mt-4 rounded-[26px] border border-zinc-800 bg-zinc-950 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Recent events
          </p>

          {events.length === 0 ? (
            <p className="mt-3 text-sm text-zinc-400">No events yet.</p>
          ) : (
            <div className="mt-3 space-y-2">
              {events.slice(0, 5).map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between rounded-2xl bg-zinc-900 px-3 py-2 text-sm"
                >
                  <span>{getEventLabel(event)}</span>
                  <span className="text-zinc-400">
                    {formatEventTime(event.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-auto pt-4">
          <button
            onClick={endNight}
            className="w-full rounded-2xl bg-white py-4 text-lg font-bold text-black transition active:scale-95"
          >
            End Night
          </button>
        </div>
      </div>

      {showGambleInput && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 px-4 py-4 sm:items-center">
          <div className="w-full max-w-md rounded-[28px] border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-5 shadow-2xl">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                Gambling
              </p>
              <h2 className="mt-2 text-2xl font-black">Add Gamble Result</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Stack quick amounts or enter a custom value.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Current result
              </p>
              <p className="mt-2 text-3xl font-black">{formatDraft(gambleDraft)}</p>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Quick add
              </p>

              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => addQuickGambleAmount(5)}
                  className="rounded-2xl border border-emerald-900 bg-emerald-950 py-3 font-bold text-emerald-200 transition active:scale-95"
                >
                  +5
                </button>
                <button
                  onClick={() => addQuickGambleAmount(20)}
                  className="rounded-2xl border border-emerald-900 bg-emerald-950 py-3 font-bold text-emerald-200 transition active:scale-95"
                >
                  +20
                </button>
                <button
                  onClick={() => addQuickGambleAmount(50)}
                  className="rounded-2xl border border-emerald-900 bg-emerald-950 py-3 font-bold text-emerald-200 transition active:scale-95"
                >
                  +50
                </button>

                <button
                  onClick={() => addQuickGambleAmount(-5)}
                  className="rounded-2xl border border-rose-950 bg-rose-950/80 py-3 font-bold text-rose-200 transition active:scale-95"
                >
                  -5
                </button>
                <button
                  onClick={() => addQuickGambleAmount(-20)}
                  className="rounded-2xl border border-rose-950 bg-rose-950/80 py-3 font-bold text-rose-200 transition active:scale-95"
                >
                  -20
                </button>
                <button
                  onClick={() => addQuickGambleAmount(-50)}
                  className="rounded-2xl border border-rose-950 bg-rose-950/80 py-3 font-bold text-rose-200 transition active:scale-95"
                >
                  -50
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Custom amount
              </p>

              <div className="flex gap-3">
                <input
                  type="number"
                  value={gambleInput}
                  onChange={(e) => setGambleInput(e.target.value)}
                  placeholder="Enter custom amount"
                  className="flex-1 rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-zinc-500"
                />
                <button
                  onClick={addCustomGambleAmount}
                  className="rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-3 font-bold transition active:scale-95"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <button
                onClick={clearGambleDraft}
                className="rounded-2xl border border-zinc-700 bg-zinc-800 py-3 font-bold transition active:scale-95"
              >
                Clear
              </button>

              <button
                onClick={cancelGamble}
                className="rounded-2xl border border-zinc-700 bg-zinc-800 py-3 font-bold transition active:scale-95"
              >
                Cancel
              </button>

              <button
                onClick={confirmGamble}
                className="rounded-2xl bg-white py-3 font-bold text-black transition active:scale-95"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}