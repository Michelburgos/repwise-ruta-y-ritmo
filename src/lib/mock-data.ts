// Single source of mock data for Repwise. No backend: everything starts from here.

export type Exercise = { id: string; name: string; sets: number; reps: number };

export type Routine = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  exercises: Exercise[];
};

export type TempoRating = "bueno" | "rapido" | "lento";

export type WorkoutExercise = {
  name: string;
  reps: number;
  /** Average seconds per repetition */
  tempo: number;
  rating: TempoRating;
};

export type Workout = {
  id: string;
  routineId: string | null;
  name: string;
  date: string;
  totalReps: number;
  durationMin: number;
  exercises: WorkoutExercise[];
};

export type Point = [number, number];

export type Run = {
  id: string;
  date: string;
  distanceKm: number;
  durationSec: number;
  route: Point[];
};

export type ProgressPhoto = { id: string; date: string };

export type DayStatus = "done" | "today" | "pending";

export type Streak = {
  current: number;
  best: number;
  week: { label: string; status: DayStatus }[];
};

export const routines: Routine[] = [
  {
    id: "pierna-fuerte",
    name: "Pierna fuerte",
    description: "Sentadilla y cadena posterior. Descanso de 90 s entre series.",
    createdAt: "2026-11-20T12:00:00",
    exercises: [
      { id: "e1", name: "Sentadilla", sets: 4, reps: 10 },
      { id: "e2", name: "Peso muerto rumano", sets: 4, reps: 8 },
      { id: "e3", name: "Zancadas", sets: 3, reps: 12 },
      { id: "e4", name: "Hip thrust", sets: 4, reps: 10 },
      { id: "e5", name: "Elevación de talones", sets: 3, reps: 15 },
    ],
  },
  {
    id: "empuje-superior",
    name: "Empuje superior",
    description: "Pecho, hombro y tríceps. Controla la bajada.",
    createdAt: "2026-11-17T12:00:00",
    exercises: [
      { id: "e1", name: "Press banca", sets: 4, reps: 8 },
      { id: "e2", name: "Press militar", sets: 4, reps: 10 },
      { id: "e3", name: "Fondos", sets: 3, reps: 12 },
      { id: "e4", name: "Aperturas", sets: 3, reps: 12 },
    ],
  },
  {
    id: "tiron-espalda",
    name: "Tirón y espalda",
    description: "Dorsales y bíceps. Escápulas atrás en cada repetición.",
    createdAt: "2026-11-12T12:00:00",
    exercises: [
      { id: "e1", name: "Dominadas", sets: 4, reps: 6 },
      { id: "e2", name: "Remo con barra", sets: 4, reps: 10 },
      { id: "e3", name: "Jalón al pecho", sets: 3, reps: 12 },
      { id: "e4", name: "Face pull", sets: 3, reps: 15 },
      { id: "e5", name: "Curl de bíceps", sets: 3, reps: 12 },
      { id: "e6", name: "Curl martillo", sets: 3, reps: 10 },
    ],
  },
  {
    id: "core-en-casa",
    name: "Core en casa",
    description: "Sin material. Ideal para días sin gimnasio.",
    createdAt: "2026-11-05T12:00:00",
    exercises: [
      { id: "e1", name: "Crunch", sets: 3, reps: 20 },
      { id: "e2", name: "Elevación de piernas", sets: 3, reps: 15 },
      { id: "e3", name: "Russian twist", sets: 3, reps: 20 },
      { id: "e4", name: "Dead bug", sets: 3, reps: 12 },
    ],
  },
];

