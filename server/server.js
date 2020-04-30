const http = require('http')
const app = require('./app')

const port = 8000

const server = http.createServer(app)

server.listen(port, err => {
  if (err) {
    throw err
  }else {
    console.log(`Server listening at port ${port}`)
  }
})
