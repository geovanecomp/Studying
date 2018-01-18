let restify = require('restify')
let clients = require('restify-clients');

let cliente = clients.createJsonClient({
  url: 'http://localhost:3001'
})

cliente.post('/cartoes/autoriza', (erro, req, res, retorno) => {
  console.log('Consumindo servicos de cartoes');
  console.log(retorno);
})
