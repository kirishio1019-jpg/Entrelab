-- Create likes table
create table if not exists likes (
  id bigint primary key generated always as identity,
  user_id uuid references auth.users not null,
  idea_id bigint references ideas on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, idea_id)
);

-- Create comments table
create table if not exists comments (
  id bigint primary key generated always as identity,
  user_id uuid references auth.users not null,
  idea_id bigint references ideas on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table likes enable row level security;
alter table comments enable row level security;

-- Policies for likes
create policy "Anyone can view likes"
  on likes for select
  using ( true );

create policy "Authenticated users can toggle likes"
  on likes for insert
  with check ( auth.uid() = user_id );

create policy "Users can remove own likes"
  on likes for delete
  using ( auth.uid() = user_id );

-- Policies for comments
create policy "Anyone can view comments"
  on comments for select
  using ( true );

create policy "Authenticated users can insert comments"
  on comments for insert
  with check ( auth.uid() = user_id );

create policy "Users can delete own comments"
  on comments for delete
  using ( auth.uid() = user_id );
