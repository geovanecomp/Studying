let express = require('express')
// Carregando a funcao express
let app = express()

app.listen(3000, () => {
  console.log('Iniciando servidor na porta 3000');
})

app.get('/teste', (req, res) => {
  console.log('Recebendo a conexao de teste');
  res.send('Recenbendo conexao')
})
