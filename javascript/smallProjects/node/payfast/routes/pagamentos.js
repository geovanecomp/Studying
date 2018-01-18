module.exports = function(app) {
  app.get('/pagamentos', (req, res) => {
    console.log('Estou na rota de pagamentos');
    res.send('Exibindo rota de pagamentos')
  })

  app.post('/pagamentos/pagamento', (req, res) => {
    console.log('AAAAA')
    let pagamento = req.body

    pagamento.status = 'Criado'
    pagamento.data = new Date

    console.log(pagamento)
    res.send('Estou no metodo post de pagamentos')
  })

}
