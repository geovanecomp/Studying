
module.exports = function(app) {
    //Rota
    app.get('/produtos', (req, res) => {
        let connection = app.infra.connectionFactory()
        let produtosDao = new app.infra.ProdutosDAO(connection)

        produtosDao.lista((err, results) => {
            // res.send('produtos/lista', {lista:results})

            // Permitindo vários tipos de retorno em função de possíveis requisições
            // É possível servir diferentes formatos de um mesmo conteúdo a partir da mesma url
            //  Evitando assim que se precisasse criar novas urls para cada formato necessário para exibir a lista de produtos
            // Ja possui algumas chaves com os tipos de retorno mais comuns
            res.format({
                html: function() {
                    res.render('produtos/lista', {lista:results})
                },
                json: function () {
                    res.json(results)
                }
            })
        })

        // fechando a conexao
        connection.end()
    })

    app.get('/produtos/form', (req, res) => {
        res.render('produtos/form', {errosValidacao: {}, produto:{}})
    })

    app.post('/produtos', (req, res) => {
        let connection = app.infra.connectionFactory()
        let produtosDao = new app.infra.ProdutosDAO(connection)

        // atraves do express, req é o objeto enviado atraves do formulario
        // ja vem em json
        let produto = req.body;

        // Dizendo que o titulo deve ser / seguir tal validação:
        req.assert('titulo', 'Titulo é obrigatório').notEmpty();
        req.assert('preco', 'Formato inválido').isFloat();

        // Usar validationErrors
        let erros = req.getValidationResult()

        if (erros) {

            //formatando retorno
            res.format({
                html: function() {
                    //se der um bad request, responde...:
                    res.status(400).render('produtos/form', {errosValidacao: erros, produto: produto})
                },
                json: function () {
                    res.status(400).json(erros)
                }
            })

            return
        }


        produtosDao.salva(produto, (erros, resultados) => {
            // Sempre que há um post, deve-re redirecionar para outra rota
            res.redirect('/produtos')
        })

        connection.end()
    })

}
