class NegociacaoController {
    constructor() {
        // Simulando jQuery / fazendo um micro framework
        // Usa-se o bind para manter a associção com o document do elemento
        let $ = document.querySelector.bind(document)
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')
    }

    adiciona(event) {
        event.preventDefault()        

        let negociacao = new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        )

        //Adiciona a negociacao em uma tabela
        let diaMesAno = DateHelper.dataParaTexto(negociacao.data)
        console.log(diaMesAno);

    }
}
