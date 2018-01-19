let soap = require('soap')

soap.createClient('http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl',
  (erro, cliente) => {
    console.log('Client SOAP criado');

    cliente.CalcPrazo({
      'nCdServico':'40010',
      'sCepOrigem': '04101300',
      'sCepDestino': '65000600'
    }, (err, resultado) => {
      console.log(JSON.stringify(resultado));
    })
  }
)
