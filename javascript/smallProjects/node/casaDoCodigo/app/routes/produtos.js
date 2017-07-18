
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

    app.get('/produtos/form', (req, res) => {
        res.render('produtos/form')
        console.log('Estou em cadastro');

    })

}
