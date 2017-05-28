class NegociacaoDao {
    constructor(connection) {
        this._connection = connection
        this._store = 'negociacoes'
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {
            let transaction = this._connection.transaction([this._store], 'readwrite')

            let store = transaction.objectStore(this._store)

            let request = store.add(negociacao)

            request.onsuccess = e => {
                //Nao preciso fazer nada, ja que estou adicionando, tipo um 'void'
                resolve()
            }

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível adicionar a negociação')
            }
        })
    }

    listaTodos() {
        return new Promise((resolve, reject) => {
            //cursor me da um ponteiro para meu primeiro objeto na objectStore
            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor()

            let negociacoes = []

            cursor.onsuccess = e => {

                //'e' eh um ponteiro para um objeto "no banco" que eh um json
                let ponteiro = e.target.result
                if (ponteiro) {
                    let negociacaoStore = ponteiro.value;

                    negociacoes.push(new Negociacao(negociacaoStore._data, negociacaoStore._quantidade, negociacaoStore._valor))

                    //Avancando para o proximo ponteiro
                    ponteiro.continue();
                } else { //Espero terminar de ler todos os itens
                    // console.log('Minha lista de negociacoes', negociacoes);
                    resolve(negociacoes)
                }

            }

            cursor.onerror = e => {
                console.log('Nao foi possivel obter as negociacoes');
                console.log(e.target.error.name);
            }
        })
    }
}
