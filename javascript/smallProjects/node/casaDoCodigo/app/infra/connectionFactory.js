// retorna uma funcao que representa um objeto mysql.
let mysql = require('mysql')

function createDBConnection() {
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'geovane',
        password: '',
        database: 'casadocodigo'
    })

    return connection
}

//Utilizando um wrapper, para não executar a função direto pelo autoload.
module.exports = function() {
    return createDBConnection
}
