-- Supabase schema for Scent Sisters (perfume tracking)
-- Apply in Supabase SQL editor (or via Supabase CLI migrations).

create extension if not exists pgcrypto;

create table if not exists public.perfumes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text not null,
  category text not null,
  rating smallint not null,
  review text not null default '',
  top_notes text[] not null default '{}',
  middle_notes text[] not null default '{}',
  base_notes text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint perfumes_category_check check (category in ('collection', 'wishlist', 'sampled')),
  constraint perfumes_rating_check check (rating between 1 and 5)
);

create index if not exists perfumes_category_idx on public.perfumes (category);
create index if not exists perfumes_brand_idx on public.perfumes (brand);
create index if not exists perfumes_created_at_desc_idx on public.perfumes (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_perfumes_updated_at on public.perfumes;
create trigger set_perfumes_updated_at
before update on public.perfumes
for each row
execute procedure public.set_updated_at();

alter table public.perfumes enable row level security;

-- Public read-only access (GET endpoints + UI can stay public).
drop policy if exists perfumes_public_read on public.perfumes;
create policy perfumes_public_read
on public.perfumes
for select
to anon, authenticated
using (true);

