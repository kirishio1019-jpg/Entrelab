-- Add author_name column to ideas table
alter table ideas add column if not exists author_name text;
