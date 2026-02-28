const http = require('http')

const hostname = '127.0.0.1'
const port = 2000
const server = http.createServer((req, res) => {
  if(req.url === '/'){
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('hello from index file')
  }else if(req.url === '/login'){
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('hello from login file')
  }else{
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end('404: Error :(')
  }
});
server.listen(port, hostname, () => {
  console.log(`server is listening on port http://${hostname}:${port}/`)
})
