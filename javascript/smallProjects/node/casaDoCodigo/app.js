// Ao importar o express, ele retorna uma funcao / objeto chamada express(), que representa o express.
let express = require('express')
let app = express()

// Usa o set quando quisermos definir variaveis para dentor o express que sera usada em todo o sistema
// Setando qual engine sera usada
app.set('view engine', 'ejs')

app.get('/produtos', (req, res) => {
    // res.send('<html><body>Listando os produtos da loja utilizando express!</body></html>')
    // render(), renderizará uma página
    res.render('produtos/lista')
})

app.listen(3000, () => {
    console.log('servidor rodando')
})
