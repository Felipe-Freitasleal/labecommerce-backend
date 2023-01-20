-- Active: 1674234746432@@127.0.0.1@3306
-- PRODUTOS ---------
CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    img TEXT
);

INSERT INTO products (id, name, price, category)
VALUES ("p0001", "Bicicleta", 1500, "Brinquedos"),
("p0002", "tênis esportivo", 120, "Roupas e calçados"),
("p0003", "action figure", 50, "Brinquedos"),
("p0004", "notebook", 2500, "Eletrônicos"),
("p0005", "boné", 20, "Acessórios"),
("p0006", "Garra para água", 16, "Acessórios");

SELECT * FROM products;

SELECT * FROM products
WHERE name = "notebook";

SELECT * FROM products
WHERE id = "p0001", id = "p0003";

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