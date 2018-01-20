let memcached = require('memcached')

module.exports = function() {
  return createMemcachedClient;
}

function createMemcachedClient() {
  // Busca as informações aleatoriamente de um dos seus servers
  let cliente = new memcached('localhost:11211', {
    // Numero de tentativas que realizara em cada nó
    retries: 10,
    // Tempo de espera entre a falha de um servidor e o tempo de coloca-lo em serviço novamente
    retry: 10000,
    // Autoriza remover algum nó que esteja morto
    remove: true
  })

  return cliente
}
