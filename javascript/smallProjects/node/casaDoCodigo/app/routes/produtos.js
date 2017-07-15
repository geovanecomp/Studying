
module.exports = function(app) {
    //Rota
    app.get('/produtos', (req, res) => {

        // retorna uma funcao que representa um objeto mysql.
        let mysql = require('mysql')
        let connection = mysql.createConnection({
            host: 'localhost',
            user: 'geovane',
            password: '',
            database: 'casadocodigo'
        })

        connection.query('select * from produtos', (err, results) => {
            res.send(results)
        })

        // fechando a conexao
        connection.end()


    })

}
