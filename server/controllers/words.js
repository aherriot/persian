var express = require('express')
var mongoose = require('mongoose')
var router = express.Router()

var Word = require('../models/Word')
var auth = require('../middlewares/auth')

const respondWithError = require('../utils/respondWithError')

router.get('/', async function(req, res) {
  try {
    const words = await Word.find(
      {},
      '_id createdAt english persian phonetic tags'
    )
    return res.json(words)
  } catch (err) {
    respondWithError(res, err)
  }
})

router.get('/:word_id', function(req, res) {
  Word.findById(
    req.params.word_id,
    '_id createdAt english persian phonetic tags',
    function(err, word) {
      if (err) {
        respondWithError(res, err)
      }
      return res.json(word)
    }
  )
})

router.post('/', auth, function(req, res) {
  if (Array.isArray(req.body)) {
    Word.insertMany(req.body)
      .then(function(words) {
        return res.status(201).json(words)
      })
      .catch(function(err) {
        respondWithError(res, err)
      })
  } else {
    var word = new Word(req.body)

    word
      .save()
      .then(function(word) {
        return res.status(201).json(word)
      })
      .catch(function(err) {
        respondWithError(res, err)
      })
  }
})

router.put('/:word_id', auth, function(req, res) {
  var editedWord = {
    updatedAt: Date.now()
  }

  if (req.body.word.english) {
    editedWord.english = req.body.word.english
  }

  if (req.body.word.persian) {
    editedWord.persian = req.body.word.persian
  }

  if (req.body.word.phonetic) {
    editedWord.phonetic = req.body.word.phonetic
  }

  if (req.body.word.tags) {
    editedWord.tags = req.body.word.tags
  }

  // if(req.body.word.scores) {
  //   editedWord.scores = req.body.word.scores;
  // }

  Word.findByIdAndUpdate(
    req.params.word_id,
    editedWord,
    { new: true },
    function(err, word) {
      if (err) {
        respondWithError(res, err)
      }

      if (word) {
        return res.json(word)
      } else {
        res
          .status(404)
          .json({ code: 'notFound', message: 'resource not found' })
      }
    }
  )
})

router.delete('/:word_id', auth, function(req, res) {
  Word.findByIdAndRemove(req.params.word_id, function(err, word) {
    if (err) {
      respondWithError(res, err)
    }

    if (word) {
      return res.json(word)
    } else {
      res.status(404).json({ code: 'notFound', message: 'resource not found' })
    }
  })
})

module.exports = router
