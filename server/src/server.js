const PORT = 8080
const http = require('http')
const app = require('./app')

const server = http.createServer(app)
const db = require("./db")



function startServer(){
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
  })
}

db.initDb((err, db) => {
  if(err){
    console.log(err)
  }
  else{
    startServer()
  }
})

