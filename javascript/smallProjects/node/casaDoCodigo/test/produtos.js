//Nao precisa dar o require no mocha, ja que o mocha executara este arquivo direto
let http = require('http')
let assert = require('assert')

// Para testar, devemos descrever o caso de teste atraves do 'describe,
// fornecida pelo mocha.
// É comum adicionar uma tralha para evedenciar os nomes /identificacoes dadas
describe('#ProdutosController', function(){
    //Por realizar uma requisição assincrona, deve-se informar ao mocha que
    // deve esperar a requiscao acabar, e isso vai ocorrer quando eu executar
    // novamente a 'funcaoFinalizacao'.
    it('#listagem json', function(done) {
        // Configuracoes de uma requisicao
        let configuracoes = {
            hostname: 'localhost',
            port:3000,
            path: '/produtos',
            headers: {
                'Accept': 'application/json'
            }
        }

        let req = http.get(configuracoes, function(res) {
            assert.equal(res.statusCode, 200)
            assert.equal(res.headers['content-type'], 'application/json; charset=utf-8')


            done()
        })

        req.end()
    })
})
