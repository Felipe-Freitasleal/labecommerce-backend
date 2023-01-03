import { TUser, TProduct, TPurchase } from "./types";

export const user: TUser [] = [
    {
        id: "122334456",
        email: "joao2000@gmail.com",
        password: "joao2000-123"
    },
    {
        id: "654321",
        email: "ffcisca.gmail.com",
        password: "123fran123"
    }
]

export const product: TProduct [] = [
    {
        id: "12345",
        name: "Bola",
        price: 15,
        category: "Brinquedos"
    },
    {
        id: "54321",
        name: "Camiseta",
        price: 25,
        category: "Roupas"
    }
]

export const purchase: TPurchase [] = [
    {
        userId: "122334456",
        productId: "12345",
        quantity: 1,
        totalPrice: 15
    },
    {
        userId: "654321",
        productId: "54321",
        quantity: 1,
        totalPrice: 25
    }
]