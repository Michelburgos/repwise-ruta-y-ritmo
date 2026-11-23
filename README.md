# Repwise Ruta Y Ritmo

Design a mobile-first fitness app UI "Repwise" ("Entrena con cabeza."). React + Tailwind + shadcn/ui, mock data, 390x844, text in Spanish.

STYLE: light mode, rounded cards. Palette only: pastel purple #C4B5FD (buttons, selected states, icon tiles; black text on it), tint #EDE9FE, black #111, white cards on #F8F7FC, grays #6B7280/#E5E3EF, red #E5484D only for delete/stop. No green. No photos of people or stock images: use icon tiles and empty placeholders. Black bottom tabs: Rutinas, Técnica, Correr, Progreso (active = purple circle).

ONLY what the app does: auth, routines, technique mode, GPS runs, progress photos, history, streak. No calories, steps, heart rate, stars, search, social.

SCREENS

1 /login, /register: logo, email, password.

2 /app/routines: "Mis rutinas" + "Salir". Duolingo-style streak card: big flame, "5 días de racha", 7 circles L M X J V S D (done = purple check, today = outlined), "Mejor racha: 12 días". Then create card (name, textarea, "Guardar rutina"), routine cards (name, exercise count, date, delete), then "Entrenamientos anteriores" + "Ver todos": dumbbell tile, name, date, pills "48 repeticiones" "35 min".

3 /app/routines/:id: exercises (name, 4x10), "Practicar técnica".

4 /app/history/:id: exercises with reps and tempo, "Repetir rutina".

5 /app/form: huge rep number in purple circle, feedback card ("Buen ritmo", "Muy rápido", "Muy lento"), "Iniciar/Terminar serie". End sheet: repeticiones, tiempo, ritmo, "Guardar", "¡Racha +1!".

6 /app/run: map placeholder with route, stats km/tiempo/ritmo, "Iniciar carrera" (red "Terminar y guardar" while running). Below "Carreras recientes" + "Ver todas": route tile, date, "5.20 km", duration, pace.

7 /app/run/:id: route map, 3 stats, red outline "Eliminar carrera".

8 /app/progress: "Tomar foto de hoy", ANTES/AHORA empty placeholders with camera icon, thumbnails, 3-column "Línea de tiempo" with dates.

Add empty states, 4 mock items per list.

Use reusable components, one mock data file.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://repwise-ruta-y-ritmo.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/257b3955-8438-56b7-983a-bd46aad2532f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
