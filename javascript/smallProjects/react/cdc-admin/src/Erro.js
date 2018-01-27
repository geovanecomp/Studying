import PubSub from 'pubsub-js'


export default class Erro {
  publicarErros(erros) {
    let errors = erros.errors
    for (var i = 0; i < errors.length; i++) {
      PubSub.publish('erro-validacao', errors[i])
    }
  }
}
