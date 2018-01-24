import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';

class App extends Component {

  constructor() {
    super();
    // Setando o escopo do react para a funcao
    this.submeterForm = this.submeterForm.bind(this)
    this.setNome = this.setNome.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.setSenha = this.setSenha.bind(this)
    // Propriedade state eh diponibilizada pelo proprio react
    this.state = {
      lista : [],
      nome: '',
      email: '',
      senha: ''
      // form: {
      //   nome: '',
      //   email: '',
      //   senha: ''
      // }
    };
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
        this.setState({lista: resposta})
      },
      error: (error) => {
        console.log('Enviado com erro');
      }
    })
  }

  render() {
    return (
      <div id="layout">

          <a href="#menu" id="menuLink" className="menu-link">

              <span></span>
          </a>

          <div id="menu">
              <div className="pure-menu">
                  <a className="pure-menu-heading" href="#">Company</a>

                  <ul className="pure-menu-list">
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>


                  </ul>
              </div>
          </div>

              <div id="main">
                  <div className="header">
                    <h1>Cadastro de Autores</h1>
                  </div>
                  <div className="content" id="content">
                    <div className="pure-form pure-form-aligned">
                      <form className="pure-form pure-form-aligned" onSubmit={this.submeterForm} >
                        <div className="pure-control-group">
                          <label htmlFor="nome">Nome</label>
                          <input id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} />
                        </div>
                        <div className="pure-control-group">
                          <label htmlFor="email">Email</label>
                          <input id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} />
                        </div>
                        <div className="pure-control-group">
                          <label htmlFor="senha">Senha</label>
                          <input id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} />
                        </div>
                        <div className="pure-control-group">
                          <label></label>
                          <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                        </div>
                      </form>

                    </div>
                    <div>
                      <table className="pure-table">
                        <thead>
                          <tr>
                            <th>Nome</th>
                            <th>email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.lista.map(function(autor){
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
                    </div>
                  </div>
                </div>


      </div>
    );
  }
}

export default App;
