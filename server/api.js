var express = require('express');
var bodyParser = require('body-parser');

var api = express();

var words = [
  {id: '1', english: 'banana', persian: 'موز', phonetic: 'moz', scores: [1]},
  {id: '2', english: 'apple', persian: 'سیب', phonetic: 'sib', scores: [1]},
  {id: '3', english: 'pear', persian: 'گلابی', phonetic: 'golaabi', scores: [1]},
  {id: '4', english: 'fig', persian: 'انجیر', phonetic: 'anjir', scores: [1]}
];

var nextId = 5;

api.use(bodyParser.json());

api.get('/words', function(req, res) {
  res.json(words);
});

api.post('/words', function(req, res) {
  var word = {
    id: String(nextId++),
    english: req.body.english,
    persian: req.body.persian,
    phonetic: req.body.phonetic
  };

  words.push(word);

  res.status(201).json(word);
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
  var editedWord = {};
  words = words.map(function(word) {
    if (word.id === req.params.word_id) {
      found = true;
      editedWord = Object.assign(word, {
        english: req.body.word.english,
        persian: req.body.word.persian,
        phonetic: req.body.word.phonetic
      });
      return editedWord;
    } else {
      return word;
    }
  });

  if (found) {
    res.json({status: 'success', word: editedWord});
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
