var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

mongoose.connect('mongodb://localhost/persian');

var wordSchema = new mongoose.Schema({
  createdAt: {type: Date, default: Date.now},
  modifiedAt: {type: Date},
  english:  {type: String, required: true},
  persian: {type: String, required: true},
  phonetic: {type: String, required: true},
  tags: {type: [String], required: true},
  scores: {type: Number, default: 0}, //todo: change to array
  // quizzedAt: {type: Date},
  // correctCount: {type: Number, default: 0},
  // wrongCount: {type: Number, default: 0},

});

var Word = mongoose.model('Word', wordSchema);

// Word.remove({}, function(err) {
//    console.log('Cleared words');
// });
//
// Word.insertMany([
//   {english: 'banana', persian: 'موز', phonetic: 'moz', tags: ['noun', 'food', 'fruit']},
//   {english: 'apple', persian: 'سیب', phonetic: 'sib', tags: ['noun', 'food', 'fruit']},
//   {english: 'pear', persian: 'گلابی', phonetic: 'golaabi', tags: ['noun', 'food', 'fruit']},
//   {english: 'fig', persian: 'انجیر', phonetic: 'anjir', tags: ['noun', 'food', 'fruit']},
//   {english: 'soft drink', persian: 'نوشابه', phonetic: 'nooshaabe', tags: ['noun', 'food', 'drink']}
// ]).then(function(words) {
//   console.log('bulk insert');
// })
// .catch(function(err) {
//   console.error(err);
// });

var api = express.Router();

api.use(bodyParser.json());

api.get('/words', function(req, res) {
  Word.find({}, function(err, words) {

    if(err) {
      return res.status(500).json({ error: err });
    }
    return res.json(words);
  });
});

api.get('/words/:word_id', function(req, res) {

  Word.findById(req.params.word_id, function (err, word) {
    if(err) {
      return res.status(500).json({ error: err });
    }
    return res.json(word);
  });

});

api.post('/words', function(req, res) {

  if(Array.isArray(req.body)) {

    Word.insertMany(req.body)
      .then(function(words) {
        return res.status(201).json(words);
      })
      .catch(function(err) {
        return res.status(500).json({ error: err });
      });

  } else {

    var word = new Word(req.body);

    word.save()
      .then(function(word) {
        return res.status(201).json(word);
      })
      .catch(function(err) {
        return res.status(500).json({ error: err });
      });
  }

});

api.put('/words/:word_id', function(req, res) {

  Word.findByIdAndUpdate(req.params.word_id, req.body.word, {new: true}, function(err, word) {
    if(err) {
      return res.status(500).json({ error: err });
    }

    if(word) {
      return res.json(word);
    } else {
      res.status(404).json({message: 'resource not found'});
    }

  });
});

api.delete('/words/:word_id', function(req, res) {

  Word.findByIdAndRemove(req.params.word_id, function(err, word){
    if(err) {
      return res.status(500).json({ error: err });
    }
    return res.json(word);
  });
});


api.all('*', function(req, res) {
  res.status(404).json({message: 'path not found'});
});

module.exports = api;
