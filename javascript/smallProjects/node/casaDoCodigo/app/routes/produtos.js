
module.exports = function(app) {
    //Rota
    app.get('/produtos', (req, res) => {
        let connection = app.infra.connectionFactory()
        let produtosBanco = new app.infra.ProdutosDAO(connection)

        produtosBanco.lista((err, results) => {
            // res.send('produtos/lista', {lista:results})
            res.render('produtos/lista', {lista:results})
        })

        // fechando a conexao
        connection.end()


    })

}
