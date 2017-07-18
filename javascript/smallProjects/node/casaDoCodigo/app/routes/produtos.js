
module.exports = function(app) {
    //Rota
    app.get('/produtos', (req, res) => {
        let connection = app.infra.connectionFactory()
        let produtosDao = new app.infra.ProdutosDAO(connection)

        produtosDao.lista((err, results) => {
            // res.send('produtos/lista', {lista:results})
            res.render('produtos/lista', {lista:results})
        })

        // fechando a conexao
        connection.end()


    })

    app.get('/produtos/form', (req, res) => {
        res.render('produtos/form')
    })

    app.post('/produtos', (req, res) => {
        let connection = app.infra.connectionFactory()
        let produtosDao = new app.infra.ProdutosDAO(connection)

        // atraves do express, req é o objeto enviado atraves do formulario
        // ja vem em json
        let produto = req.body;

        produtosDao.salva(produto, (erros, resultados) => {
            // Semre que há um post, deve-re redirecionar para outra rota
            res.redirect('/produtos')
        })

        connection.end()
    })

}
