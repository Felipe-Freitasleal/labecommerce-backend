-- Active: 1673874229645@@127.0.0.1@null
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL 
);

SELECT * FROM users;

INSERT INTO users (id, email, password)
VALUES ("u0001", "bulbassauro@email.com", "pokemon123"),
("u0002", "maura_2000@email.com", "maurinha123"), 
("u0003", "jozinho-123@email.com", "jezinhoabc");

CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

SELECT * FROM products;

INSERT INTO products (id, name, price, category)
VALUES ("p0001", "Bicicleta", 1500, "Brinquedos"),
("p0002", "tênis esportivo", 120, "Roupas e calçados"),
("p0003", "action figure", 50, "Brinquedos"),
("p0004", "notebook", 2500, "Eletrônicos"),
("p0005", "boné", 20, "Acessórios");

DROP TABLE products;