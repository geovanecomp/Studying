module.exports = function(app) {
  app.get('/pagamentos', (req, res) => {
    res.send('Exibindo rota de pagamentos')
  })

  app.post('/pagamentos/pagamento', (req, res) => {
    req.assert('forma_de_pagamento',
     'Forma de pagamento é de preenchimento obrigatório').notEmpty()
    req.assert('valor',
     "Valor é de preenchimento obrigatório e deve ser um decimal")
      .notEmpty().isFloat()

    let requestErrors = req.validationErrors()

    if (requestErrors) {
      console.log('Foram encontrados erros de validacao');
      res.status(400).send(requestErrors)
      return
    }

    let pagamento = req.body

    pagamento.status = 'Criado'
    pagamento.data = new Date

    let connection = app.persistencia.connectionFactory()
    let pagamentoDao = new app.persistencia.pagamentoDao(connection)

    pagamentoDao.salvar(pagamento, (erro, resultado) => {
      if (erro) {
        res.status(400).send(erro)
      } else {
        res.location('/pagamentos/pagamento/' + resultado.insertId)
        console.log('Pagamento criado')
        res.status(201).json(pagamento)
      }
    })
  })

}
