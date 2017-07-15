
module.exports = function(app) {
    //Rota
    app.get('/produtos', (req, res) => {
        // res.send('<html><body>Listando os produtos da loja utilizando express!</body></html>')
        // render(), renderizará uma página
        res.render('produtos/lista')
    })

}
