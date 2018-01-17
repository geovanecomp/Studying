module.exports = function(app) {
  app.get('/pagamentos', (req, res) => {
    console.log('Estou na rota de pagamentos');
    res.send('Exibindo rota de pagamentos')
  })

}
