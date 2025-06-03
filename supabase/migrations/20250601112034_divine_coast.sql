-- Create tables for the WhatsApp Autoresponder application
create table users (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null unique,
  profile_picture text,
  whatsapp_number text,
  whatsapp_connected boolean default false,
  created_at timestamp with time zone default now()
);

create table contacts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  name text not null,
  phone_number text not null,
  email text,
  notes text,
  created_at timestamp with time zone default now(),
  last_message_at timestamp with time zone
);

create table contact_groups (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamp with time zone default now()
);

create table contact_group_memberships (
  contact_id uuid references contacts(id) on delete cascade,
  group_id uuid references contact_groups(id) on delete cascade,
  created_at timestamp with time zone default now(),
  primary key (contact_id, group_id)
);

create table auto_responses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  name text not null,
  trigger text not null,
  response text not null,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

create table campaigns (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  name text not null,
  message text not null,
  status text not null,
  scheduled_for timestamp with time zone,
  sent_count integer default 0,
  delivered_count integer default 0,
  read_count integer default 0,
  created_at timestamp with time zone default now()
);

create table lead_pages (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  name text not null,
  description text,
  fields jsonb not null,
  theme text not null,
  custom_colors jsonb,
  visits integer default 0,
  conversions integer default 0,
  created_at timestamp with time zone default now()
);

create table messages (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  contact_id uuid references contacts(id) on delete cascade,
  content text not null,
  direction text not null,
  status text not null,
  is_automated boolean default false,
  created_at timestamp with time zone default now()
);

create table status_updates (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  content text not null,
  media_url text,
  status text not null,
  scheduled_for timestamp with time zone,
  created_at timestamp with time zone default now()
);