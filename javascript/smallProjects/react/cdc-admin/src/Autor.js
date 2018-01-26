import React, { Component } from 'react'
import $ from 'jquery'
import InputCustomizado from './components/InputCustomizado'

export default class AutorBox extends Component {

  constructor() {
    super();
    this.atualizaListagem = this.atualizaListagem.bind(this)
    // Propriedade state eh diponibilizada pelo proprio react
    this.state = {
      lista : [],
    };
  }

  // Hook disparado logo apos montar o componente
  componentDidMount(){
    $.ajax({
        // Servidor remoto onde se encontra o backend
        url:"http://cdc-react.herokuapp.com/api/autores",
        dataType: 'json',
        success:function(resposta){
          // Para atualizar a propriedade dinamicamente
          this.setState({lista:resposta});
        }.bind(this) // Setando o scopo para o react inves do jquery
      }
    );
  }

  atualizaListagem(novaLista) {
    this.setState({lista: novaLista})
  }

  render() {
    return (
      <div>
        <FormularioAutor cbAtualizaListagem={this.atualizaListagem}/>
        <TabelaAutores lista={this.state.lista}/>
      </div>
    )
  }
}

class FormularioAutor extends Component{
  constructor() {
    super();
    // Setando o escopo do react para a funcao
    this.submeterForm = this.submeterForm.bind(this)
    this.setNome = this.setNome.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.setSenha = this.setSenha.bind(this)
    // Propriedade state eh diponibilizada pelo proprio react
    this.state = {
      nome: '',
      email: '',
      senha: ''
    };
  }
  // Para retornar o componente para ser renderizado na view
  render() {
    return(
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.submeterForm} >
          <InputCustomizado id="nome" label="Nome" type="text" value={this.state.nome} onChange={this.setNome}></InputCustomizado>
          <InputCustomizado id="email" label="Email" type="email" value={this.state.email} onChange={this.setEmail}></InputCustomizado>
          <InputCustomizado id="senha" label="Senha" type="password" value={this.state.senha} onChange={this.setSenha}></InputCustomizado>

          <div className="pure-control-group">
            <label></label>
            <button type="submit" className="pure-button pure-button-primary">Gravar</button>
          </div>
        </form>

      </div>
    )
  }

  submeterForm(evento) {
    // Para nao atualizar a pagina
    evento.preventDefault()

    let state = this.state
    $.ajax({
      url:"http://cdc-react.herokuapp.com/api/autores",
      contentType: 'application/json',
      dataType: 'json',
      type: 'post',
      data: JSON.stringify({nome: state.nome, email: state.email, senha: state.senha}),
      success: (resposta) => {
        this.props.cbAtualizaListagem(resposta)
      },
      error: (error) => {
        console.log('Enviado com erro');
      }
    })
  }

  setNome(evento) {
    this.setState({nome: evento.target.value})
    // this.setState({form: {nome: evento.target.value}})
  }

  setEmail(evento) {
    this.setState({email: evento.target.value})
    // this.setState({form: {email: evento.target.value}})
  }

  setSenha(evento) {
    this.setState({senha: evento.target.value})
    // this.setState({form: {senha: evento.target.value}})
  }
}

class TabelaAutores extends Component {
  render() {
    return (
      <table className="pure-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.lista.map(function(autor){
              return (
                // A fim de otimizar a performance, deve-se setar um identificador em cada elemento
                <tr key={autor.id}>
                  <td>{autor.nome}</td>
                  <td>{autor.email}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    )
  }
}
