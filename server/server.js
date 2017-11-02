const path = require('path')
const express = require('express')
const compression = require('compression')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const api = require('./api')
const config = require('./config')

// Instantiate server
const app = express()

if (process.env.NODE_ENV === 'production') {
  app.use(compression())
}

// Setup request logger
if (process.env.NODE_ENV !== 'test') {
  app.use(
    morgan(
      ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
    )
  )
}

// add API routes
app.use('/api', api)

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')))

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
})

// Set up promise library to use with Mongoose
mongoose.Promise = global.Promise

let connectionString

if (process.env.NODE_ENV === 'test') {
  connectionString = config.TEST_CONNECTION
} else if (process.env.NODE_ENV === 'production') {
  connectionString = config.PRODUCTION_CONNECTION
} else {
  connectionString = config.DEVELOPMENT_CONNECTION
}

// Connect to DB
mongoose
  .connect(connectionString, { useMongoClient: true })
  .then(() => {
    console.log('Successfully connected to MongoDB.')

    const PORT = process.env.PORT || config.PORT
    app.listen(PORT, () => {
      console.log(
        `Server listening on port ${PORT} with NODE_ENV=${process.env.NODE_ENV}`
      )
    })
  })
  .catch(() => {
    console.error('Failed to connect to MongoDB')
    process.exit(1)
  })

module.exports = app
