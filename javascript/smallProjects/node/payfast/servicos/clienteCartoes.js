let restify = require('restify')
let clients = require('restify-clients');

function ClienteCartoes() {
  this._cliente = clients.createJsonClient({
    url: 'http://localhost:3001'
  })

  ClienteCartoes.prototype.autorizar = (cartao, callback) => {
    this._cliente.post('/cartoes/autoriza', cartao, callback)
  }
}

module.exports = function() {
  return ClienteCartoes
}
