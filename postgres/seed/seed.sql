BEGIN TRANSACTION;

INSERT into users (name, email) values('John', 'john@gmail.com');
INSERT into login (hash, email) values('$2a$10$CwdNGGM.Nf3LvZy.raFQJugJ6Bw6ZZd8SpWqC9ywmpJKDUogHPkFS', 'john@gmail.com');

COMMIT;