class NegociacaoService {
    obterNegociacoesDaSemana(callback) {
        let xhr = new XMLHttpRequest()

        // xhr.open('GET', 'http://www.google.com.br')
        xhr.open('GET', 'negociacoes/semana');

        /* Estados de xhr
            0: requisicao ainda nao iniciada
            1: conexao com o servidor estabelecida
            2: requisicao recebida
            3: processando requisicao
            4: requisicao conlcuida e a resposta esta pronta
                // Pode acontecer um erro no servidor, e ele me retornar uma resposta valida
                //entao tambem tenho que conferir a resposta dada pelo servidor (status 200)
        */

        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log('Obtendo as negociacoes do servidor')
                    //Obtendo a resposta do servidor
                    //JSON.parse converte para objetos javascript
                    let lista = JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))

                    callback(null, lista)


                } else {
                    //Exibindo erro retornado pelo servidor
                    console.log(xhr.responseText)
                    callback('Não foi possivel obter as negociações', null)
                }
            }

        }

        xhr.send()

    }

    obterNegociacoesDaSemanaAnterior(callback) {
        let xhr = new XMLHttpRequest()

        // xhr.open('GET', 'http://www.google.com.br')
        xhr.open('GET', 'negociacoes/anterior');

        /* Estados de xhr
            0: requisicao ainda nao iniciada
            1: conexao com o servidor estabelecida
            2: requisicao recebida
            3: processando requisicao
            4: requisicao conlcuida e a resposta esta pronta
                // Pode acontecer um erro no servidor, e ele me retornar uma resposta valida
                //entao tambem tenho que conferir a resposta dada pelo servidor (status 200)
        */

        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log('Obtendo as negociacoes do servidor')
                    //Obtendo a resposta do servidor
                    //JSON.parse converte para objetos javascript
                    let lista = JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))

                    callback(null, lista)


                } else {
                    //Exibindo erro retornado pelo servidor
                    console.log(xhr.responseText)
                    callback('Não foi possivel obter as negociações', null)
                }
            }

        }

        xhr.send()

    }

    obterNegociacoesDaSemanaRetrasada(callback) {
        let xhr = new XMLHttpRequest()

        // xhr.open('GET', 'http://www.google.com.br')
        xhr.open('GET', 'negociacoes/retrasada');

        /* Estados de xhr
            0: requisicao ainda nao iniciada
            1: conexao com o servidor estabelecida
            2: requisicao recebida
            3: processando requisicao
            4: requisicao conlcuida e a resposta esta pronta
                // Pode acontecer um erro no servidor, e ele me retornar uma resposta valida
                //entao tambem tenho que conferir a resposta dada pelo servidor (status 200)
        */

        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log('Obtendo as negociacoes do servidor')
                    //Obtendo a resposta do servidor
                    //JSON.parse converte para objetos javascript
                    let lista = JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))

                    callback(null, lista)


                } else {
                    //Exibindo erro retornado pelo servidor
                    console.log(xhr.responseText)
                    callback('Não foi possivel obter as negociações', null)
                }
            }

        }

        xhr.send()

    }
}
