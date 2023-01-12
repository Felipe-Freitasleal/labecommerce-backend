import express, { Request, Response } from "express";
import { users, products, purchase } from "./database";
import cors from "cors";
import { TUser, TProduct, TPurchase, CATEGORY_PRODUCT } from "./types";

const app = express()
app.use(express.json())
app.use(cors())

app.listen(3001, () => {
    console.log("Servidor na porta 3001")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send("Pong!")
    console.log("Pong!")
})

//////           PEGAR TODOS OS USUÁRIOS            //////
app.get('/users', (req: Request, res: Response) => {
    try {
        res.status(200).send(users)
    } catch (error: any) {
        console.log(error.message)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})


//////       PEGAR TODOS OS PRODUTOS         /////
app.get('/products', (req: Request, res: Response) => {
    try {
        res.status(200).send(products)
    } catch (error: any) {
        console.log(error.message)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})


//////          PROCURAR PRODUTO POR QUERY      /////
app.get('/products/search', (req: Request, res: Response) => {
    try {
        const q = req.query.q as string
        if (q.length < 1) {
            res.status(400)
            throw new Error("A pesquisa deve ter ao menos um caractere.")
        }
        if (q.length >= 1) {
            const getProductByName = products.filter((produto) => {
                return produto.name.toLowerCase().includes(q.toLowerCase())
            })
            if (getProductByName.length === 0) {
                res.status(400)
                throw new Error("Nenhum produto encontrado.")
            } else {
                res.status(200).send(getProductByName)
                console.log(getProductByName)
            }
        }
    } catch (error: any) {
        console.log(error.message)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

///////          CRIAR NOVO PRODUTO     //////////
app.post('/products', (req: Request, res: Response) => {
    try {
        const { id, name, price, category } = req.body as TProduct

        if(typeof id!== "string"){
            res.status(400)
            throw new Error("o Id deve ser ser uma string")
        }
    
        if(typeof name !== "string"){
            res.status(400)
            throw new Error("O nome deve ser uma string")
        }
    
        if(typeof price !== "number"){
            res.status(400)
            throw new Error("O preço deve ser um número.")
        }

        if (id !== undefined) {
            const getProductById = products.find((product) => product.id === id)
            if (getProductById) {
                res.status(400)
                throw new Error("Id já cadastrado no sistem, não pode haver dois produtos com o mesmo id.")
            }
        }

        if (name !== undefined) {
            if (name.length < 3) {
                res.status(400)
                throw new Error("Nome deve ter ao menos 3 caracteres.")
            }
            const getProductByName = products.find((product) => product.name === name)
            if (getProductByName) {
                res.status(400)
                throw new Error("Nome já cadastrado no sistem, não pode haver dois produtos com o mesmo nome.")
            }
        }

        if (price !== undefined) {
            if (typeof price !== "number") {
                res.status(400)
                throw new Error("O preço deve ser um número.")
            }
            if (typeof price === "number") {
                if (price < 1) {
                    res.status(400)
                    throw new Error("O preço deve ser maior que R$0.")
                }
            }
        }


        if (category !== "Acessórios" && category !== "Roupas e calçados" && category !== "Eletrônicos" && category !== "Brinquedos") {
            res.status(400)
            throw new Error("A categoria do produto deve ser entre as opções oferecidas: Acessórios, Roupas e calçados, Eletrônicos ou Brinquedos.")
        }

        const newProduct = {
            id,
            name,
            price,
            category
        }
        products.push(newProduct)

        console.log(' Produto cadastrado com sucesso')
        res.status(201).send(products)

    } catch (error: any) {
        console.log(error.message)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

////////       CRIAR NOVO USUÁRIO     /////////
app.post('/users', (req: Request, res: Response) => {
    try {
        const { id, email, password } = req.body as TUser

        if(typeof id !== "string"){
            res.status(400)
            throw new Error("o Id deve ser ser uma string")
        }
    
        if(typeof email !== "string"){
            res.status(400)
            throw new Error("O e-mail deve ser uma string")
        }
    
        if(typeof password !== "string"){
            res.status(400)
            throw new Error("A senha deve ser uma string")
        }
    
        if (id !== undefined) {
            const getUserById = users.find((user) => user.id === id)
            if (getUserById) {
                res.status(400)
                throw new Error("Id já cadastrado no sistem, não pode haver dois usuários com o mesmo id.")
            }
        }

        if (email !== undefined) {
            const getUserByEmail = users.find((user) => user.email === email)
            if (getUserByEmail) {
                res.status(400)
                throw new Error("E-mail já cadastrado no sistem, não pode haver dois usuários com o mesmo e-mail.")
            }
            const verifyEmail = email.includes("@")
            if (!verifyEmail) {
                res.status(400)
                throw new Error("Insira e-mail válido.")
            }
        }

        const newUser = {
            id,
            email,
            password
        }
        users.push(newUser)

        res.status(201).send(users)
        console.log("Cadastro realizado")

    } catch (error: any) {
        console.log(error.message)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

///////////      CRIAR NOVA COMPRA      ///////////
app.post('/purchase', (req: Request, res: Response) => {
    try {
        const { userId, productId, quantity, totalPrice } = req.body as TPurchase

        if (!userId) {
            res.status(400)
            throw new Error("Insira um id de usuário.")
        }

        if (!productId) {
            res.status(400)
            throw new Error("Insira um id de produto.")
        }

        if (!quantity) {
            res.status(400)
            throw new Error("Insira quantida do produto.")
        }

        if (!totalPrice) {
            res.status(400)
            throw new Error("Insira total.")
        }

        if (userId !== undefined) {
            const getUserById = purchase.find((purchase) => purchase.userId === userId)
            if (!getUserById) {
                res.status(400)
                throw new Error("Cadastre um id de usuário existente.")
            }
        }

        if (productId !== undefined) {
            const getProductById = purchase.find((purchase) => purchase.productId === productId)
            if (!getProductById) {
                res.status(400)
                throw new Error("Cadastre um id de produto existente")
            }
        }

        if (
            quantity !== undefined &&
            totalPrice !== undefined
        ) {
            if (typeof quantity !== "number" || typeof totalPrice !== "number") {
                res.status(400)
                throw new Error("Total e quantidade devem ser apenas números.")
            }
            if (typeof quantity === "number" && typeof totalPrice === "number") {
                const getProductById = products.find((product) => product.id === productId)
                const priceProducts = getProductById.price * quantity
                if (priceProducts !== totalPrice) {
                    res.status(400)
                    throw new Error("Total não corresponde a quantidade de produtos.")
                }
            }
        }

        const newPurchase = {
            userId,
            productId,
            quantity,
            totalPrice
        }
        purchase.push(newPurchase)
        console.log('Compra realizada com sucesso')
        res.status(201).send(purchase)
    } catch (error: any) {
        console.log(error.message)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

/////    *** AULA APROFUNDAMENTO API EXPRESS ***    ///////

///    PEGAR PRODUTO POR ID   ///
app.get('/products/:id', (req: Request, res: Response) => {
    try {
        const { id } = req.params

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("Insira um id de produto.")
        }

        const getProduct = products.find((product) => product.id === id)
        if (!getProduct) {
            res.status(400)
            throw new Error("Insira um id de produto válido.")
        }
        if (getProduct) {
            res.status(200).send(getProduct)
        }
    } catch (error: any) {
        console.log(error.message)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

///     PEGAR COMPRA DO USUÁRIO POR ID    ///
app.get('/users/:id/purchases', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("Insira um id de usuário.")
        }

        const getUserById = users.find((user) => user.id === id)
        if (!getUserById) {
            res.status(400)
            throw new Error("Insira um id de usuário válido.")
        }

        if (getUserById) {
            const getPurchaseUserId = purchase.filter((p) => {
                return p.userId === getUserById.id
            })
            if (!getPurchaseUserId) {
                res.status(400)
                throw new Error("Nenhum comprar encontrada para este usuário")
            }

            if (getPurchaseUserId) {
                res.status(200).send(getPurchaseUserId)
            }
        }
    } catch (error: any) {
        console.log(error.message)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

///    DELETAR USUÁRIO   ///
app.delete('/users/:id', (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const getUserById = users.findIndex((user) => user.id === id)
        if (getUserById < 0) {
            res.status(400)
            throw new Error("Nenhum usuário encontrado.")
        }
        if (getUserById >= 0) {
            users.splice(getUserById, 1)
            res.status(200).send("Usuário excluído!")
            console.table(users)
        }
    } catch (error: any) {
        console.log(error.message)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

///   DELETAR PRODUTO   ///
app.delete('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const getProductById = products.findIndex((product) => product.id === id)
        if(getProductById < 0){
            res.status(400)
            throw new Error("Nenhum produto encontrado.")
        }
        if (getProductById >= 0) {
            users.splice(getProductById, 1)
            res.status(200).send("Produto excluído!")
        }
        console.log(products)
    } catch (error: any) {
        console.log(error.message)
        if (res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
})

///   MODIFICAR USUÁRIO   ///
app.put('/users/:id', (req: Request, res: Response) => {
    try{        
        const id = req.params.id
        
        const newId = req.body.id as string 
        const newEmail = req.body.email as string
        const newPassword = req.body.password as string

        if(typeof newId !== "string"){
            res.status(400)
            throw new Error("Insira válido válido.")
        }

        if(typeof newEmail !== "string"){
            res.status(400)
            throw new Error("Insira e-mail válido.")
        }

        if(typeof newPassword !== "string"){
            res.status(400)
            throw new Error("Insira senha válido.")
        }
    
        if (newId !== undefined) {
            if(newId){
                const getUserById = users.find((user) => user.id === newId)
                if (getUserById) {
                    res.status(400)
                    throw new Error("Id já cadastrado no sistem, não pode haver dois usuários com o mesmo id.")
                }
            }
        }
    
        if (newEmail !== undefined) {
            if(typeof newEmail === "string"){
                const getUserByEmail = users.find((user) => user.email === newEmail)
                if (getUserByEmail) {
                    res.status(400)
                    throw new Error("E-mail já cadastrado no sistem, não pode haver dois usuários com o mesmo e-mail.")
                }
                const verifyEmail = newEmail.includes("@")
                if (!verifyEmail) {
                    res.status(400)
                    throw new Error("Insira e-mail válido.")
                }
            }
        }

        if(newPassword !== undefined){
            if(typeof newPassword === "string"){
                if(newPassword.length < 3){
                    res.status(400)
                    throw new Error("Insira senha maior que 3 dígitos")
                }
            }
        }
    
        const getUserById = users.find((users) => users.id === id)
        if(!getUserById){
            res.status(400)
            throw new Error("Usuário não encontrado.")
        }
        if (getUserById) {
            getUserById.email = newEmail || getUserById.email
            getUserById.password = newPassword || getUserById.password
    
            res.status(200).send("Usário atualizado")
            console.log(getUserById)
        }
    } catch (error: any){
        console.log(error.message)
        if (res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
})

///   MODIFICAR PRODUTO   ///
app.put('/products/:id', (req: Request, res: Response) => {
    try{

        const { id } = req.params
    
        const newId = req.body.id as string
        const newName = req.body.name as string
        const newPrice = req.body.price as number
        const newCategory = req.body.category as CATEGORY_PRODUCT
    
        if(typeof newId !== "string"){
            res.status(400)
            throw new Error("Insira id válido.")
        }
    
        if(typeof newName !== "string"){
            res.status(400)
            throw new Error("Insira nome válido.")
        }
    
        if(typeof newPrice !== "number"){
            res.status(400)
            throw new Error("Insira preço válido.")
        }
    
        if (newCategory !== "Acessórios" && newCategory !== "Roupas e calçados" && newCategory !== "Eletrônicos" && newCategory !== "Brinquedos") {
            res.status(400)
            throw new Error("A categoria do produto deve ser entre as opções oferecidas: Acessórios, Roupas e calçados, Eletrônicos ou Brinquedos.")
        }
        if (newId !== undefined) {
            const getProductById = products.find((product) => product.id === newId)
            if (getProductById) {
                res.status(400)
                throw new Error("Id já cadastrado no sistem, não pode haver dois produtos com o mesmo id.")
            }
        }
    
        if (newName !== undefined) {
            if (newName.length < 3) {
                res.status(400)
                throw new Error("Nome deve ter ao menos 3 caracteres.")
            }
            const getProductByName = products.find((product) => product.name === newName)
            if (getProductByName) {
                res.status(400)
                throw new Error("Nome já cadastrado no sistem, não pode haver dois produtos com o mesmo nome.")
            }
        }
    
        if (newPrice !== undefined) {
            if (typeof newPrice !== "number") {
                res.status(400)
                throw new Error("O preço deve ser um número.")
            }
            if (typeof newPrice === "number") {
                if (newPrice < 1) {
                    res.status(400)
                    throw new Error("O preço deve ser maior que R$0.")
                }
            }
        }
    
        const getProductById = products.find((product) => product.id === id)
        if (!getProductById){
            res.status(400)
            throw new Error("Produto não encontrado.")
        }    
        if (getProductById) {
            getProductById.name = newName || getProductById.name
            getProductById.price = isNaN(newPrice) ? getProductById.price : newPrice
            getProductById.category = newCategory || getProductById.category
    
            res.status(200).send("Produto atualizado")
            console.log(getProductById)
        }
    } catch(error: any){
        console.log(error.message)
        if (res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
})

// console.table(users)
// console.table(products)
// console.table(purchase)