import React, { Component } from 'react'
import PubSub from 'pubsub-js'

// O atributo props, guarda todos os atributos do componente
export default class InputCustomizado extends Component {
  constructor() {
    super()
    this.state = {msgErro: ''}
  }
  // Por apenas repassasar caracteristicas padrao, posso apenas repassar com spread operator
  render() {
    return(
      <div className="pure-control-group">

        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input {...this.props}/>
        <span className="error">{this.state.msgErro}</span>
      </div>
    )
  }

  // TODO: Corrigir bug ao acessar this.props.name
  componentDidMount() {
    PubSub.subscribe("erro-validacao", (topico, erro) => {
      if (erro.field === this.props.id){
        this.setState({msgErro:erro.defaultMessage});
      }
    })

    PubSub.subscribe("limpa-erros", (topico) => {
      this.setState({msgErro: ''})
    })
  }
}
