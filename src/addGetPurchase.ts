import { purchase } from "./database";
import { TPurchase } from "./types";


//cria uma nova compra na lista de purchases
function createPurchase (newUserI:string, newProductId:string, newQuantity:number, newTotalPrice:number){
    let newPurchase = {
        userId: newUserI,
        productId :newProductId,
        quantity: newQuantity,
        totalPrice: newTotalPrice
    }
    purchase.push(newPurchase)
    return console.log("Compra realizada com sucesso")
}
let newUserI:string = process.argv[3] 
let newProductId:string = process.argv[4]
let newQuantity:number = Number(process.argv[5])
let newTotalPrice:number = Number(process.argv[6])
createPurchase(newUserI, newProductId, newQuantity, newTotalPrice)

//busca todas as compras feitas baseado no id do usuário
function getAllPurchasesFromUserId  (userIdToSearch:string): TPurchase[] {
    return purchase.filter((p)=>{
        return p.userId === userIdToSearch
    })
}

console.log("Compras do usuário", getAllPurchasesFromUserId("122334456"))