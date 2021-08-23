BEGIN TRANSACTION;

CREATE TABLE users (
  id serial PRIMARY KEY,
  name VARCHAR(100) NULL,
  email text NOT NULL,
  imageUrl text null
);

COMMIT; 