-- Migration number: 0001 	 2025-06-17T12:30:37.559Z

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    number TEXT,
    address TEXT,
    package TEXT
);

INSERT INTO users(name, number, address, internet) VALUES ('Andre', '085736', 'Purwosari', '15 Mbps-Rp. 165.000'), ('Andian', '202369', 'Sukorejo', '25 Mbps-Rp. 250.000'), ('Ana', '690087', 'Pandaaan', '50 Mbps-Rp. 450.000');