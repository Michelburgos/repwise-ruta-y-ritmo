import { describe, expect, it } from "vitest";
import { formatDuration, formatPace, parseExerciseLine, rateTempo } from "@/lib/format";

describe("run stats", () => {
  it("formats pace as min:sec per km", () => {
    expect(formatPace(5.2, 27 * 60 + 18)).toBe("5:15");
  });
  it("shows a placeholder pace with no distance", () => {
    expect(formatPace(0, 30)).toBe("--:--");
  });
  it("formats durations with hours when needed", () => {
    expect(formatDuration(1638)).toBe("27:18");
    expect(formatDuration(3720)).toBe("1:02:00");
  });
});

describe("technique rhythm", () => {
  it("rates fast, good and slow reps", () => {
    expect(rateTempo(1.2)).toBe("rapido");
    expect(rateTempo(2.4)).toBe("bueno");
    expect(rateTempo(3.8)).toBe("lento");
  });
});

describe("routine text", () => {
  it("reads sets x reps from an exercise line", () => {
    expect(parseExerciseLine("Sentadilla 4x10")).toEqual({ name: "Sentadilla", sets: 4, reps: 10 });
    expect(parseExerciseLine("Plancha")).toEqual({ name: "Plancha", sets: 3, reps: 10 });
  });
});
