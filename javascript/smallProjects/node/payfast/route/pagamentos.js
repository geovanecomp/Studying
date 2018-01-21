module.exports = function(app) {
  let pagamentoController = app.controller.pagamento

  app.get('/pagamentos', pagamentoController.index)

  app.post('/pagamentos/pagamento', pagamentoController.create)

  app.route('/pagamentos/pagamento/:id')
    .delete(pagamentoController.destroy)
    .get(pagamentoController.show)
    .put(pagamentoController.update)

}
