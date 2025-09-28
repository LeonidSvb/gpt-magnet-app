-- GPT Lead Magnet Database Schema
-- Final version: 2025-09-28
-- RLS disabled for simplicity

-- Sessions table
create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),

  business_type varchar(100),
  niche varchar(100),

  answers jsonb not null default '{}'::jsonb,
  status varchar(50) default 'started' check (status in ('started', 'completed', 'abandoned')),

  source varchar(50) check (source in ('web', 'telegram', 'iframe')),

  current_step integer default 0,
  total_steps integer,

  user_agent text,
  ip_address inet,

  created_at timestamptz default now(),
  completed_at timestamptz
);

-- Leads table
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references sessions(id) on delete cascade,

  email varchar(255),
  telegram_id bigint,
  name varchar(255),
  phone varchar(50),
  company varchar(255),

  status varchar(50) default 'new' check (status in ('new', 'contacted', 'converted')),

  created_at timestamptz default now(),

  constraint contact_check check (
    email is not null or telegram_id is not null
  )
);

-- Results table
create table if not exists results (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references sessions(id) on delete cascade,

  markdown text not null,
  prompt_used text,

  model varchar(100),
  tokens_used integer,
  generation_time_ms integer,

  version integer default 1,

  created_at timestamptz default now()
);

-- Indexes
create index if not exists idx_sessions_status on sessions(status);
create index if not exists idx_sessions_source on sessions(source);
create index if not exists idx_sessions_business_type on sessions(business_type);
create index if not exists idx_sessions_created_at on sessions(created_at desc);

create index if not exists idx_leads_email on leads(email);
create index if not exists idx_leads_telegram_id on leads(telegram_id);
create index if not exists idx_leads_session_id on leads(session_id);
create index if not exists idx_leads_status on leads(status);

create index if not exists idx_results_session_id on results(session_id);