var express = require('express');
var bodyParser = require('body-parser');

var api = express();

var words = [
  {id: '1', english: 'banana'},
  {id: '2', english: 'apple'},
  {id: '3', english: 'pear'},
  {id: '4', english: 'fig'}
];

var nextId = 5;

api.use(bodyParser.json());

api.get('/words', function(req, res) {
  res.json(words);
});

api.post('/words', function(req, res) {
  var word = {
    id: String(nextId++),
    english: req.body.english
  };

  words.push(word);

  res.status(201).json({id: word.id});
});

api.get('/words/:word_id', function(req, res) {
  var foundWord = words.find(function(word) {
    return word.id === req.params.word_id;
  });

  if (foundWord) {
    res.json(foundWord);
  } else {
    res.status(404).json({message: 'resource not found'});
  }
});

api.put('/words/:word_id', function(req, res) {
  var found = false;
  words.map(function(word) {
    if (word.id === req.params.word_id) {
      found = true;
      word.english = req.body.english;
      return word;
    } else {
      return word;
    }
  });

  if (found) {
    res.json({status: 'success'});
  } else {
    res.status(404).json({message: 'resource not found'});
  }
});

api.delete('/words/:word_id', function(req, res) {
  var found = false;
  words = words.filter(function(word) {
    if (word.id === req.params.word_id) {
      found = true;
      return false;
    }
    return true;
  });

  if (found) {
    res.json({status: 'success'});
  } else {
    res.status(404).json({message: 'resource not found'});
  }
});

api.get('/test', function(req, res) {
  res.json({test: 'test'});
});

api.all('*', function(req, res) {
  res.status(404).json({message: 'path not found'});
});

module.exports = api;
