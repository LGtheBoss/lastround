import AppShell from "./ui/AppShell";
import Panel from "./ui/Panel";
import SectionEyebrow from "./ui/SectionEyebrow";

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
    <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--theme-text-muted)]">
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
    <AppShell>
      <div className="flex min-h-screen flex-col justify-center">
        <div className="mb-6 text-center">
          <SectionEyebrow className="tracking-[0.35em]">LastRound</SectionEyebrow>
          <h1 className="mt-3 text-5xl font-black tracking-tight text-[var(--theme-accent)]">
            LastRound
          </h1>
          <p className="mt-3 text-lg text-[var(--theme-text-secondary)]">
            Every night has a LastRound.
          </p>
        </div>

        <div className="space-y-4">
          <Panel>
            <div className="mb-4">
              <SectionEyebrow>Profile</SectionEyebrow>
              <h2 className="mt-2 text-3xl font-bold">Set your baseline</h2>
              <p className="mt-2 text-base text-[var(--theme-text-secondary)]">
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
                  className="w-full rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] px-4 py-4 text-lg text-[var(--theme-text-primary)] outline-none transition placeholder:text-[var(--theme-text-muted)] focus:border-[var(--theme-accent)]"
                />
              </div>

              <div className="space-y-2">
                <FieldLabel>Gender</FieldLabel>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGender("male")}
                    className={`rounded-2xl border px-4 py-4 text-base font-semibold transition active:scale-95 ${
                      gender === "male"
                        ? "border-[var(--theme-accent)] bg-[var(--theme-button-bg)] text-[var(--theme-accent-contrast)]"
                        : "border-[var(--theme-border)] bg-[var(--theme-surface-muted)] text-[var(--theme-text-primary)]"
                    }`}
                  >
                    Male
                  </button>

                  <button
                    type="button"
                    onClick={() => setGender("female")}
                    className={`rounded-2xl border px-4 py-4 text-base font-semibold transition active:scale-95 ${
                      gender === "female"
                        ? "border-[var(--theme-accent)] bg-[var(--theme-button-bg)] text-[var(--theme-accent-contrast)]"
                        : "border-[var(--theme-border)] bg-[var(--theme-surface-muted)] text-[var(--theme-text-primary)]"
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
                    className="w-full rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] px-4 py-4 text-lg text-[var(--theme-text-primary)] outline-none transition placeholder:text-[var(--theme-text-muted)] focus:border-[var(--theme-accent)]"
                  />
                </div>

                <div className="space-y-2">
                  <FieldLabel>Height (cm)</FieldLabel>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="184"
                    className="w-full rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] px-4 py-4 text-lg text-[var(--theme-text-primary)] outline-none transition placeholder:text-[var(--theme-text-muted)] focus:border-[var(--theme-accent)]"
                  />
                </div>
              </div>
            </div>
          </Panel>

          <Panel>
            <div className="mb-4">
              <SectionEyebrow>Night Settings</SectionEyebrow>
              <h2 className="mt-2 text-3xl font-bold">Define your drinks</h2>
              <p className="mt-2 text-base text-[var(--theme-text-secondary)]">
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
                    className="w-full rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] px-4 py-4 text-lg text-[var(--theme-text-primary)] outline-none transition placeholder:text-[var(--theme-text-muted)] focus:border-[var(--theme-accent)]"
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
                    className="w-full rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] px-4 py-4 text-lg text-[var(--theme-text-primary)] outline-none transition placeholder:text-[var(--theme-text-muted)] focus:border-[var(--theme-accent)]"
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
                    className="w-full rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] px-4 py-4 text-lg text-[var(--theme-text-primary)] outline-none transition placeholder:text-[var(--theme-text-muted)] focus:border-[var(--theme-accent)]"
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
                    className="w-full rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] px-4 py-4 text-lg text-[var(--theme-text-primary)] outline-none transition placeholder:text-[var(--theme-text-muted)] focus:border-[var(--theme-accent)]"
                  />
                </div>
              </div>
            </div>
          </Panel>

          <button
            type="button"
            onClick={startNight}
            className="w-full rounded-2xl bg-[var(--theme-button-bg)] py-4 text-xl font-bold text-[var(--theme-accent-contrast)] transition active:scale-95"
          >
            Start Night
          </button>
        </div>
      </div>
    </AppShell>
  );
}
