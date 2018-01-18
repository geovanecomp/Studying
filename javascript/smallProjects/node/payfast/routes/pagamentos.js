module.exports = function(app) {
  app.get('/pagamentos', (req, res) => {
    res.send('Exibindo rota de pagamentos')
  })

  app.delete('/pagamentos/pagamento/:id', (req, res) => {
    let pagamento = req.body
    pagamento.id = req.params.id
    pagamento.status = 'CANCELADO'


    let connection = app.persistencia.connectionFactory()
    let pagamentoDao = new app.persistencia.pagamentoDao(connection)

    pagamentoDao.atualizar(pagamento, (erro, resultado) => {
      if (erro) {
        res.status(500).send(erro)
      } else {
        res.status(204).json(pagamento)
      }
    })

  })

  app.put('/pagamentos/pagamento/:id', (req, res) => {
    req.assert('forma_de_pagamento',
      'Forma de pagamento é de preenchimento obrigatório'). notEmpty()

    req.assert('valor',
      'Valor é de preenchimento obrigatório e deve ser um decimal')
        .notEmpty().isFloat()

    let requestErrors = req.validationErrors()

    if (requestErrors) {
      console.log('Foram encontrados erros de validação');
      res.status(400).send(requestErrors)
      return
    }

    let pagamento = req.body
    pagamento.id = req.params.id
    pagamento.data = new Date

    let connection = app.persistencia.connectionFactory()
    let pagamentoDao = new app.persistencia.pagamentoDao(connection)

    pagamentoDao.atualizar(pagamento, (erro, resultado) => {
      if (erro) {
        res.status(500).send(erro)
      } else {
        res.status(200).json(pagamento)
      }
    })

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
        res.status(500).send(erro)
      } else {
        pagamento.id = resultado.insertId
        res.location('/pagamentos/pagamento/' + pagamento.id)
        console.log('Pagamento criado')

        let response = {
          dados_do_pagamento: pagamento,
          links: [
            {
              href: `http://localhost:3000/pagamentos/pagamento/${pagamento.id}`,
              rel: 'confirmar',
              method: 'PUT'
            },
            {
              href: `http://localhost:3000/pagamentos/pagamento/${pagamento.id}`,
              rel: 'cancelar',
              method: 'DELETE'
            }

          ]
        }


        res.status(201).json(response)
      }
    })
  })

}
