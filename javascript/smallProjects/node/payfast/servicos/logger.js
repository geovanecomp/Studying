let winston = require('winston')

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
