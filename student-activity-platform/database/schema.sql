-- Users table
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  role text not null check (role in ('طالب','مشرف','رئيس مجموعة','معلم','مطور النظام')),
  image_url text,
  phone text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Attendance table
create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  date text not null,
  time text not null,
  created_at timestamptz default now()
);

-- Surahs table
create table if not exists public.surahs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  total_verses integer not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Recitation progress
create table if not exists public.recitation_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  surah_id uuid not null references public.surahs(id) on delete cascade,
  verses_memorized integer not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, surah_id)
);

-- Example RLS policies (adjust to your project)
-- Note: enable row level security in Supabase UI or via SQL
-- alter table public.users enable row level security;
-- create policy "Users can view their own profile" on public.users
--   for select using (
--     auth.uid()::uuid = id or exists (
--       select 1 from public.users u2 where u2.id = auth.uid()::uuid and u2.role in ('مطور النظام','مشرف')
--     )
--   );
