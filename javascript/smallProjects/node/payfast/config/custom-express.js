let express = require('express')
// Um helper para rotas
let consign = require('consign')
let bodyParser = require('body-parser')
let expressValidator = require('express-validator')
let morgan = require('morgan')
let logger = require('../servicos/logger')

module.exports = function () {
  let app = express()

  //Formato pre-definido pelo parametro common definido pelo padrao apache common log output
  app.use(morgan('common', {
    // Abre um pipe durante a requisicao para nao trava-la
    stream: {
      write: (mensagem) => {
        logger.info(mensagem)
      }
    }
  }))

  app.use(bodyParser.urlencoded({extended: true}))

  //  Registrando o body parser na aplicação
  app.use(bodyParser.json())

  // A fim de validar requests
  app.use(expressValidator())

  // Injetando dentro de app, todas as informações das rotas
  consign()
    .include('route')
    .then('dao')
    .then('service')
    .into(app)
  return app
}
