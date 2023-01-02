const parOuImpar = process.argv[2]
const value = Number(process.argv[3])

function numeroAleatório(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const numeroDoPc = numeroAleatório(0, 10)

const total = numeroDoPc + value
const testeDeValor = total % 2

if (!value || !parOuImpar) {
    console.log("Digite par ou impar e um número de 0 a 10.")
} else {
    if (testeDeValor === 0 && parOuImpar === "par") {
        console.log(`Você venceu, seu número foi ${value} e Você escolheu par, o pc escolheu impar com número ${numeroDoPc}, o valor total foi ${total}`)
    } else if (testeDeValor === 0 && parOuImpar === "impar") {
        console.log(`Você perdeu, seu número foi ${value} e Você escolheu impar, o pc escolheu par com número ${numeroDoPc}, o valor total foi ${total}`)
    } else if (testeDeValor === 1 && parOuImpar === "par") {
        console.log(`Você perdeu, seu número foi ${value} e Você escolheu par, o pc escolheu impar com número ${numeroDoPc},  o valor total foi ${total}`)
    } else if (testeDeValor === 1 && parOuImpar === "impar") {
        console.log(`Você venceu, seu número foi ${value} e Você escolheu impar, o pc escolheu par com número ${numeroDoPc},  o valor total foi ${total}`)
    }
}