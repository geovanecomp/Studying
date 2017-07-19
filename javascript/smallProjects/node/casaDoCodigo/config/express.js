// Para carregar as diversas rotas, sera utilizado o autoload do express
let load = require('express-load')

// Ao importar o express, ele retorna uma funcao / objeto chamada
// express(), que representa o express.
let express = require('express')
let app = express()
let bodyParser = require('body-parser')

// Para criar módulos, deve-se seguir a seguinte estrutura.
module.exports = function (){

    // Usa o set quando quisermos definir variaveis para dentro o express que
    // sera usada em todo o sistema. Setando qual engine sera usada.
    app.set('view engine', 'ejs')

    // Definindo o novo diretorio de views
    app.set('views', './app/views')

    // Recebe funcoes que vao ser aplicadas no request na ordem em que foram
    // definidas
    //urlencoded é o formato que o servidor envia os dados por default
    app.use(bodyParser.urlencoded({extended: true}))

    // Para aceitar requisicoes com dados em json
    app.use(bodyParser.json())

    // Tudo que tiver dentro de routes, no momento de execução irá para dentro de app
    // também será carregado tudo de infra
    // O segundo parametro indica onde o load deve procurar (evitar que busque em tudo)
    // A ordem importa! Não deve-se importar infra antes de routes por exemplo.
    // Neste caso ele carrega e já executa, por isso para a conneciton será utilizada
    // um wrapper;
    load('routes', {cwd: 'app'})
        .then('infra')
        .into(app)

    // app foi carregada anteriormente, desta forma nao preciso carregar
    // sempre, pois estou retornando a mesma referencia.
    return app
}
