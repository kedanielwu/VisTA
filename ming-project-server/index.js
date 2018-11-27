var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/video', function(req, res){
  var fileName = req.query.id
  res.sendFile(fileName, {root: __dirname})
})

app.post('/master', function(req, res) {
  console.log(req.body)
  res.send(req.body)
})



app.listen(8080);
console.log('Listening on port 8080')
