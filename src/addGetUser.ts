import { users } from "./database";

//Cadastrar Usuário
function createUser(idUser: string, emailUser: string, passwordUser: string) {
    let newUser = {
        id: idUser,
        email: emailUser,
        password: passwordUser
    }
    users.push(newUser)
    return console.log("Cadastro feito com sucesso!")
}
let idUser:string = process.argv[2] 
let emailUser:string = process.argv[3]
let passwordUser:string = process.argv[4]
createUser(idUser, emailUser, passwordUser)

//Pegar todos os usuários
function getAllUsers () {
    console.table(users)
}
getAllUsers()