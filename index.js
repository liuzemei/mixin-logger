const express = require('express')
const bodyParser = require('body-parser')
const { Client } = require('mixin-node-sdk')


const client = new Client(require('./config.json'))

const app = express()
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  if (req.method == 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

app.post("/message", async (req, res) => {
  try {
    const data = await client.sendTextMsg(req.body.to, req.body.text)
    return res.json(data)
  } catch (e) {
    return res.json(e)
  }
})

app.listen(3001, () => console.log('Example app listening on port 3001!'))