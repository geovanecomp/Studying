let app = require('./config/express')()

app.get('/produtos', (req, res) => {
    // res.send('<html><body>Listando os produtos da loja utilizando express!</body></html>')
    // render(), renderizará uma página
    res.render('produtos/lista')
})

app.listen(3000, () => {
    console.log('servidor rodando')
})
