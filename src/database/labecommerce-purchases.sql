-- Active: 1674234746432@@127.0.0.1@3306
-- Relações SQL I  
CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL AVG NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
VALUES ("PU0001", 3553.56, 0, DATETIME("now"), "u0001"),
("PU0002", 254.76, 0, DATETIME("now"), "u0001"),
("PU0003", 123.50, 0, DATETIME("now"), "u0002"),
("PU0004", 43.90, 0, DATETIME("now"), "u0002"),
("PU0005", 32.70, 0, DATETIME("now"), "u0003"),
("PU0006", 1250.78, 0, DATETIME("now"), "u0003");

SELECT * FROM users
INNER JOIN purchases
ON purchases.buyer_id = users.id;