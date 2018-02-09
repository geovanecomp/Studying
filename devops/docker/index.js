const express = require('express')

let app = express()
let port = 3000

app.use(express.static("."))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port , () => {
  console.log('Server is listening on port ', port);
})
