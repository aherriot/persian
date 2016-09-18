var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var Word = require('./models/Word');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

mongoose.connect('mongodb://localhost/persian');
// db.words.find().forEach(function(word) {word.quizzedAt = null; db.words.save(word); });

var api = express.Router();

api.use(bodyParser.json());

var secret = 'hard-to-guess-secret-key';

function authentication(req, res, next) {

  var token = req.headers['authorization'];
  if(token) {
    token = token.replace('Bearer ', '');

    // verifies secret and checks exp
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        return res.status(401).json({name: err.name, message: err.message });
      } else {
        req.authenticated = true;
        next();
      }
    });

  } else {
    return res.status(401).json({name: 'missingAuthToken', message: 'No Authorization token provided' });
  }
}

api.post('/login', function(req, res) {

  if(!req.body.password) {
    return res.status(400).json({error: 'Password missing from body'});
  } else if(!req.body.username) {
    return res.status(400).json({error: 'Username missing from body'});
  } else {

    if(req.body.password === 'test') {

      var token = jwt.sign({username: 'aherriot', role: 'user'}, secret, {
        expiresIn: 86400
      });
      return res.json({token: token});


    } else if(req.body.password === 'admin') {

      var token = jwt.sign({username: 'admin', role: 'admin'}, secret, {
        expiresIn: 86400
      });
      return res.json({token: token});
      
    }

  }
  return res.status(401).json({error: 'Authentication failed. Wrong password.'});
});

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

api.post('/words', authentication, function(req, res) {

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

api.put('/words/:word_id/score', authentication, function(req, res) {

  if(!Number.isInteger(req.body.index) || !Number.isInteger(req.body.score)) {
    return res.status(400).json({error: 'Required index and score to be integers'});
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
      res.status(404).json({error: 'resource not found'});
    }
  });
});

api.put('/words/:word_id', authentication, function(req, res) {

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
      res.status(404).json({error: 'resource not found'});
    }

  });
});

api.delete('/words/:word_id', authentication, function(req, res) {

  Word.findByIdAndRemove(req.params.word_id, function(err, word){
    if(err) {
      return res.status(500).json({ error: err });
    }

    if(word) {
      return res.json(word);
    } else {
      res.status(404).json({error: 'resource not found'});
    }

  });
});


api.all('*', function(req, res) {
  res.status(404).json({error: 'path not found'});
});

module.exports = api;
