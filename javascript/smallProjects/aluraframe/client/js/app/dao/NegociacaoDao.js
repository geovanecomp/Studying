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
}
