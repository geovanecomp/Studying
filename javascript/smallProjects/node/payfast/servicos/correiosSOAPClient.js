let soap = require('soap')

function CorreiosSOAPClient() {
  this._url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl'

  CorreiosSOAPClient.prototype.calculaPrazo = (args, callback) => {
    soap.createClient(this._url,
      (erro, cliente) => {
        cliente.CalcPrazo(args, callback)
      }
    )
  }
}

module.exports = function() {
  return CorreiosSOAPClient
}
