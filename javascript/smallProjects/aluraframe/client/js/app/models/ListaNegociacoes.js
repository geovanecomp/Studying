class ListaNegociacoes {
    constructor(callback) {
        this._negociacoes = []
        this._callback = callback
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao)
        this._callback(this)
    }

    get negociacoes() {
        // Programação defensiva!
        // Criar um novo array em memoria, impossibilitando que sejam feitas
        // alterações em meu atributo (como por exemplo via push) e sim na
        // cópia que estou retornando.
        return [].concat(this._negociacoes)
    }

    esvazia() {
        this._negociacoes = []
        this._callback(this)
    }
}
