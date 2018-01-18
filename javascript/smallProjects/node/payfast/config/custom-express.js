let express = require('express')
// Um helper para rotas
let consign = require('consign')
let bodyParser = require('body-parser')

module.exports = function () {
  let app = express()

  app.use(bodyParser.urlencoded({extended: true}))

  //  Registrando o body parser na aplicação
  app.use(bodyParser.json())

  // Injetando dentro de app, todas as informações das rotas
  consign()
    .include('routes')
    .then('persistencia')
    .into(app)
  return app
}
