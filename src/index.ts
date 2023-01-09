import express, {Request, Response} from "express";
import { users, products, purchase } from "./database";
import cors from "cors";
import { TUser, TProduct, TPurchase } from "./types";

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

console.table(users)
console.table(products)
console.table(purchase)