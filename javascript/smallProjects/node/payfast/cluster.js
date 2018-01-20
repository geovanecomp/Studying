let cluster = require('cluster')
let os = require('os')

let cpus = os.cpus()

// Gera um nova thread que passa a ser filho desta original
// cluster.fork esta disponivel apenas para master e nao para slave
console.log('executando thread');
if (cluster.isMaster) {
  console.log('thread master');
  cpus.forEach(() => {
    cluster.fork()
  })

  // Para cada uma thread tem-se um objeto com suas informacoes
  cluster.on('listening', (worker) => {
    console.log('Novo cluster conectado: ', worker.process.pid);
  })

  cluster.on('exit', (worker) => {
    console.log('Cluster %d desconectado', worker.process.pid);
    // Reconectando o cluster
    cluster.fork()

  })
} else {
  console.log('else eh slaver');
  // Abrindo o projeto em varias threads, a fim de otimizar a performance
  require('./index.js')
}
