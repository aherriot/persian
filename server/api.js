var express = require('express');
var bodyParser = require('body-parser');

var api = express();

var words = [
  {id: '1', english: 'banana', persian: 'موز', phonetic: 'moz', tags: ['noun', 'food', 'fruit'], scores: 1},
  {id: '2', english: 'apple', persian: 'سیب', phonetic: 'sib', tags: ['noun', 'food', 'fruit'], scores: 1},
  {id: '3', english: 'pear', persian: 'گلابی', phonetic: 'golaabi', tags: ['noun', 'food', 'fruit'], scores: 2},
  {id: '4', english: 'fig', persian: 'انجیر', phonetic: 'anjir', tags: ['noun', 'food', 'fruit'], scores: 2}
];

var nextId = 5;

api.use(bodyParser.json());

api.get('/words', function(req, res) {
  res.json(words);
});

function addWord(word) {
  var newWord = {
    id: String(nextId++),
    english: word.english,
    persian: word.persian,
    phonetic: word.phonetic,
    tags: word.tags,
    scores: 0
  };
  words.push(newWord);
  return newWord;
}

api.post('/words', function(req, res) {

  if(Array.isArray(req.body)) {
    var newWords = [];

    for(var i = 0; i < req.body.length; i++) {
      newWords.push(addWord(req.body[i]));
    }
    return res.status(201).json(newWords);
  } else {

    var newWord = addWord(req.body);
    return res.status(201).json(newWord);
  }

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
      editedWord = Object.assign({}, word, req.body.word);
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
