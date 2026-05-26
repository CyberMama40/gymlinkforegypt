-- ============================================================
--  GymLink — Supabase Database Schema
--  Run this in your Supabase SQL Editor (Database → SQL Editor)
-- ============================================================

-- Profiles (extends Supabase auth.users)
create table profiles (
  id          uuid references auth.users on delete cascade primary key,
  full_name   text,
  avatar_url  text,
  role        text check (role in ('trainer', 'client')) not null default 'client',
  created_at  timestamptz default now()
);

-- Trainer ↔ Client relationship
create table clients (
  id          uuid default gen_random_uuid() primary key,
  trainer_id  uuid references profiles(id) on delete cascade,
  client_id   uuid references profiles(id) on delete cascade,
  created_at  timestamptz default now(),
  unique(trainer_id, client_id)
);

-- Exercises library
create table exercises (
  id           uuid default gen_random_uuid() primary key,
  name         text not null,
  name_ru      text,
  muscle_group text,
  equipment    text,
  image_url    text,
  created_at   timestamptz default now()
);

-- Workout plans (trainer creates for client)
create table workout_plans (
  id          uuid default gen_random_uuid() primary key,
  trainer_id  uuid references profiles(id),
  client_id   uuid references profiles(id),
  name        text not null,
  description text,
  created_at  timestamptz default now()
);

-- Plan items (exercises inside a plan)
create table plan_exercises (
  id          uuid default gen_random_uuid() primary key,
  plan_id     uuid references workout_plans(id) on delete cascade,
  exercise_id uuid references exercises(id),
  sets        int,
  reps        int,
  weight_kg   numeric,
  notes       text,
  order_index int default 0
);

-- Workout logs (client logs their sessions)
create table workout_logs (
  id          uuid default gen_random_uuid() primary key,
  client_id   uuid references profiles(id),
  exercise_id uuid references exercises(id),
  sets        int,
  reps        int,
  weight      numeric,
  notes       text,
  logged_at   timestamptz default now()
);

-- Messages (trainer ↔ client chat)
create table messages (
  id          uuid default gen_random_uuid() primary key,
  sender_id   uuid references profiles(id),
  receiver_id uuid references profiles(id),
  content     text not null,
  read        boolean default false,
  created_at  timestamptz default now()
);

-- ── Row Level Security ───────────────────────────────────────

alter table profiles       enable row level security;
alter table clients        enable row level security;
alter table exercises      enable row level security;
alter table workout_plans  enable row level security;
alter table plan_exercises enable row level security;
alter table workout_logs   enable row level security;
alter table messages       enable row level security;

-- Profiles: users can read all, update only their own
create policy "Public profiles are viewable by everyone"
  on profiles for select using (true);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Messages: only sender and receiver can see them
create policy "Users see their own messages"
  on messages for select
  using (auth.uid() = sender_id or auth.uid() = receiver_id);

create policy "Users can send messages"
  on messages for insert
  with check (auth.uid() = sender_id);

-- Workout logs: clients see/add their own
create policy "Clients manage own logs"
  on workout_logs for all
  using (auth.uid() = client_id);

-- Workout plans: trainers and their clients can view
create policy "Trainers manage plans"
  on workout_plans for all
  using (auth.uid() = trainer_id);

create policy "Clients view their plans"
  on workout_plans for select
  using (auth.uid() = client_id);

-- Exercises: everyone can read
create policy "Exercises are public"
  on exercises for select using (true);

-- ── Trigger: auto-create profile on signup ───────────────────

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    coalesce(new.raw_user_meta_data->>'role', 'client')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Sample exercises data ─────────────────────────────────────

insert into exercises (name, name_ru, muscle_group, equipment) values
  ('Barbell Back Squat',    'Приседания со штангой', 'Legs',    'Barbell'),
  ('Goblet Squat',          'Гоблет приседания',     'Legs',    'Dumbbell'),
  ('Romanian Deadlift',     'Румынская тяга',         'Hamstrings', 'Barbell'),
  ('Bulgarian Split Squat', 'Болгарские выпады',      'Legs',    'Dumbbell'),
  ('Bench Press',           'Жим лёжа',              'Chest',   'Barbell'),
  ('Pull-Up',               'Подтягивания',           'Back',    'Bodyweight'),
  ('Plank',                 'Планка',                 'Core',    'Bodyweight'),
  ('Hip Thrust',            'Ягодичный мостик',       'Glutes',  'Barbell');
