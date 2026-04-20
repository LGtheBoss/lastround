import type { NightEvent } from "./types";

export function clampToZero(value: number) {
  return value < 0 ? 0 : value;
}

export function formatPromille(value: number) {
  return `${value.toFixed(2)}‰`;
}

export function formatClockTime(date: Date | null) {
  if (!date) return "--:--";

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatEventTime(timestamp: string) {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDuration(startTime: Date | null, endTime: Date | null) {
  if (!startTime || !endTime) return "--";

  const diffMs = endTime.getTime() - startTime.getTime();
  const totalMinutes = Math.floor(diffMs / 1000 / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
}

export function formatCurrency(value: number) {
  return `€${value}`;
}

export function formatSignedValue(value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value}`;
}

export function getEventLabel(event: NightEvent) {
  if (event.type === "beer") return "Beer";
  if (event.type === "shot") return "Shot";
  if (event.type === "cigarette") return "Smoke";
  if (event.type === "gamble") {
    const sign = event.value && event.value > 0 ? "+" : "";
    return `Gamble ${sign}${event.value}`;
  }

  return event.type;
}
