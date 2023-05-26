const express = require('express')
const http = require('http')
const app = express()
const cors = require('cors')
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const server = http.createServer(app)
const port = 3001

app.use(express.json())
app.use(cors())

app.get('/', (req,res) => {
  fs.readFile('./cards.json', 'utf8', (err,cards) => {
    if (err) {res.send(err);return}
    res.send(cards)
  })
})

app.post('/addcard', (req,res) => {
  let card = JSON.stringify(req.body);  
  fs.readFile('./cards.json', 'utf8', (err,cards) => {
    if(err){res.send(err);return}
    cards = cards.slice(0,-1) + `,${card}]`
  
    fs.writeFile('cards.json', cards, 'utf8', (err) => {
      if(err){res.send(err);return}
    })
  })
    
})



server.listen(port)