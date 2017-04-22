class Negociacao {
    constructor(data, quantidade, valor) {
        // Para evitar que pessoas passem uma instancia por parâmetro e com esta
        // alterar a minha data (que nesta regra de negócio não deve ser alterada)
        this._data = new Date(data.getTime())
        this._quantidade = quantidade
        this._valor = valor

        // Congelar um objeto para que não seja possível realizar nenhuma alteração
        // no objeto.
        Object.freeze(this)
    }

    //Com a palavra reservada get, poderei acessar o metodo
    get volume() {
        return this._quantidade * this._valor
    }

    get data() {
        //Devolvo uma cópia da data, para que qualquer alteração que for feita,
        //seja feita em sua cópia, pois o Object.freeze não congela "níveis profundos",
        //ou seja, apenas elementos que são acessados diretamente, como quantidade e valor

        return new Date(this._data.getTime())
    }

    get quantidade() {
        return this._quantidade
    }

    get valor() {
        return this._valor
    }
}
