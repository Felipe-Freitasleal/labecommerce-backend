-- Active: 1674511049964@@127.0.0.1@3306
--------- RELAÇÕES SQL II -----------
CREATE TABLE purchases_products (
    purchase_id TEXT NO NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES 
('PU0005', 'p0005', 1),
('PU0005', 'p0006', 1),
('PU0006', 'p0004', 1);

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES 
('PU0001', 'p0003', 2),
('PU0002', 'p0004', 1),
('PU0003', 'p0006', 5);
SELECT * FROM purchases_products;

SELECT
    purchases.buyer_id AS buyerID,
    purchases_products.purchase_id AS idPurchase,
    purchases_products.product_id AS idProduct,
    products.name AS productName,
    products.price AS productPrice,
    purchases.total_price AS total_price
FROM purchases_products
LEFT JOIN purchases
ON purchases.id = purchases_products.purchase_id
RIGHT JOIN products
ON products.id = purchases_products.product_id;