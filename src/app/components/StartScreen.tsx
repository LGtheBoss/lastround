type Gender = "male" | "female" | "";

type StartScreenProps = {
  name: string;
  setName: (value: string) => void;
  gender: Gender;
  setGender: (value: Gender) => void;
  weight: string;
  setWeight: (value: string) => void;
  height: string;
  setHeight: (value: string) => void;
  beerVolumeMl: string;
  setBeerVolumeMl: (value: string) => void;
  beerAbv: string;
  setBeerAbv: (value: string) => void;
  shotVolumeMl: string;
  setShotVolumeMl: (value: string) => void;
  shotAbv: string;
  setShotAbv: (value: string) => void;
  startNight: () => void;
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
      {children}
    </label>
  );
}

export default function StartScreen({
  name,
  setName,
  gender,
  setGender,
  weight,
  setWeight,
  height,
  setHeight,
  beerVolumeMl,
  setBeerVolumeMl,
  beerAbv,
  setBeerAbv,
  shotVolumeMl,
  setShotVolumeMl,
  shotAbv,
  setShotAbv,
  startNight,
}: StartScreenProps) {
  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-600">
            LastRound
          </p>
          <h1 className="mt-3 text-5xl font-black tracking-tight">LastRound</h1>
          <p className="mt-3 text-base text-zinc-400">
            Every night has a LastRound.
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-[28px] border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-5 shadow-2xl">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                Profile
              </p>
              <h2 className="mt-2 text-2xl font-bold">Set your baseline</h2>
              <p className="mt-1 text-sm text-zinc-400">
                These details help estimate your BAC through the night.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <FieldLabel>Name</FieldLabel>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-zinc-500"
                />
              </div>

              <div className="space-y-2">
                <FieldLabel>Gender</FieldLabel>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setGender("male")}
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition active:scale-95 ${
                      gender === "male"
                        ? "border-white bg-white text-black"
                        : "border-zinc-700 bg-zinc-900 text-white"
                    }`}
                  >
                    Male
                  </button>

                  <button
                    onClick={() => setGender("female")}
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition active:scale-95 ${
                      gender === "female"
                        ? "border-white bg-white text-black"
                        : "border-zinc-700 bg-zinc-900 text-white"
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <FieldLabel>Weight (kg)</FieldLabel>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="88"
                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-zinc-500"
                  />
                </div>

                <div className="space-y-2">
                  <FieldLabel>Height (cm)</FieldLabel>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="184"
                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-zinc-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-5 shadow-2xl">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                Night settings
              </p>
              <h2 className="mt-2 text-2xl font-bold">Define your drinks</h2>
              <p className="mt-1 text-sm text-zinc-400">
                These values apply to this night session.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <FieldLabel>Beer volume (ml)</FieldLabel>
                  <input
                    type="number"
                    value={beerVolumeMl}
                    onChange={(e) => setBeerVolumeMl(e.target.value)}
                    placeholder="500"
                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-zinc-500"
                  />
                </div>

                <div className="space-y-2">
                  <FieldLabel>Beer ABV (%)</FieldLabel>
                  <input
                    type="number"
                    step="0.1"
                    value={beerAbv}
                    onChange={(e) => setBeerAbv(e.target.value)}
                    placeholder="4.5"
                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-zinc-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <FieldLabel>Shot volume (ml)</FieldLabel>
                  <input
                    type="number"
                    value={shotVolumeMl}
                    onChange={(e) => setShotVolumeMl(e.target.value)}
                    placeholder="33"
                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-zinc-500"
                  />
                </div>

                <div className="space-y-2">
                  <FieldLabel>Shot ABV (%)</FieldLabel>
                  <input
                    type="number"
                    step="0.1"
                    value={shotAbv}
                    onChange={(e) => setShotAbv(e.target.value)}
                    placeholder="45"
                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-zinc-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={startNight}
            className="w-full rounded-2xl bg-white py-4 text-lg font-bold text-black transition active:scale-95"
          >
            Start Night
          </button>
        </div>
      </div>
    </main>
  );
}