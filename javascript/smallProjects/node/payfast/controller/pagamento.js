let logger = require('../service/logger.js')

module.exports = (app) => {

  let controller = {}

  // -----------------------------------------------------------------------------

  controller.index = (req, res) => {
    let connection = app.dao.connectionFactory()
    let pagamentoDao = new app.dao.pagamentoDao(connection)

    pagamentoDao.listar((erro, resultado) => {
      if (erro) {
        console.log('Erro ao listar pagamentos: ', erro);
        res.status(500).send(erro)
        return
      }
      res.status(200).json(resultado)
      return
    })    
  }

  // -----------------------------------------------------------------------------

  controller.show = (req, res) => {
    let id = req.params.id

    logger.info('Log direto por info')

    let memcachedClient = app.service.memcachedClient()

    // buscar por uma chave, neste caso: nome-id
    memcachedClient.get('pagamento-' + id, (erro, retorno) => {
      if (erro || !retorno) {
        console.log('MISS - Chave nao encontrada');

        let connection = app.dao.connectionFactory()
        let pagamentoDao = new app.dao.pagamentoDao(connection)

        pagamentoDao.buscarPorId(id, (erro, resultado) => {
          if (erro) {
            console.log('Erro ao consultar pagamentos no banco: ', erro);
            res.status(500).send(erro)
            return
          }
          res.status(200).json(resultado)
          return
        })
      } else {
        console.log('HIT - Chave encontrada, valor: ', JSON.stringify(retorno));
        res.status(200).json(retorno)
        return
      }
    })
  }

  // -----------------------------------------------------------------------------

  controller.destroy = (req, res) => {
    let pagamento = req.body['pagamento']
    pagamento.id = req.params.id
    pagamento.status = 'CANCELADO'


    let connection = app.dao.connectionFactory()
    let pagamentoDao = new app.dao.pagamentoDao(connection)

    pagamentoDao.atualizar(pagamento, (erro, resultado) => {
      if (erro) {
        res.status(500).send(erro)
      } else {
        res.status(204).json(pagamento)
      }
    })
  }

  // -----------------------------------------------------------------------------

  controller.update = (req, res) => {
    req.assert('pagamento.forma_de_pagamento',
      'Forma de pagamento é de preenchimento obrigatório'). notEmpty()

    req.assert('pagamento.valor',
      'Valor é de preenchimento obrigatório e deve ser um decimal')
        .notEmpty().isFloat()

    let requestErrors = req.validationErrors()

    if (requestErrors) {
      console.log('Foram encontrados erros de validação');
      res.status(400).send(requestErrors)
      return
    }

    let pagamento = req.body['pagamento']
    pagamento.id = req.params.id
    pagamento.data = new Date

    let connection = app.dao.connectionFactory()
    let pagamentoDao = new app.dao.pagamentoDao(connection)

    pagamentoDao.atualizar(pagamento, (erro, resultado) => {
      if (erro) {
        res.status(500).send(erro)
      } else {
        res.status(200).json(pagamento)
      }
    })
  }

  // -----------------------------------------------------------------------------

  controller.create = (req, res) => {
    req.assert('pagamento.forma_de_pagamento',
     'Forma de pagamento é de preenchimento obrigatório').notEmpty()
    req.assert('pagamento.valor',
     "Valor é de preenchimento obrigatório e deve ser um decimal")
      .notEmpty().isFloat()

    let requestErrors = req.validationErrors()

    if (requestErrors) {
      console.log('Foram encontrados erros de validacao');
      res.status(400).send(requestErrors)
      return
    }

    let pagamento = req.body['pagamento']

    pagamento.status = 'Criado'
    pagamento.data = new Date

    let connection = app.dao.connectionFactory()
    let pagamentoDao = new app.dao.pagamentoDao(connection)

    pagamentoDao.salvar(pagamento, (erro, resultado) => {
      if (erro) {
        res.status(500).send(erro)
      } else {
        pagamento.id = resultado.insertId
        console.log('Pagamento criado')

        let memcachedClient = app.service.memcachedClient()

        memcachedClient.set('pagamento-' + pagamento.id, pagamento, 10000, (erro) => {
          if (!erro) {
            console.log('Nova chave adicionada ao cache: pagamento-' + pagamento.id);
          }
        })

        if (pagamento.forma_de_pagamento == 'cartao') {
          let cartao = req.body['cartao']
          let clienteCartoes = new app.service.clienteCartoes()

          clienteCartoes.autorizar(cartao, (exception, request, response, retorno) => {

            if (exception) {
              console.log(exception)
              res.status(400).send(exception)
              return
            }
            res.status(201).json(retorno)
            return
          })

        } else {
          res.location('/pagamentos/pagamento/' + pagamento.id)

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
      }
    })
  }

  return controller
}
