create table if not exists leads (
  id text primary key,
  email text,
  telegram_id bigint,
  telegram_username text,
  name text,
  platform text not null check (platform in ('web', 'telegram')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists sessions (
  id text primary key,
  lead_id text references leads(id),
  answers jsonb not null,
  result text,
  created_at timestamptz default now(),
  completed_at timestamptz
);

create index if not exists idx_leads_email on leads(email);
create index if not exists idx_leads_telegram_id on leads(telegram_id);
create index if not exists idx_sessions_lead_id on sessions(lead_id);
create index if not exists idx_sessions_created_at on sessions(created_at desc);

alter table leads enable row level security;
alter table sessions enable row level security;