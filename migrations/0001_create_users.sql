-- Migration number: 0001 	 2025-06-17T12:30:37.559Z

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT
);

INSERT INTO users(name, address) VALUES ('Bagas', 'Purwosari'), ('Andian', 'Sukorejo'), ('Ana', 'Pandaaan');