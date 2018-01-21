let winston = require('winston')
let fs = require('fs')

// Criando a pasta de logs caso nao exista
if (!fs.existsSync('log')) {
  fs.mkdirSync('log')
}

let logger = new winston.Logger({
  transports: [
    // Posso definir gravar em file ou console
    new winston.transports.File({
      level: 'info',
      filename: 'logs/payfast.log',
      maxSize: 100000,
      maxFiles: 10
    })
  ]
})

module.exports = logger
