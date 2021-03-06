class NegociacaoController {
    constructor() {
        // Simulando jQuery / fazendo um micro framework
        // Usa-se o bind para manter a associção com o document do elemento
        let $ = document.querySelector.bind(document)
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')

        // O escopo de uma arrow function é lexico, não é dinâmico como o de uma função,
        // não muda conforme o contexto.
        // Ou seja, o escopo da arrow function nao ira mudar ao longo do tempo

        this._listaNegociacoes = new Bind(new ListaNegociacoes(),
             new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia'
        )

        this._mensagem = new Bind(new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto'
        )

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(negociacoes => negociacoes.forEach(negociacao =>
                this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => {
                console.log(erro)
                this._mensagem.texto = 'error'
            })

    }

    adiciona(event) {
        event.preventDefault()

        ConnectionFactory
            .getConnection()
            .then(connection => {
                let negociacao = this._criaNegociacao()
                debugger;
                new NegociacaoDao(connection)
                    .adiciona(negociacao)
                    .then(() => {
                        this._listaNegociacoes.adiciona(negociacao)
                        this._mensagem.texto = "Negociação adicionada com sucesso"
                        this._limpaFormulario()
                    })
            })
            .catch(erro => {
                this._mensagem.texto  = erro
            })


        // this._listaNegociacoes.adiciona(this._criaNegociacao())



    }

    apaga() {
        this._listaNegociacoes.esvazia()
        this._mensagem.texto = "Negociações apagadas com sucesso"
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        )
    }

    _limpaFormulario() {
        this._inputData.value = ''
        this._inputQuantidade.value = 1
        this._inputValor.value = 0.0

        this._inputData.focus()
    }

    importaNegociacoes() {
        let service = new NegociacaoService()

        Promise.all([
            service.obterNegociacoesDaSemana(),
            service.obterNegociacoesDaSemanaAnterior(),
            service.obterNegociacoesDaSemanaRetrasada()]
        ).then(negociacoes => {
            negociacoes
                .reduce((negociacoesFlat, array) => negociacoesFlat.concat(array), [])
                .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
        })
        .catch(error => this._mensagem.texto = error)

    }
}
