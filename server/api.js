const express = require('express')
const bodyParser = require('body-parser')

const scores = require('./controllers/scores')
const users = require('./controllers/users')
const words = require('./controllers/words')
const suggestions = require('./controllers/suggestions')

const api = express.Router()

// parse JSON on incoming requests
api.use(bodyParser.json())

api.use('/scores', scores)
api.use('/users', users)
api.use('/words', words)
api.use('/suggestions', suggestions)

api.all('*', function(req, res) {
  res.status(404).json({ code: 'notFound', message: 'path not found' })
})

module.exports = api
