import { products } from "./database"
import { CATEGORY_PRODUCT } from "./types"

//Cadastrar Produto
function createProduct (idProduct: string, nameProduct: string, priceProduct: number, categoryProduct: CATEGORY_PRODUCT) {
    let newProduct = {
        id: idProduct,
        name: nameProduct,
        price: priceProduct,
        category: categoryProduct
    }
    products.push(newProduct)
    return console.log("Cadastro feito com sucesso!")
}

createProduct ("9389281", "Boneco", 35, CATEGORY_PRODUCT.TOYS)

//Pegar todos os Produtos
function getAllUsers () {
    console.table(products)
}
getAllUsers()

//busca por produtos baseado em um id da lista de products
function getProductById (idToSearch:string): {} {
    return products.filter((produto)=>{
        return produto.id === idToSearch
    })
}

let idToSearch:string = process.argv[2] 
console.log("Produto por Id", getProductById(idToSearch))


//busca por produtos baseado em um nome da lista de products
function queryProductsByName  (nameToSearch: string): {} {
    return products.filter((produto)=>{
        return produto.name.toLowerCase().includes(nameToSearch.toLowerCase())
    })
}

let nameToSearch:string = process.argv[3] 
console.log("Produto por Nome", queryProductsByName(nameToSearch))
