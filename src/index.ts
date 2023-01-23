import express, { Request, Response } from "express";
import { users, products, purchase } from "./database";
import cors from "cors";
import { TUser, TProduct, TPurchase, CATEGORY_PRODUCT } from "./types";
import { db } from "./database/knex";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3001, () => {
  console.log("Servidor na porta 3001");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
  console.log("Pong!");
});

//////           PEGAR TODOS OS USUÁRIOS            //////
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`SELECT * FROM users;`);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//////       PEGAR TODOS OS PRODUTOS         /////
app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`SELECT * FROM products;`);
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error.message);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

//////          PROCURAR PRODUTO POR QUERY      /////
app.get("/products/search", async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;
    if (q.length < 1) {
      res.status(400);
      throw new Error("A pesquisa deve ter ao menos um caractere.");
    }
    if (q.length >= 1) {
      // const getProductByName = products.filter((produto) => {
      //     return produto.name.toLowerCase().includes(q.toLowerCase())
      // })
      // if (getProductByName.length === 0) {
      //     res.status(400)
      //     throw new Error("Nenhum produto encontrado.")
      // } else {
      //     res.status(200).send(getProductByName)
      //     console.log(getProductByName)
      // }
      const getProduct = await db.raw(`
                SELECT * FROM products
                WHERE name LIKE "%${q}%";
            `);
      if (getProduct.length !== 0) {
        res.status(200).send(getProduct);
      } else {
        res.status(404);
        throw new Error("Nada foi encontrado.");
      }
    }
  } catch (error: any) {
    console.log(error.message);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

///////          CRIAR NOVO PRODUTO     //////////
app.post("/products", async (req: Request, res: Response) => {
  try {
    const { id, name, price, category, img } = req.body;

    if (
      id === undefined ||
      name === undefined ||
      price === undefined ||
      category === undefined
    ) {
      res.status(400);
      throw new Error("Id, nome, preço e categoria são obrigatórios.");
    }

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("O Id deve ser ser uma string");
      }

      const getId = await db.raw(`
        SELECT * FROM products
        WHERE id = "${id}"
      `);

      if (getId.length > 0) {
        res.status(400);
        throw new Error(
          "Id já cadastrado no sistem, não pode haver dois produtos com o mesmo id."
        );
      }
    }

    if (name !== undefined) {
      if (typeof name !== "string") {
        res.status(400);
        throw new Error("O nome deve ser uma string");
      }

      if (name.length < 3) {
        res.status(400);
        throw new Error("Nome deve ter ao menos 3 caracteres.");
      }

      const getName = await db.raw(`
        SELECT * FROM products
        WHERE name = "${name}"
      `);

      if (getName.length > 0) {
        res.status(400);
        throw new Error(
          "Nome já cadastrado no sistem, não pode haver dois produtos com o mesmo nome."
        );
      }
    }

    if (price !== undefined) {
      if (typeof price !== "number") {
        res.status(400);
        throw new Error("O preço deve ser um número.");
      }
      if (typeof price === "number") {
        if (price < 1) {
          res.status(400);
          throw new Error("O preço deve ser maior que R$0.");
        }
      }
    }

    if (
      category !== "Acessórios" &&
      category !== "Roupas e calçados" &&
      category !== "Eletrônicos" &&
      category !== "Brinquedos"
    ) {
      res.status(400);
      throw new Error(
        "A categoria do produto deve ser entre as opções oferecidas: Acessórios, Roupas e calçados, Eletrônicos ou Brinquedos."
      );
    }

    await db.raw(`
    INSERT INTO products (id, name, price, category, img)
    VALUES ("${id}", "${name}", ${price}, "${category}", "${img}");

`);

    res.status(201).send(" Produto cadastrado com sucesso");
  } catch (error: any) {
    console.log(error.message);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

////////       CRIAR NOVO USUÁRIO     /////////
app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("o Id deve ser ser uma string");
    }

    if (id.length < 6) {
      res.status(400);
      throw new Error("O id deve ter no mínimo 6 caracteres.");
    }

    if (typeof name !== "string") {
      res.status(400);
      throw new Error("O nome deve ser uma string");
    }

    if (name.length < 2) {
      res.status(400);
      throw new Error("O nome deve ter no mínimo 2 caracteres.");
    }

    if (typeof email !== "string") {
      res.status(400);
      throw new Error("O e-mail deve ser uma string");
    }

    if (typeof password !== "string") {
      res.status(400);
      throw new Error("A senha deve ter ao menos 6 caracteres.");
    }

    if (password.length < 6) {
      res.status(400);
      throw new Error("A senha deve ser uma string");
    }

    const getId = await db.raw(`
                SELECT * FROM users
                WHERE id = "${id}";
            `);

    console.log(getId);
    if (getId.length > 0) {
      res.status(400);
      throw new Error(
        "Id já cadastrado no sistem, não pode haver dois usuários com o mesmo id."
      );
    }

    const getEmail = await db.raw(`
            SELECT * FROM users
            WHERE email = "${email}";
        `);

    if (getEmail.length > 0) {
      res.status(400);
      throw new Error(
        "Email já cadastrado no sistem, não pode haver dois usuários com o mesmo id."
      );
    }

    const verifyEmail = email.includes("@");
    if (!verifyEmail) {
      res.status(400);
      throw new Error("Insira e-mail válido.");
    }

    await db.raw(`
        INSERT INTO users (id, name, email, password)
        VALUES ("${id}", "${name}", "${email}", "${password}");

    `);
    res.status(201).send("Cadastro realizado");
  } catch (error: any) {
    console.log(error.message);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

///////////      CRIAR NOVA COMPRA      ///////////
app.post("/purchase", async (req: Request, res: Response) => {
  try {
    const { id, total_price, paid, delivered_at, buyer_id } = req.body;

    if (!buyer_id) {
      res.status(400);
      throw new Error("Insira um id de usuário.");
    }

    if (!id) {
      res.status(400);
      throw new Error("Insira um id de produto.");
    }

    if (!total_price) {
      res.status(400);
      throw new Error("Insira total.");
    }

    if (id !== undefined) {
      const getId = await db.raw(`
            SELECT * FROM purchases
            WHERE id = "${id}"
        `);
      if (getId.length > 0) {
        res.status(400);
        throw new Error("Cadastre um id de usuário existente.");
      }
    }

    if (buyer_id !== undefined) {
      const getId = await db.raw(`
        SELECT * FROM purchases
        WHERE buyer_id = "${buyer_id}"
    `);
      if (getId.length > 0) {
        res.status(400);
        throw new Error("Cadastre um id de produto existente");
      }
    }

    await db.raw(`
        INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
        VALUES ("${id}", ${total_price}, ${paid}, "${delivered_at}", "${buyer_id}");
    `);

    res.status(201).send("Compra realizada com sucesso");
  } catch (error: any) {
    console.log(error.message);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

/////    *** AULA APROFUNDAMENTO API EXPRESS ***    ///////

///    PEGAR PRODUTO POR ID   ///
app.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("Insira um id de produto.");
    }

    const getProduct = await db.raw(`
        SELECT * FROM products
        WHERE id = "${id}"
      `);

    if (getProduct.length === 0) {
      res.status(400);
      throw new Error("Insira um id de produto válido.");
    }
    if (getProduct.length > 0) {
      res.status(200).send(getProduct);
    }
  } catch (error: any) {
    console.log(error.message);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

///    PEGAR USUARIO POR ID   ///
app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("Insira um id de produto.");
    }

    const getUser = await db.raw(`
        SELECT * FROM users
        WHERE id = "${id}"
      `);

    if (!getUser) {
      res.status(400);
      throw new Error("Insira um id de produto válido.");
    }

    if (getUser.length > 0) {
      res.status(200).send(getUser);
    }
  } catch (error: any) {
    console.log(error.message);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

///     PEGAR COMPRA DO USUÁRIO POR ID    ///
app.get("/users/:id/purchases", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("Insira um id de usuário.");
    }

    const getUserById = await db.raw(`
    SELECT * FROM purchases
    WHERE buyer_id = "${id}"
  `);

    if (getUserById.length === 0) {
      res.status(400);
      throw new Error("Insira um id de usuário válido.");
    }

    if (getUserById.length > 0) {
      res.status(200).send(getUserById);
    }

  } catch (error: any) {
    console.log(error.message);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

///    DELETAR USUÁRIO   ///
app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const getUserById = users.findIndex((user) => user.id === id);
    if (getUserById < 0) {
      res.status(400);
      throw new Error("Nenhum usuário encontrado.");
    }
    if (getUserById >= 0) {
      users.splice(getUserById, 1);
      res.status(200).send("Usuário excluído!");
      console.table(users);
    }
  } catch (error: any) {
    console.log(error.message);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

///   DELETAR PRODUTO   ///
app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const getProductById = products.findIndex((product) => product.id === id);
    if (getProductById < 0) {
      res.status(400);
      throw new Error("Nenhum produto encontrado.");
    }
    if (getProductById >= 0) {
      users.splice(getProductById, 1);
      res.status(200).send("Produto excluído!");
    }
    console.log(products);
  } catch (error: any) {
    console.log(error.message);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

///   MODIFICAR USUÁRIO   ///
app.put("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newId = req.body.id as string;
    const newEmail = req.body.email as string;
    const newPassword = req.body.password as string;

    if (typeof newId !== "string") {
      res.status(400);
      throw new Error("Insira válido válido.");
    }

    if (typeof newEmail !== "string") {
      res.status(400);
      throw new Error("Insira e-mail válido.");
    }

    if (typeof newPassword !== "string") {
      res.status(400);
      throw new Error("Insira senha válido.");
    }

    if (newId !== undefined) {
      if (newId) {
        const getUserById = users.find((user) => user.id === newId);
        if (getUserById) {
          res.status(400);
          throw new Error(
            "Id já cadastrado no sistem, não pode haver dois usuários com o mesmo id."
          );
        }
      }
    }

    if (newEmail !== undefined) {
      if (typeof newEmail === "string") {
        const getUserByEmail = users.find((user) => user.email === newEmail);
        if (getUserByEmail) {
          res.status(400);
          throw new Error(
            "E-mail já cadastrado no sistem, não pode haver dois usuários com o mesmo e-mail."
          );
        }
        const verifyEmail = newEmail.includes("@");
        if (!verifyEmail) {
          res.status(400);
          throw new Error("Insira e-mail válido.");
        }
      }
    }

    if (newPassword !== undefined) {
      if (typeof newPassword === "string") {
        if (newPassword.length < 3) {
          res.status(400);
          throw new Error("Insira senha maior que 3 dígitos");
        }
      }
    }

    const getUserById = users.find((users) => users.id === id);
    if (!getUserById) {
      res.status(400);
      throw new Error("Usuário não encontrado.");
    }
    if (getUserById) {
      getUserById.email = newEmail || getUserById.email;
      getUserById.password = newPassword || getUserById.password;

      res.status(200).send("Usário atualizado");
      console.log(getUserById);
    }
  } catch (error: any) {
    console.log(error.message);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

///   MODIFICAR PRODUTO   ///
app.put("/products/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const newId = req.body.id as string;
    const newName = req.body.name as string;
    const newPrice = req.body.price as number;
    const newCategory = req.body.category as CATEGORY_PRODUCT;

    if (typeof newId !== "string") {
      res.status(400);
      throw new Error("Insira id válido.");
    }

    if (typeof newName !== "string") {
      res.status(400);
      throw new Error("Insira nome válido.");
    }

    if (typeof newPrice !== "number") {
      res.status(400);
      throw new Error("Insira preço válido.");
    }

    if (
      newCategory !== "Acessórios" &&
      newCategory !== "Roupas e calçados" &&
      newCategory !== "Eletrônicos" &&
      newCategory !== "Brinquedos"
    ) {
      res.status(400);
      throw new Error(
        "A categoria do produto deve ser entre as opções oferecidas: Acessórios, Roupas e calçados, Eletrônicos ou Brinquedos."
      );
    }
    if (newId !== undefined) {
      const getProductById = products.find((product) => product.id === newId);
      if (getProductById) {
        res.status(400);
        throw new Error(
          "Id já cadastrado no sistem, não pode haver dois produtos com o mesmo id."
        );
      }
    }

    if (newName !== undefined) {
      if (newName.length < 3) {
        res.status(400);
        throw new Error("Nome deve ter ao menos 3 caracteres.");
      }
      const getProductByName = products.find(
        (product) => product.name === newName
      );
      if (getProductByName) {
        res.status(400);
        throw new Error(
          "Nome já cadastrado no sistem, não pode haver dois produtos com o mesmo nome."
        );
      }
    }

    if (newPrice !== undefined) {
      if (typeof newPrice !== "number") {
        res.status(400);
        throw new Error("O preço deve ser um número.");
      }
      if (typeof newPrice === "number") {
        if (newPrice < 1) {
          res.status(400);
          throw new Error("O preço deve ser maior que R$0.");
        }
      }
    }

    const getProductById = products.find((product) => product.id === id);
    if (!getProductById) {
      res.status(400);
      throw new Error("Produto não encontrado.");
    }
    if (getProductById) {
      getProductById.name = newName || getProductById.name;
      getProductById.price = isNaN(newPrice) ? getProductById.price : newPrice;
      getProductById.category = newCategory || getProductById.category;

      res.status(200).send("Produto atualizado");
      console.log(getProductById);
    }
  } catch (error: any) {
    console.log(error.message);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});
