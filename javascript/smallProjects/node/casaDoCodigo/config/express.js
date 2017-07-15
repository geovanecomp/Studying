// Ao importar o express, ele retorna uma funcao / objeto chamada
// express(), que representa o express.
let express = require('express')
let app = express()

// Usa o set quando quisermos definir variaveis para dentro o express que
// sera usada em todo o sistema. Setando qual engine sera usada.
app.set('view engine', 'ejs')

// Para criar módulos, deve-se seguir a seguinte estrutura.
module.exports = function (){
    // app foi carregada anteriormente, desta forma nao preciso carregar
    // sempre, pois estou retornando a mesma referencia.
    return app
}
