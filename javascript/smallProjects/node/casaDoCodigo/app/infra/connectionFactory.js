// retorna uma funcao que representa um objeto mysql.
let mysql = require('mysql')

function createDBConnection() {

    // Verificando o ambiente, para não sujar o banco de desenvolvimento
    if (!process.env.NODE_ENV) {
        return mysql.createConnection({
            host: 'localhost',
            user: 'geovane',
            password: '',
            database: 'casadocodigo'
        })
    }

    if (process.env.NODE_ENV == 'test') {
        return mysql.createConnection({
            host: 'localhost',
            user: 'geovane',
            password: '',
            database: 'casadocodigo_test'
        })
    }
}

//Utilizando um wrapper, para não executar a função direto pelo autoload.
module.exports = function() {
    return createDBConnection
}
