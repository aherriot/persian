const express = require('express')
const mongoose = require('mongoose')

const Suggestion = require('../models/Suggestion')
const Word = require('../models/Word')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

const respondWithError = require('../utils/respondWithError')

const router = express.Router()

// get all suggestions for user
router.get('/', auth, async function(req, res) {
  let suggestions
  try {
    suggestions = await Suggestion.find({ userId: req.user._id })
  } catch (err) {
    return respondWithError(res, err)
  }

  res.json(suggestions)
})

// get all suggestions
router.get('/all', auth, admin, function(req, res) {
  Suggestion.find({}, 'wordId userId text', function(err, suggestions) {
    if (err) {
      return respondWithError(res, err)
    }

    res.json(suggestions)
  })
})

// delete a suggestion
router.delete('/:suggestionId', auth, admin, async function(req, res) {
  try {
    const suggestion = await Suggestion.findByIdAndRemove(
      req.params.suggestionId
    )
    if (suggestion) {
      suggestion.remove()
      return res.json(suggestion)
    } else {
      return respondWithError(res, 'suggestionNotFoun')
    }
  } catch (err) {
    return respondWithError(res, err)
  }
})

router.post('/', auth, async function(req, res) {
  // if (!req.body.text) {
  //   return respondWithError(res, 'textMissing')
  // }

  const suggestion = new Suggestion({
    userId: req.user._id,
    wordId: req.body.wordId,
    english: req.body.english,
    persian: req.body.persian,
    phonetic: req.body.phonetic,
    tags: req.body.tags
  })

  suggestion
    .save()
    .then(function(suggestion) {
      return res.status(201).json(suggestion)
    })
    .catch(function(err) {
      return respondWithError(res, err)
    })
})

module.exports = router
