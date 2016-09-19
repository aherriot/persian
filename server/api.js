var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var usersController = require('./controllers/users');
var wordsController = require('./controllers/words');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

mongoose.connect('mongodb://localhost/persian');
// db.words.find().forEach(function(word) {word.quizzedAt = null; db.words.save(word); });

var api = express.Router();

api.use(bodyParser.json());

api.use('/users', usersController);
api.use('/words', wordsController);

api.all('*', function(req, res) {
  res.status(404).json({error: 'path not found'});
});

module.exports = api;
