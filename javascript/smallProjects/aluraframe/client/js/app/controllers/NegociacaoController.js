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

        // Formatando utilizando expressão regular
        // let dataFormatada = new Date(this._inputData.value.replace(/-/g, ','))

        // Formatando usando o operador "spread" do ecma6, que automaticamente
        // quebra os elementos do array para cada posição dos parâmetros do construtor
        let dataFormatada = new Date(...this._inputData.value.
            split('-')
            .map(function (item, indice) {                
                // Mês é de 0-11, neste caso, na posição 1 do array (mês), deve-se
                // decrementar uma unidade.
                if (indice === 1) {
                    return item - 1;
                }
                return item;
            })
        )

        let negociacao = new Negociacao(
            dataFormatada,
            this._inputQuantidade.value,
            this._inputValor.value
        )

        //Adiciona a negociacao em uma tabela

        console.log(negociacao);

    }
}
