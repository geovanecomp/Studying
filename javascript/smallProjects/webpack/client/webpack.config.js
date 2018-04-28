const path = require('path')
const babiliPlugin = require('babili-webpack-plugin')

let plugins = []

// if(process.env.NODE_ENV == 'production') {
//   plugins.push(new babiliPlugin())
// }

module.exports = {
  // setando o arquivo inicial da aplicacao (ponto de entrada da applicacao)
  entry: './app-src/app.js',
  // onde vai ser gravado o bundle nofinal resolvido a partir do ponto de entrada
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  // setando regras / loaders para processar os modulos

  module: {
    rules: [
      {
        // setando as extensoes de arquvios que o webpack vai usar
        // considerando todos os aruqivos .js
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  // plugins: plugins
  plugins
}
