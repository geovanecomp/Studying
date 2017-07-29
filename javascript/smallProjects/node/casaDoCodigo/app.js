//express eh usado também para requests
let app = require('./config/express')()
// Socker.io espera um obj server nativo do node.
// Por isso instancio http e neste digo que usarei o express
let http = require('http').Server(app)
// Expera como argumento em handler de request
let io = require('socket.io')(http)

// Setando io para ser enxergado nos demais lugares atraves do app.get('io')
app.set('io', io)

//Vai usar a porta definida (por exemplo no heroku), ou a padrão
let porta = process.env.PORT || 3000
// app.listen(3000, () => {
http.listen(3000, () => {
    console.log('servidor rodando')
})
