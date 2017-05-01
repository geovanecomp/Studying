class Bind {
    //...props rest operator (deve ser passado na ultima posicao)
    //Posos passar n parametros que 'cairao' como um array neste metodo
    constructor(model, view, ...props) {
        let proxy = ProxyFactory.create(model, props, model => view.update(model))

        view.update(model)

        // Em JS o construtor pode ter retorno, neste caso retornando a proxy
        return proxy
    }
}
