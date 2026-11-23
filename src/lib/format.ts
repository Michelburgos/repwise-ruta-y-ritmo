import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { TempoRating } from "./mock-data";

export function formatDate(iso: string) {
  return format(new Date(iso), "d MMM yyyy", { locale: es }).replace(".", "");
}

export function formatShortDate(iso: string) {
  return format(new Date(iso), "d MMM", { locale: es }).replace(".", "");
}

/** 1638 -> "27:18"; 3720 -> "1:02:00" */
export function formatDuration(totalSec: number) {
  const s = Math.max(0, Math.floor(totalSec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}

/** Pace in minutes per km, e.g. "5:15". Returns "--:--" without distance. */
export function formatPace(distanceKm: number, durationSec: number) {
  if (distanceKm <= 0 || durationSec <= 0) return "--:--";
  const secPerKm = Math.round(durationSec / distanceKm);
  const m = Math.floor(secPerKm / 60);
  const s = secPerKm % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function formatKm(distanceKm: number) {
  return distanceKm.toFixed(2);
}

/** Seconds per rep -> rhythm label. Under 1.6 s is too fast, over 3.2 s too slow. */
export function rateTempo(secondsPerRep: number): TempoRating {
  if (secondsPerRep < 1.6) return "rapido";
  if (secondsPerRep > 3.2) return "lento";
  return "bueno";
}

export const tempoLabel: Record<TempoRating, string> = {
  bueno: "Buen ritmo",
  rapido: "Muy rápido",
  lento: "Muy lento",
};

/** "Sentadilla 4x10" -> { name: "Sentadilla", sets: 4, reps: 10 }. Defaults to 3x10. */
export function parseExerciseLine(line: string) {
  const match = line.match(/(\d+)\s*[x×]\s*(\d+)/i);
  const name = line.replace(/(\d+)\s*[x×]\s*(\d+)/i, "").replace(/[-–:·]+\s*$/, "").trim();
  return {
    name: name || line.trim(),
    sets: match ? Number(match[1]) : 3,
    reps: match ? Number(match[2]) : 10,
  };
}
