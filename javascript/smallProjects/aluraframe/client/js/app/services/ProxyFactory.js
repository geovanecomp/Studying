class ProxyFactory {
    // Geralmente em factory usa-se metodos estaticos

    static create(objeto, props, acao) {

        return new Proxy(objeto, {
            //get eh sempre chamado, toda vez que eu ler qualquer proprie
            //target: referencia ao objeto original
            //prop: a propriedade que esta sendo acessada
            //receiver: referencia para o prorpio proxy
            // Deve haver um return
            get(target, prop, receiver) {
                if (props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {
                    return function() {
                        console.log('Interceptando');
                        Reflect.apply(target[prop], target, arguments)
                        return acao(target)
                    }
                }

                return Reflect.get(target, prop, receiver)
            },

            set(target, prop, value, receiver) {

                if (props.includes) {
                    console.log('dentro do if set');
                    acao(target)
                }

                return Reflect.set(target, prop, value, receiver)
            }
        })
    }

    static _ehFuncao(func) {
        return typeof(func) == typeof(Function)
    }
}
