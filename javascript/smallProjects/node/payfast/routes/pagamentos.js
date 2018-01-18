module.exports = function(app) {
  app.get('/pagamentos', (req, res) => {
    res.send('Exibindo rota de pagamentos')
  })

  app.post('/pagamentos/pagamento', (req, res) => {
    let pagamento = req.body

    pagamento.status = 'Criado'
    pagamento.data = new Date

    let connection = app.persistencia.connectionFactory()
    let pagamentoDao = new app.persistencia.pagamentoDao(connection)

    pagamentoDao.salvar(pagamento, (erro, resultado) => {      
      console.log('Pagamento criado')
      res.json(pagamento)
    })
  })

}
