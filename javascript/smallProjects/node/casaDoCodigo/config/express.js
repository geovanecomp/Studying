// Para carregar as diversas rotas, sera utilizado o autoload do express
let load = require('express-load')

// Ao importar o express, ele retorna uma funcao / objeto chamada
// express(), que representa o express.
let bodyParser = require('body-parser')
let express = require('express')
let expressValidator = require('express-validator')
let app = express()

// var util = require('util'),
//     bodyParser = require('body-parser'),
//     express = require('express'),
//     expressValidator = require('express-validator'),
//     app = express();

// Para criar módulos, deve-se seguir a seguinte estrutura.
module.exports = function (){

    // Para acessar os recursos estaticos, css e etc
    app.use(express.static('./app/public'));
    // Usa o set quando quisermos definir variaveis para dentro o express que
    // sera usada em todo o sistema. Setando qual engine sera usada.
    app.set('view engine', 'ejs')

    // Definindo o novo diretorio de views
    app.set('views', './app/views')

    // Recebe funcoes que vao ser aplicadas no request na ordem em que foram
    // definidas
    //urlencoded é o formato que o servidor envia os dados por default
    app.use(bodyParser.urlencoded({extended: true}))
    // app.use(bodyParser.bodyParser({ extended: true })); //Documentacao esta assim, mas da erro

    // A fim de aplicar validações na request.
    // Deve ser seguido do bodyParser
    app.use(expressValidator())

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
