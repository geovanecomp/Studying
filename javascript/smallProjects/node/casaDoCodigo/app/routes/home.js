module.exports = function(app) {
    app.get('/', function(req, res) {
        let connection = app.infra.connectionFactory()
        let produtosDao = new app.infra.ProdutosDAO(connection)

        produtosDao.lista((err, results) => {
            res.render('home/index', {livros: results})
        })
        connection.end()
    })
}
