function ProdutosDAO(connection){
    this._connection = connection
}

ProdutosDAO.prototype.lista = function(callback) {
    this._connection.query('select * from produtos', callback)
}

ProdutosDAO.prototype.salva = function(produto, callback) {
    // 'set ?' ja associa as chaves e os valores vindos do json / objeto
    this._connection.query('insert into produtos set ?', produto, callback)
}

// ProdutosDAO.prototype.lista = (callback) => {
//     this._connection.query('select * from produtos', callback)
// }

module.exports = function() {
    return ProdutosDAO
}
