-- Create ideas table
create table if not exists ideas (
  id bigint primary key generated always as identity,
  user_id uuid references auth.users not null,
  title text not null,
  description text not null,
  tags text[] default '{}',
  looking_for text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table ideas enable row level security;

-- Policies
create policy "Anyone can view ideas"
  on ideas for select
  using ( true );

create policy "Authenticated users can insert ideas"
  on ideas for insert
  with check ( auth.uid() = user_id );

-- Optional: Policy for updating/deleting own ideas
create policy "Users can update own ideas"
  on ideas for update
  using ( auth.uid() = user_id );

create policy "Users can delete own ideas"
  on ideas for delete
  using ( auth.uid() = user_id );
