function pagamentoDao(connection) {
  this._connection = connection
}

pagamentoDao.prototype.salvar = function(pagamento,callback) {
    this._connection.query('INSERT INTO pagamentos SET ?', pagamento, callback);
}

pagamentoDao.prototype.listar = function(callback) {
    this._connection.query('select * from pagamentos',callback);
}

pagamentoDao.prototype.buscarPorId = function (id,callback) {
    this._connection.query("select * from pagamentos where id = ?",[id],callback);
}

module.exports = function(){
    return pagamentoDao;
};
