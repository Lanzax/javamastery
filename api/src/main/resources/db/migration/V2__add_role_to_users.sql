alter table if exists users
  add column if not exists role varchar(50) default 'USER' not null;
