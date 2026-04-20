export type Screen = "start" | "tracking" | "roundup";

export type Gender = "male" | "female" | "";

export type EventType = "beer" | "shot" | "cigarette" | "gamble";

export type NightEvent = {
  id: string;
  type: EventType;
  value?: number;
  timestamp: string;
};

export type SavedState = {
  screen: Screen;
  beers: number;
  shots: number;
  cigarettes: number;
  gambleTotal: number;
  showGambleInput: boolean;
  gambleInput: string;
  gambleDraft: number;
  startTime: string | null;
  endTime: string | null;
  events: NightEvent[];
  name: string;
  gender: Gender;
  weight: string;
  height: string;
  beerVolumeMl: string;
  beerAbv: string;
  shotVolumeMl: string;
  shotAbv: string;
};
