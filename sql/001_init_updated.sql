-- GPT Lead Magnet Database Schema
-- Updated: 2025-09-28 with business_type and RLS policies

-- Sessions table
create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),

  -- Business context
  business_type varchar(100),
  niche varchar(100),

  -- Answers and progress
  answers jsonb not null default '{}'::jsonb,
  status varchar(50) default 'started' check (status in ('started', 'completed', 'abandoned')),

  source varchar(50) check (source in ('web', 'telegram', 'iframe')),

  current_step integer default 0,
  total_steps integer,

  -- Tracking
  user_agent text,
  ip_address inet,

  -- Timestamps
  created_at timestamptz default now(),
  completed_at timestamptz
);

-- Leads table
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references sessions(id) on delete cascade,

  -- Contact info
  email varchar(255),
  telegram_id bigint,
  name varchar(255),
  phone varchar(50),
  company varchar(255),

  -- Status
  status varchar(50) default 'new' check (status in ('new', 'contacted', 'converted')),

  created_at timestamptz default now(),

  -- At least one contact method required
  constraint contact_check check (
    email is not null or telegram_id is not null
  )
);

-- Results table
create table if not exists results (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references sessions(id) on delete cascade,

  -- Generated content
  markdown text not null,
  prompt_used text,

  -- AI metrics
  model varchar(100),
  tokens_used integer,
  generation_time_ms integer,

  version integer default 1,

  created_at timestamptz default now()
);

-- Indexes for performance
create index if not exists idx_sessions_status on sessions(status);
create index if not exists idx_sessions_source on sessions(source);
create index if not exists idx_sessions_business_type on sessions(business_type);
create index if not exists idx_sessions_created_at on sessions(created_at desc);

create index if not exists idx_leads_email on leads(email);
create index if not exists idx_leads_telegram_id on leads(telegram_id);
create index if not exists idx_leads_session_id on leads(session_id);
create index if not exists idx_leads_status on leads(status);

create index if not exists idx_results_session_id on results(session_id);

-- Enable Row Level Security
alter table sessions enable row level security;
alter table leads enable row level security;
alter table results enable row level security;

-- RLS Policies: Allow anonymous users to create and read their own data
-- This is needed for public-facing lead magnet widget

-- Sessions policies
create policy "Allow anonymous insert sessions"
  on sessions for insert
  with check (true);

create policy "Allow read all sessions"
  on sessions for select
  using (true);

create policy "Allow update all sessions"
  on sessions for update
  using (true);

-- Leads policies
create policy "Allow anonymous insert leads"
  on leads for insert
  with check (true);

create policy "Allow read all leads"
  on leads for select
  using (true);

-- Results policies
create policy "Allow anonymous insert results"
  on results for insert
  with check (true);

create policy "Allow read all results"
  on results for select
  using (true);

-- Note: In production, you may want to restrict these policies
-- For example, only allow reading sessions/results by session_id
-- and require authentication for leads table access