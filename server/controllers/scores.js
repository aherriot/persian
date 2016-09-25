var express = require('express');
var mongoose = require('mongoose');

var Score = require('../models/Score');
var Word = require('../models/Word');
var auth = require('../middlewares/auth');

var router = express.Router();


router.get('/', auth, function(req, res) {
  Score.find({userId: req.user._id}, function(err, scores) {
    if(err) {
      return res.status(500).json({ error: err });
    }

    res.json(scores);
  })
})


router.put('/:wordId', auth, function(req, res) {

  if(!Number.isInteger(req.body.index) || !Number.isInteger(req.body.score)) {
    return res.status(400).json({code: 'missingValues', message: 'Required index and score to be integers'});
  } else if(req.body.index < 0 || req.body.index > 5) {
    return res.status(400).json({code: 'invalidIndex', message: 'Index must be between 0 and 5'});
  } else if(req.body.score < 0 || req.body.score > 5) {
    return res.status(400).json({code: 'invalidScore', message: 'Score must be between 0 and 5'});
  }

  Score.findOne({userId: req.user._id, wordId: req.params.wordId}, function(err, score) {
    if(err) {
      return res.status(500).json({ error: err });
    }
    if(score) {

      score.scores.splice(req.body.index, 1, req.body.score)
      score.quizzedAt = Date.now();

      score.save(function(err, score) {
        if(err) {
          return res.status(500).json({error: err});
        }
        res.json(score)
      })

    } else {
      //ok, see if the word even exists before trying to create a score
      Word.findById(req.params.wordId, function(err, word) {
        if(err) {
          return res.status(500).json({ error: err });
        }

        if(word) {

          let scores = [0, 0, 0, 0, 0 ,0]
          scores[req.body.index] = req.body.score;
          score.quizzedAt = Date.now();

          var newScore = new Score({
            scores: scores,
            userId: req.user._id,
            wordId: req.params.wordId
          });

          newScore.save(function(err, score) {
            if(err) {
              return res.status(500).json({error: err});
            }
            res.json(score)
          })
        } else {
          return res.status(404).json({ code: 'wordNotFound', message: 'Word does not exist with this id.' });
        }
      })
    }
  })
});

module.exports = router;
