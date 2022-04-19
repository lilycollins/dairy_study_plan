// var http = require('http')
// http.createServer(function(request, response) {
//   response.writeHead(200, {'Content-Type': 'text/plain'})
//   response.end('helloWorld!\n')
// }).listen(8888)
// console.log('server running at http://127.0.0.1:8888/')

// var http = require('http')
// var url = require('url')
// function onRequest(request, response) {
//   var pathName = url.parse(request.url).pathname
//   console.log('request for' + pathName + 'received')
//   response.writeHead(200, {'Content-Type': 'text/plain'})
//   response.end('over\n')
// }
// http.createServer(onRequest).listen(8888)
// console.log('serve has started')
// console.time()
// console.timeEnd()

const express = require('express')
const app = express()
app.get('/', function(req, res){
  res.send('this is port 3000')
})
app.listen(3000, ()=>{
  console.log(3000)
})