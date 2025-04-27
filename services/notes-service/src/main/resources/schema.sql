CREATE TABLE IF NOT EXISTS note (
    id UUID default gen_random_uuid() primary key,
    username VARCHAR(255) not null,
    title VARCHAR(255) not null,
    description VARCHAR not null
);
