
// Adicionando a connection factory em um módulo para não deixar seus atributos
// de forma visivel fora do escopo. Já que esta dentro de uma funcao, as variaves
// possuem escopo local. E retorno a classe, para assim ter acesso a classe e seus metodos

// Mas ainda havia o problema da funcao 'tmp' pode ser chamada, por isso a trocou
// por uma funcao anonima e a auto invocou envolvendo-a com parenteses.
var ConnectionFactory = (function () {

    const stores = ['negociacoes']
    const version = 4
    const dbName = 'aluraFrame'

    var connection = null
    var close = null

    return class ConnectionFactory {

        constructor() {
            throw new Error("Não é possível criar instanciar de ConnectionFactory")
        }

        static getConnection() {
            return new Promise((resolve, reject) => {
                let openRequest = window.indexedDB.open(dbName, version)

                // Triade de eventos quando inicia-se uma requisicao de abertura no indexedDB
                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createStores(e.target.result)
                }

                openRequest.onsuccess = e => {
                    if (! connection) {
                        connection = e.target.result
                        //Proibindo o desenvolvedor de fechar a conexao
                        //Guardando a funcao orignal
                        close = connection.close.bind(connection)
                        connection.close = function() {
                            throw new Error('Você não pode fechar diretamente a conexão')
                        }
                    }

                    resolve(connection)
                }

                openRequest.onerror = e => {
                    console.log(e.target.error)
                    reject(e.target.error.name)
                }
            })
        }

        static _createStores(connection) {

            stores.forEach(store => {
                if (connection.objectStoreNames.contains(store)) {
                    connection.deleteObjectStore(store)
                }
                connection.createObjectStore(store, {autoIncrement: true})
            })

        }

        static closeConnection() {
            if(connection) {
                close()
                connection = null
            }
        }
    }

})()
