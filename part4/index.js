const app = require('./app') // the actual Express app
const http = require('http')
const config = require('./utils/config')

// Creates HTTP server
const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})