export const workouts: Workout[] = [
  {
    id: "w1",
    routineId: "pierna-fuerte",
    name: "Pierna fuerte",
    date: "2026-11-21T12:00:00",
    totalReps: 48,
    durationMin: 35,
    exercises: [
      { name: "Sentadilla", reps: 12, tempo: 2.4, rating: "bueno" },
      { name: "Peso muerto rumano", reps: 10, tempo: 2.8, rating: "bueno" },
      { name: "Zancadas", reps: 14, tempo: 1.3, rating: "rapido" },
      { name: "Hip thrust", reps: 12, tempo: 2.2, rating: "bueno" },
    ],
  },
  {
    id: "w2",
    routineId: "empuje-superior",
    name: "Empuje superior",
    date: "2026-11-19T12:00:00",
    totalReps: 40,
    durationMin: 28,
    exercises: [
      { name: "Press banca", reps: 10, tempo: 2.6, rating: "bueno" },
      { name: "Press militar", reps: 10, tempo: 3.7, rating: "lento" },
      { name: "Fondos", reps: 12, tempo: 2.1, rating: "bueno" },
      { name: "Aperturas", reps: 8, tempo: 2.5, rating: "bueno" },
    ],
  },
  {
    id: "w3",
    routineId: "tiron-espalda",
    name: "Tirón y espalda",
    date: "2026-11-18T12:00:00",
    totalReps: 56,
    durationMin: 42,
    exercises: [
      { name: "Dominadas", reps: 8, tempo: 3.1, rating: "bueno" },
      { name: "Remo con barra", reps: 12, tempo: 1.4, rating: "rapido" },
      { name: "Jalón al pecho", reps: 12, tempo: 2.4, rating: "bueno" },
      { name: "Face pull", reps: 12, tempo: 2.0, rating: "bueno" },
      { name: "Curl de bíceps", reps: 12, tempo: 2.3, rating: "bueno" },
    ],
  },
  {
    id: "w4",
    routineId: "core-en-casa",
    name: "Core en casa",
    date: "2026-11-16T12:00:00",
    totalReps: 64,
    durationMin: 20,
    exercises: [
      { name: "Crunch", reps: 20, tempo: 1.8, rating: "bueno" },
      { name: "Elevación de piernas", reps: 14, tempo: 3.9, rating: "lento" },
      { name: "Russian twist", reps: 18, tempo: 1.2, rating: "rapido" },
      { name: "Dead bug", reps: 12, tempo: 2.6, rating: "bueno" },
    ],
  },
];

// Route points live in a 100x100 box; RouteMap scales them.
export const runs: Run[] = [
  {
    id: "r1",
    date: "2026-11-22T07:30:00",
    distanceKm: 5.2,
    durationSec: 27 * 60 + 18,
    route: [
      [12, 78], [20, 62], [24, 48], [36, 40], [44, 26], [58, 22], [70, 30], [78, 44],
      [72, 58], [80, 70], [68, 80], [52, 76], [40, 84], [26, 86], [12, 78],
    ],
  },
  {
    id: "r2",
    date: "2026-11-20T19:10:00",
    distanceKm: 3.85,
    durationSec: 21 * 60 + 4,
    route: [
      [16, 20], [30, 18], [42, 26], [52, 22], [64, 30], [72, 46], [66, 60], [74, 74],
      [60, 82], [46, 74], [34, 78], [22, 66], [26, 50], [16, 36], [16, 20],
    ],
  },
  {
    id: "r3",
    date: "2026-11-17T07:45:00",
    distanceKm: 8.1,
    durationSec: 44 * 60 + 30,
    route: [
      [10, 50], [20, 36], [34, 30], [46, 18], [60, 14], [74, 20], [86, 32], [88, 50],
      [80, 64], [86, 80], [70, 88], [54, 80], [40, 86], [26, 76], [18, 62], [10, 50],
    ],
  },
  {
    id: "r4",
    date: "2026-11-14T08:00:00",
    distanceKm: 4.4,
    durationSec: 23 * 60 + 52,
    route: [
      [20, 84], [22, 68], [34, 60], [30, 44], [42, 34], [56, 38], [64, 24], [80, 22],
      [84, 38], [74, 50], [78, 66], [62, 72], [48, 82], [34, 88], [20, 84],
    ],
  },
];

/** Route drawn live while recording a new run. */
export const liveRoute: Point[] = [
  [14, 82], [18, 66], [28, 56], [26, 42], [38, 32], [50, 34], [58, 22], [72, 18],
  [84, 28], [82, 44], [70, 52], [76, 68], [64, 80], [48, 78], [34, 86], [14, 82],
];

export const progressPhotos: ProgressPhoto[] = [
  { id: "p1", date: "2026-08-24T12:00:00" },
  { id: "p2", date: "2026-09-21T12:00:00" },
  { id: "p3", date: "2026-10-19T12:00:00" },
  { id: "p4", date: "2026-11-16T12:00:00" },
];

export const streak: Streak = {
  current: 5,
  best: 12,
  week: [
    { label: "L", status: "done" },
    { label: "M", status: "done" },
    { label: "X", status: "done" },
    { label: "J", status: "done" },
    { label: "V", status: "done" },
    { label: "S", status: "today" },
    { label: "D", status: "pending" },
  ],
};

/** Demo technique session: seconds between detected reps. */
export const repIntervals = [2.3, 2.5, 2.2, 1.2, 1.3, 2.4, 3.8, 2.6, 2.3, 2.4, 3.6, 2.2];

export const formExercise = { name: "Sentadilla", target: 10, set: 1, totalSets: 4 };
