import React, { Component } from 'react'
import $ from 'jquery'
import InputCustomizado from './components/InputCustomizado'
// Lib de publish e subscribe
import PubSub from 'pubsub-js'
import Erro from './Erro'

export default class LivroBox extends Component {

  constructor() {
    super();
    // Propriedade state eh diponibilizada pelo proprio react
    this.state = {
      lista : [],
      autores: []
    };
  }

  // Hook disparado logo apos montar o componente
  componentDidMount(){
    $.ajax({
        // Servidor remoto onde se encontra o backend
        url:"http://cdc-react.herokuapp.com/api/livros",
        dataType: 'json',
        success:function(resposta){
          // Para atualizar a propriedade dinamicamente
          this.setState({lista:resposta});
        }.bind(this) // Setando o scopo para o react inves do jquery
      }
    );

    $.ajax({
        // Servidor remoto onde se encontra o backend
        url:"http://cdc-react.herokuapp.com/api/autores",
        dataType: 'json',
        success:function(resposta){
          // Para atualizar a propriedade dinamicamente
          this.setState({autores:resposta});
        }.bind(this) // Setando o scopo para o react inves do jquery
      }
    );

    PubSub.subscribe('atualizar-listagem-livros', (topico, novaLista) => {
      this.setState({lista: novaLista})
    })
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>Bem vindo ao cadastro de livros</h1>
        </div>
        <div className="content" id="content">
          <FormularioLivro autores={this.state.autores}/>
          <TabelaLivros lista={this.state.lista}/>
        </div>
      </div>
    )
  }
}

class FormularioLivro extends Component{
  constructor() {
    super();
    // Setando o escopo do react para a funcao
    this.submeterForm = this.submeterForm.bind(this)
    this.setTitulo = this.setTitulo.bind(this)
    this.setPreco = this.setPreco.bind(this)
    this.setAutorId = this.setAutorId.bind(this)
    // Propriedade state eh diponibilizada pelo proprio react
    this.state = {
      titulo: '',
      preco: '',
      autorId: ''
    };
  }
  // Para retornar o componente para ser renderizado na view
  // React injeta esta propriedade value, que automaticamente ja setara o valor correto em uma alteracao
  render() {
    return(
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.submeterForm} >
          <InputCustomizado id="titulo" label="Titulo" type="text" value={this.state.titulo} onChange={this.setTitulo}></InputCustomizado>
          <InputCustomizado id="preco" label="Preco" type="text" value={this.state.preco} onChange={this.setPreco}></InputCustomizado>

          <div className="pure-control-group">
            <label htmlFor="autorId">Autor</label>
            <select value={this.state.autorId} className="pure-control-group" onChange={this.setAutorId}>
              <option value="">Selecione um autor</option>
              {
                this.props.autores.map((autor) => {
                  return <option value={autor.id}>{autor.nome}</option>
                })
              }
            </select>
            <span className="error">{this.state.msgErro}</span>
          </div>

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
      url:"http://cdc-react.herokuapp.com/api/livros",
      contentType: 'application/json',
      dataType: 'json',
      type: 'post',
      data: JSON.stringify({titulo: state.titulo, preco: state.preco, autorId: state.autorId}),
      success: (novaListagem) => {
        this.setState({titulo: '', preco: '', autorId: ''})
        // Params: Topico para todos ouvirem, o que sera escutado
        PubSub.publish('atualizar-listagem-livros', novaListagem)
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

  setTitulo(evento) {
    this.setState({titulo: evento.target.value})
  }

  setPreco(evento) {
    this.setState({preco: evento.target.value})
  }

  setAutorId(evento) {
    this.setState({autorId: evento.target.value})
  }
}

class TabelaLivros extends Component {
  render() {
    return (
      <table className="pure-table">
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Preco</th>
            <th>Autor</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.lista.map(function(livro){
              return (
                // A fim de otimizar a performance, deve-se setar um identificador em cada elemento
                <tr key={livro.id}>
                  <td>{livro.titulo}</td>
                  <td>{livro.preco}</td>
                  <td>{livro.autor.nome}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    )
  }
}
