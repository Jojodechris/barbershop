DROP TABLE IF EXISTS users;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  username text NOT NULL,
  password text NOT NULL,
  type text NOT NULL
);

CREATE TABLE reviews
(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  rating INTEGER,
  content TEXT
);




