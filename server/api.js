var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var usersController = require('./controllers/users');
var wordsController = require('./controllers/words');
var scoresController = require('./controllers/scores');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

mongoose.connect('mongodb://localhost/persian');

var api = express.Router();

api.use(bodyParser.json());

api.use('/users', usersController);
api.use('/words', wordsController);
api.use('/scores', scoresController);

api.all('*', function(req, res) {
  res.status(404).json({error: 'path not found'});
});

module.exports = api;
