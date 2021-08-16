BEGIN TRANSACTION;

CREATE TABLE login (
  id serial PRIMARY KEY,
  email text NOT NULL,
  hash varchar(100) NOT NULL 
);

COMMIT;