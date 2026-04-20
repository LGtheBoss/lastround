import { formatCurrency } from "@/app/lib/formatters";
import Panel from "../ui/Panel";
import SectionEyebrow from "../ui/SectionEyebrow";

type LiveStatsCardProps = {
  beers: number;
  shots: number;
  cigarettes: number;
  gambleTotal: number;
};

function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-[22px] border border-white/[0.06] bg-white/[0.03] px-4 py-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-black text-white">{value}</p>
    </div>
  );
}

export default function LiveStatsCard({
  beers,
  shots,
  cigarettes,
  gambleTotal,
}: LiveStatsCardProps) {
  return (
    <Panel className="mb-4">
      <SectionEyebrow>Live Stats</SectionEyebrow>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <StatTile label="Beers" value={beers} />
        <StatTile label="Shots" value={shots} />
        <StatTile label="Cigs" value={cigarettes} />
        <StatTile label="Gamble" value={formatCurrency(gambleTotal)} />
      </div>
    </Panel>
  );
}
