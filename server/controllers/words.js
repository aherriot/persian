var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Word = require('../models/Word');
var auth = require('../middlewares/auth');


router.get('/', function(req, res) {
  Word.find({}, function(err, words) {

    if(err) {
      return res.status(500).json({ error: err });
    }
    return res.json(words);
  });
});

router.get('/:word_id', function(req, res) {

  Word.findById(req.params.word_id, function (err, word) {
    if(err) {
      return res.status(500).json({ error: err });
    }
    return res.json(word);
  });

});

router.post('/', auth, function(req, res) {

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

router.put('/:word_id/score', auth, function(req, res) {

  if(!Number.isInteger(req.body.index) || !Number.isInteger(req.body.score)) {
    return res.status(400).json({code: 'missingValues', message: 'Required index and score to be integers'});
  } else if(req.body.index < 0 || req.body.index > 5) {
    return res.status(400).json({error: ''});
  } else if(req.body.score < 0 || req.body.score > 5) {
    return res.status(400).json({error: ''});
  }

  Word.findById(req.params.word_id, function(err, word) {
    if(err) {
      return res.status(500).json({ error: err });
    }

    if(word) {

      word.scores.splice(req.body.index, 1, req.body.score)
      word.quizzedAt = Date.now();

      word.save(function (err) {
        if(err) {
            return res.status(500).json({ error: err });
        }

        return res.json(word);

      });

    } else {
      res.status(404).json({code: 'notFound', message: 'resource not found'});
    }
  });
});

router.put('/:word_id', auth, function(req, res) {

  var editedWord = {
    updatedAt: Date.now()
  };

  if(req.body.word.english) {
    editedWord.english = req.body.word.english;
  }

  if(req.body.word.persian) {
    editedWord.persian = req.body.word.persian;
  }

  if(req.body.word.phonetic) {
    editedWord.phonetic = req.body.word.phonetic;
  }

  if(req.body.word.tags) {
    editedWord.tags = req.body.word.tags;
  }

  if(req.body.word.scores) {
    editedWord.scores = req.body.word.scores;
  }

  Word.findByIdAndUpdate(req.params.word_id, editedWord, {new: true}, function(err, word) {
    if(err) {
      return res.status(500).json({ error: err });
    }

    if(word) {
      return res.json(word);
    } else {
      res.status(404).json({code: 'notFound', message: 'resource not found'});
    }

  });
});

router.delete('/:word_id', auth, function(req, res) {

  Word.findByIdAndRemove(req.params.word_id, function(err, word){
    if(err) {
      return res.status(500).json({ error: err });
    }

    if(word) {
      return res.json(word);
    } else {
      res.status(404).json({code: 'notFound', message: 'resource not found'});
    }

  });
});

module.exports = router;
