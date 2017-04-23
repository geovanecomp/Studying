class DateHelper {

    constructor() {
        throw new Error('DateHelper não pode ser instanciada')
    }

    static dataParaTexto(data) {
        // Usando template string
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
        // return data.getDate()
        //     + '/' + (data.getMonth() + 1)
        //     + '/' + data.getFullYear()
    }

    static textoParaData(texto) {

        // Validando a data
        if(/\d{4}-\d{2}-\d{2}/.test(texto))
            throw new Error('Data deve estar no formato aaaa-mm-dd')


        // Formatando utilizando expressão regular
        // let dataFormatada = new Date(this._inputData.value.replace(/-/g, ','))

        // Formatando usando o operador "spread" do ecma6, que automaticamente
        // quebra os elementos do array para cada posição dos parâmetros do construtor
        return new Date(...texto.split('-')
            .map(function (item, indice) {
                // Mês é de 0-11, neste caso, na posição 1 do array (mês), deve-se
                // decrementar uma unidade.
                if (indice === 1) {
                    return item - 1;
                }
                return item;
            })
        )
    }


}
