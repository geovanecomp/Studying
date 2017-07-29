module.exports = function (app) {
    app.get('/promocoes/form', (req, res) => {
        let connection = app.infra.connectionFactory()
        let produtosDao = new app.infra.ProdutosDAO(connection)

        produtosDao.lista((err, results) => {
            res.render('promocoes/form', {lista: results})
        })
        connection.end()
    })

    app.post('/promocoes', (req, res) => {

        let promocao = req.body
        var http = require('http').Server(app);
        var io = require('socket.io')(http);
        // io.emit('novaPromocao', promocao)
        app.get('io').emit('novaPromocao', promocao)
        console.log(promocao);
        res.redirect('promocoes/form')

        // let connection = app.infra.connectionFactory()
        // let produtosDao = new app.infra.ProdutosDAO(connection)
        //
        // produtosDao.lista((err, results) => {
        //     res.render('promocoes/form', {lista: results})
        // })
        // connection.end()
    })
}
