let express = require('express')
// Um helper para rotas
let consign = require('consign')

module.exports = function () {
  let app = express()

  // Injetando dentro de app, todas as informações das rotas
  consign()
    .include('routes')
    .into(app)
  return app
}
