let app = require('./config/custom-express')()

app.listen(3000, () => {
  console.log('Iniciando servidor na porta 3000');
})
