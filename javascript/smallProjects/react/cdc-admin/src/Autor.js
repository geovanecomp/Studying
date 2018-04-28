import React, { Component } from 'react'
import $ from 'jquery'
import InputCustomizado from './components/InputCustomizado'
// Lib de publish e subscribe
import PubSub from 'pubsub-js'
import Erro from './Erro'

export default class AutorBox extends Component {

  constructor() {
    super();
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

    PubSub.subscribe('atualizar-listagem-autores', (topico, novaLista) => {
      this.setState({lista: novaLista})
    })
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>Bem vindo ao cadastro de autores</h1>
        </div>
        <div className="content" id="content">
          <FormularioAutor/>
          <TabelaAutores lista={this.state.lista}/>
        </div>
      </div>
    )
  }
}

class FormularioAutor extends Component{
  constructor() {
    super();
    // Setando o escopo do react para a funcao
    this.submeterForm = this.submeterForm.bind(this)
    // this.atualizaState = this.atualizaState.bind(thiys)

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
          <InputCustomizado id="nome" label="Nome" type="text" value={this.state.nome} onChange={this.atualizaState.bind(this, 'nome')}></InputCustomizado>
          <InputCustomizado id="email" label="Email" type="email" value={this.state.email} onChange={this.atualizaState.bind(this, 'email')}></InputCustomizado>
          <InputCustomizado id="senha" label="Senha" type="password" value={this.state.senha} onChange={this.atualizaState.bind(this, 'senha')}></InputCustomizado>

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
      success: (novaListagem) => {
        this.setState({nome: '', email: '', senha: ''})
        // Params: Topico para todos ouvirem, o que sera escutado
        PubSub.publish('atualizar-listagem-autores', novaListagem)
      },
      error: (error) => {
        if (error.status === 400) {
          new Erro().publicarErros(error.responseJSON)
        }
        console.log('Enviado com erro');
      },
      beforeSend: () => {
        PubSub.publish('limpa-erros', {})
      }
    })
  }

  atualizaState(nomeInput, evento) {
    this.setState({[nomeInput]: evento.target.value})
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
