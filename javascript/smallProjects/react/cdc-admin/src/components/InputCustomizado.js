import React, { Component } from 'react'
// O atributo props, guarda todos os atributos do componente
export default class InputCustomizado extends Component {
  render() {
    return(
      <div className="pure-control-group">
        <label htmlFor={this.props.nome}>{this.props.label}</label>
        <input id={this.props.nome} type={this.props.type} name={this.props.nome} value={this.props.nome} onChange={this.props.onChange} />
      </div>
    )
  }
}
