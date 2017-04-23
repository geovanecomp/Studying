class View {
    constructor(elemento) {
        this._elemento = elemento
    }

    // Forçando a implementação do método nas classes filhas
    template(model) {
        throw new Error("O método template é de implementação obrigatória")
    }

    update(model) {
        this._elemento.innerHTML = this.template(model)
    }
}
