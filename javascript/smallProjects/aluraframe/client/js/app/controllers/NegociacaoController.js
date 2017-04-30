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

        this._listaNegociacoes = ProxyFactory.create(
            new ListaNegociacoes(), ['adiciona', 'esvazia'], (model) => {
                this._negociacoesView.update(model)
            })

        this._mensagem = ProxyFactory.create(
            new Mensagem(), ['texto'], model => this._mensagemView.update(model))


        this._negociacoesView = new NegociacoesView($('#negociacoesView'))
        this._mensagemView = new MensagemView($('#mensagemView'))

        this._negociacoesView.update(this._listaNegociacoes)
        // this._mensagemView.update(this._mensagemView)
    }

    adiciona(event) {
        event.preventDefault()
        this._listaNegociacoes.adiciona(this._criaNegociacao())

        this._mensagem.texto = "Negociação adicionada com sucesso"
        this._limpaFormulario()

    }

    apaga() {
        this._listaNegociacoes.esvazia()
        this._mensagem.texto = "Negociações apagadas com sucesso"        
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        )
    }

    _limpaFormulario() {
        this._inputData.value = ''
        this._inputQuantidade.value = 1
        this._inputValor.value = 0.0

        this._inputData.focus()
    }
}
