import { useSyncExternalStore } from "react";
import * as mock from "./mock-data";
import type { ProgressPhoto, Routine, Run, Streak, Workout } from "./mock-data";
import { parseExerciseLine } from "./format";

// Tiny in-memory store seeded from mock data. Resets on reload by design (UI prototype).
type State = {
  routines: Routine[];
  workouts: Workout[];
  runs: Run[];
  photos: ProgressPhoto[];
  streak: Streak;
};

const initial: State = {
  routines: mock.routines,
  workouts: mock.workouts,
  runs: mock.runs,
  photos: mock.progressPhotos,
  streak: mock.streak,
};

let state = initial;
const listeners = new Set<() => void>();

function set(next: Partial<State>) {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useStore<T>(selector: (s: State) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector(initial),
  );
}

const uid = () => Math.random().toString(36).slice(2, 9);

export const actions = {
  addRoutine(name: string, text: string) {
    const exercises = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => ({ id: uid(), ...parseExerciseLine(l) }));
    const routine: Routine = {
      id: uid(),
      name: name.trim(),
      description: exercises.length ? "" : text.trim(),
      createdAt: new Date().toISOString(),
      exercises,
    };
    set({ routines: [routine, ...state.routines] });
    return routine;
  },
  deleteRoutine(id: string) {
    set({ routines: state.routines.filter((r) => r.id !== id) });
  },
  addWorkout(w: Omit<Workout, "id" | "date">) {
    set({ workouts: [{ ...w, id: uid(), date: new Date().toISOString() }, ...state.workouts] });
  },
  completeToday() {
    const s = state.streak;
    if (!s.week.some((d) => d.status === "today")) return;
    const current = s.current + 1;
    set({
      streak: {
        current,
        best: Math.max(s.best, current),
        week: s.week.map((d) => (d.status === "today" ? { ...d, status: "done" } : d)),
      },
    });
  },
  addRun(run: Omit<Run, "id" | "date">) {
    set({ runs: [{ ...run, id: uid(), date: new Date().toISOString() }, ...state.runs] });
  },
  deleteRun(id: string) {
    set({ runs: state.runs.filter((r) => r.id !== id) });
  },
  addPhoto() {
    const photo = { id: uid(), date: new Date().toISOString() };
    set({ photos: [...state.photos, photo] });
    return photo;
  },
};
