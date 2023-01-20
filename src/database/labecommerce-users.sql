-- Active: 1674234746432@@127.0.0.1@3306
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users (id, name, email, password)
VALUES ("u0001", "Pokémon", "bulbassauro@email.com", "pokemon123"),
("u0002", "Maura Araujo", "maura_2000@email.com", "maurinha123"), 
("u0003", "José Lima", "jozinho-123@email.com", "jezinhoabc"),
("u0004", "Tartaruga", "tortuguita@email.com", "tartaruga123");

SELECT * FROM users;

DELETE FROM users
WHERE id = "u0003";

UPDATE users
SET password = "tortugaacb123"
WHERE id = "u0004";

SELECT * FROM users
ORDER BY email ASC;

DROP TABLE users;