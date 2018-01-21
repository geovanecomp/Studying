let fs = require('fs')

fs.createReadStream('./imagem.png')
        // recebe como entrada a saída da função de onde ela foi invocada
  .pipe(fs.createWriteStream('imagem-com-stream.png'))
    // Para saber o fim, ja que nao possuo uma callback, fico ouvindo o evendo finish
  .on('finish', () => {
      console.log('Arquivo escrito com stream')
  })
