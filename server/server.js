const http = require('http')
const fs = require('fs')
const path = require('path')

const port = 8080

const server = http.createServer(( req, res ) => {

  let requestedPath = req.url === '/' ? 'index.html' : req.url

  let extName = String(path.extname(requestedPath)).toLowerCase()
  
  if(!extName){
    requestedPath += '.html';
    extName = '.html'
  }
  
  const filePath = path.join(__dirname, requestedPath)

  const mimeType = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "text/png"
  }

  const contentType = mimeType[extName] || "application/octet-stream";

  fs.readFile(filePath, (e, content) => {
    if (e){
      res.writeHead('404', { 'Content-Type': 'text/html' })
      res.end('<h1>404: Content not found brooo</h1>')
    } else {
      res.writeHead('200', { 'Content-Type': contentType })
      res.end(content, 'utf-8')
    }
  })
})

server.listen(port, () => {
  console.log(`server is listening on port http://localhost:${port}`)
})