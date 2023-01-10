import express, {Request, Response} from "express";
import { users, products, purchase } from "./database";
import cors from "cors";
import { TUser, TProduct, TPurchase, CATEGORY_PRODUCT } from "./types";

const app = express()
app.use(express.json())
app.use(cors())

app.listen(3001, ()=>{
    console.log("Servidor na por 3001")
})

app.get('/ping', (req: Request, res: Response)=>{
    res.send("Pong!")
})

app.get('/users', (req: Request, res: Response)=>{
    res.status(200).send(users)
})

app.get('/products', (req: Request, res: Response)=>{
    res.status(200).send(products)
})

app.get('/products/search', (req: Request, res: Response)=>{
    const q = req.query.q as string
    const buscarProdutoNome = products.filter((produto)=>{
        return produto.name.toLowerCase().includes(q.toLowerCase())
    })
    res.status(200).send(buscarProdutoNome)
})



app.post('/products', (req: Request, res: Response)=>{
    const { id, name, price, category } = req.body as TProduct
    const newProduct = {
        id,
        name,
        price,
        category
    }
    products.push(newProduct)
    console.log(' Produto cadastrodo com sucesso')
    res.status(201).send(products)
})

app.post('/users', (req: Request, res: Response)=>{
    const { id, email, password } = req.body as TUser
    const newUser = {
        id,
        email,
        password
    }
    users.push(newUser)
    res.status(201).send(users)
    console.log("Cadastro realizado")
})

app.post('/purchase', (req: Request, res: Response)=>{
    const { userId, productId, quantity, totalPrice } = req.body as TPurchase
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }
    purchase.push(newPurchase)
    console.log('Compra realizada com sucesso')
    res.status(201).send(purchase)
})

//AULA APROFUNDAMENTO API EXPRESS
app.get('/products/:id', (req:Request, res:Response)=>{ 
    const { id } = req.params

    const getProduct = products.find((product)=> product.id === id)
    if(getProduct){
        res.status(200).send(getProduct)
    } 
})

app.get('/users/:id/purchases', (req: Request, res: Response)=>{ 
    const id = req.params.id
    const getUserById= users.find((user)=> user.id === id)
    if(getUserById){
        const getPurchaseUserId = purchase.filter((p)=>{
            return p.userId === getUserById.id
        })
        if(getPurchaseUserId){
            res.status(200).send(getPurchaseUserId)
        }
    }
})

app.delete('/users/:id', (req: Request, res: Response)=>{
    const id = req.params.id
    const getUserById = users.findIndex((user)=> user.id === id)
    if(getUserById >= 0){
        users.splice(getUserById, 1)
        res.status(200).send("Usuário excluído!")
        console.table(users)
    }
})

app.delete('/products/:id', (req: Request, res: Response)=>{
    const id = req.params.id
    const getProductById = products.findIndex((product)=> product.id === id)
    if(getProductById >= 0){
        users.splice(getProductById, 1)
        res.status(200).send("Produto excluído!")
    }
    console.log(products)
})

app.put('/user/:id', (req: Request, res: Response)=>{
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

    const getUserById = users.find((users)=> users.id === id)
    if(getUserById){
        getUserById.email = newEmail || getUserById.email
        getUserById.password = newPassword || getUserById.password

        res.status(200).send("Usário atualizado")
        console.log(getUserById)
    }
})

app.put('/product/:id', (req: Request, res: Response)=>{
    const { id } = req.params

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as CATEGORY_PRODUCT | undefined

    const getProductById = products.find((product)=> product.id === id)
    if(getProductById){
        getProductById.name = newName || getProductById.name 
        getProductById.price = isNaN(newPrice) ?  getProductById.price : newPrice
        getProductById.category = newCategory || getProductById.category

        res.status(200).send("Produto atualizado")
        console.log(getProductById)
    }
})

// console.table(users)
// console.table(products)
// console.table(purchase)