let fs = require('fs')

// Exemplo de requisicao de upload:
// curl -X POST http://localhost:3000/upload/imaata-binary @util/imagem.png -v -H "Content-type: application/octet-stream" -H "filename: imagem.png"

module.exports = function(app) {
  app.post('/upload/imagem',  (req, res) => {
    console.log('recebendo a imagem')

    // O nome do arquivo deve ser setado na requisicao
    let fileName = req.headers.filename;

    // Nao funciona para strem, pois efetua a leitura em buffer (tudo de uma vez)
    // let body = req.body
    req.pipe(fs.createWriteStream('files/' + fileName))
      .on('finish', () => {
        console.log('Arquivo enviado');
        res.status(201).send('Sucesso')
      })

  })
}
