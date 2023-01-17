-- Active: 1673891744087@@127.0.0.1@3306
-- USUARIOS ------------
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL 
);

INSERT INTO users (id, email, password)
VALUES ("u0001", "bulbassauro@email.com", "pokemon123"),
("u0002", "maura_2000@email.com", "maurinha123"), 
("u0003", "jozinho-123@email.com", "jezinhoabc");

SELECT * FROM users;

INSERT INTO users (id, email, password)
VALUES ("u0004", "tortuguita@email.com", "tartaruga123");

DELETE FROM users
WHERE id = "u0003";

UPDATE users
SET password = "tortugaacb123"
WHERE id = "u0004";

SELECT * FROM users
ORDER BY email ASC;

-- PRODUTOS ---------
CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products (id, name, price, category)
VALUES ("p0001", "Bicicleta", 1500, "Brinquedos"),
("p0002", "tênis esportivo", 120, "Roupas e calçados"),
("p0003", "action figure", 50, "Brinquedos"),
("p0004", "notebook", 2500, "Eletrônicos"),
("p0005", "boné", 20, "Acessórios");

SELECT * FROM products;

SELECT * FROM products
WHERE name = "notebook";

INSERT INTO products (id, name, price, category)
VALUES ("p0006", "Garra para água", 16, "Acessórios");

SELECT * FROM products
WHERE id = "p0001";

DELETE FROM products
WHERE id = "p0003";

UPDATE products
SET price = 200
WHERE id = "p0002";

SELECT * FROM products
ORDER BY price ASC
LIMIT 20
OFFSET 0;

SELECT * FROM products
WHERE price > 100 
AND price < 3000
ORDER BY price ASC;

-- EXCLUIR TABELA
DROP TABLE products;

-- APROFUNDAMENTO SQL ATIVIDADE
