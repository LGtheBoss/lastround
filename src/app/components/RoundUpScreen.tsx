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
    <div className="rounded-2xl bg-zinc-800/90 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
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
      <span className="text-zinc-400">{label}</span>
      <span className="font-semibold text-white">{value}</span>
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
  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white">
      <div className="mx-auto w-full max-w-md space-y-5">
        <div className="rounded-[30px] border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 shadow-2xl space-y-5">
          <div className="text-center space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
              LastRound
            </p>
            <h1 className="text-4xl font-black tracking-tight">RoundUp</h1>
            <p className="text-zinc-400">Tonight’s Damage Report</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MetricCard label="Rank" value={rank} />
            <MetricCard label="Score" value={degeneracyScore} />
          </div>

          <div className="rounded-2xl bg-zinc-800/90 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Highlight
            </p>
            <p className="mt-2 text-lg font-bold">{highlightText}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MetricCard label="Beers" value={beers} />
            <MetricCard label="Shots" value={shots} />
            <MetricCard label="Cigarettes" value={cigarettes} />
            <MetricCard label="Gamble P/L" value={`€${gambleTotal}`} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MetricCard label="Peak BAC" value={peakBacText} />
            <MetricCard label="Peak Time" value={peakTimeText} />
          </div>

          <div className="rounded-2xl bg-zinc-800/90 p-4">
            <div className="space-y-2">
              <InfoRow label="Started" value={startTimeText} />
              <InfoRow label="Ended" value={endTimeText} />
              <InfoRow label="Duration" value={durationText} />
            </div>
          </div>
        </div>

        <div className="rounded-[26px] border border-zinc-800 bg-zinc-950 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Share
          </p>

          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={handleCopyShareText}
              className="rounded-2xl bg-white px-4 py-3 font-bold text-black transition active:scale-95"
            >
              Share RoundUp
            </button>
            {copyMessage ? (
              <span className="text-sm text-zinc-400">{copyMessage}</span>
            ) : null}
          </div>
        </div>

        <div className="rounded-[26px] border border-zinc-800 bg-zinc-950 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Profile
          </p>
          <div className="mt-3 space-y-2">
            <InfoRow label="Name" value={name || "--"} />
            <InfoRow label="Gender" value={gender || "--"} />
            <InfoRow label="Weight" value={`${weight || "--"} kg`} />
            <InfoRow label="Height" value={`${height || "--"} cm`} />
          </div>
        </div>

        <div className="rounded-[26px] border border-zinc-800 bg-zinc-950 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Timeline
          </p>

          {events.length === 0 ? (
            <p className="mt-3 text-sm text-zinc-400">No events logged.</p>
          ) : (
            <div className="mt-3 space-y-2">
              {events.map((event) => (
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

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={continueNight}
            className="rounded-2xl border border-zinc-700 bg-zinc-800 py-4 text-lg font-bold text-white transition active:scale-95"
          >
            Continue Night
          </button>

          <button
            onClick={backToStart}
            className="rounded-2xl bg-white py-4 text-lg font-bold text-black transition active:scale-95"
          >
            Start New Night
          </button>
        </div>
      </div>
    </main>
  );
}