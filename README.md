# 🏋️ GymLink — Personalized Fitness Coaching Platform

> Dual-sided platform connecting personal trainers with clients. Personalized workout plans, progress tracking, and direct human communication.

## 📱 Screens

| Screen | Description |
|--------|-------------|
| `_1` | **Trainer Dashboard** — Client list, weekly progress, activity feed |
| `_2` | **Client Home** — Personalized view for the athlete |
| `_3` | **Workout View** — Detailed workout breakdown |
| `_4` | **Program Builder** — Trainer creates custom plans |
| `_5` | **Dashboard v2** — Alternative trainer dashboard |
| `_6` | **Progress Screen** — Analytics and charts |
| `_7` | **Messaging** — Trainer-client chat |
| `_8` | **Exercise Library** — Search & filter exercises (Russian UI) |

## 🎨 Design System

- **Theme:** Dark mode (`#121414` background)
- **Accent:** Lime Green `#c3f400`
- **Fonts:** Sora (headings) · Hanken Grotesk (body) · JetBrains Mono (labels)
- **Effects:** Glassmorphism cards, lime glow shadows

## 🛠️ Tech Stack

- **Frontend:** HTML + Tailwind CSS (CDN)
- **Backend:** Supabase (Auth, Database, Realtime)
- **Deploy:** Vercel

## 🚀 Running Locally

Just open `index.html` in your browser — no build step needed!

```bash
# Or use a local server
npx serve .
```

## 🔧 Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Copy your `SUPABASE_URL` and `SUPABASE_ANON_KEY`
3. Add them to `.env.local` (see `.env.example`)
4. Add the Supabase JS client to each HTML screen

## 📦 Deploying to Vercel

```bash
npx vercel
```
