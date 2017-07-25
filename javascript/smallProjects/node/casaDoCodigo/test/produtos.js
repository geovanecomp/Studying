//Nao precisa dar o require no mocha, ja que o mocha executara este arquivo direto
let express = require('../config/express')()

// Passa o express para a lib para já aplicar os testes direto pelas rotas
// Assim nao precisa subir o servidor, e pode usar diretamente a rota'
let request = require('supertest')(express)

let assert = require('assert')

// Para testar, devemos descrever o caso de teste atraves do 'describe,
// fornecida pelo mocha.
// É comum adicionar uma tralha para evedenciar os nomes /identificacoes dadas
describe('#ProdutosController', function(){
    //Por realizar uma requisição assincrona, deve-se informar ao mocha que
    // deve esperar a requiscao acabar, e isso vai ocorrer quando eu executar
    // novamente a 'funcaoFinalizacao'.
    it('#listagem json', function(done) {

        request.get('/produtos')
        .set('Accept', 'application/json') // Digo que espero como resposta um application/json
        .expect('Content-Type', /json/) // Validando com regex
        .expect(200, done)  // Só um argumento já é para o status da requisição
                            // Passa o done para finalizar o teste

        // // Configuracoes de uma requisicao
        // let configuracoes = {
        //     hostname: 'localhost',
        //     port:3000,
        //     path: '/produtos',
        //     headers: {
        //         'Accept': 'application/json'
        //     }
        // }

        // Forma antiga utilizando o objeto http
        // let req = request.get(configuracoes, function(res) {
        //     assert.equal(res.statusCode, 200)
        //     assert.equal(res.headers['content-type'], 'application/json; charset=utf-8')
        //
        //     done()
        // })
        // req.end()
    })

    it('#cadastro de novo produto com dados invalidos', function(done) {
        request.post('/produtos')
        .send({titulo:'', descricao:'novo livro'}) // Passando os argumentos via post
        // .expect('Content-Type', /html/) // Validando com regex
        .expect(400, done)
    })

    it('#cadastro de novo produto com dados validos', function(done) {
        request.post('/produtos')
        .send({titulo:'titulo', descricao:'novo livro', preco:20.50}) // Passando os argumentos via post
        // .expect('Content-Type', /html/) // Validando com regex
        .expect(302, done)
    })
})
