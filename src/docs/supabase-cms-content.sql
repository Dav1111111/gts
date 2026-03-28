-- Shared CMS storage for GTS landing content
-- Run this in the Supabase SQL editor for project hayrjbehkpxfkakgbbxw

create table if not exists public.cms_content (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_cms_content_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists cms_content_set_updated_at on public.cms_content;

create trigger cms_content_set_updated_at
before update on public.cms_content
for each row
execute function public.set_cms_content_updated_at();

insert into public.cms_content (id, data)
values ('global', '{}'::jsonb)
on conflict (id) do nothing;

alter table public.cms_content enable row level security;

drop policy if exists "public can read cms content" on public.cms_content;
create policy "public can read cms content"
on public.cms_content
for select
to anon, authenticated
using (true);

drop policy if exists "staff can mutate cms content" on public.cms_content;
create policy "staff can mutate cms content"
on public.cms_content
for all
to authenticated
using (
  coalesce(auth.jwt() -> 'user_metadata' ->> 'role', auth.jwt() -> 'app_metadata' ->> 'role')
  in ('executive', 'staff')
)
with check (
  coalesce(auth.jwt() -> 'user_metadata' ->> 'role', auth.jwt() -> 'app_metadata' ->> 'role')
  in ('executive', 'staff')
);

alter publication supabase_realtime add table public.cms_content;
