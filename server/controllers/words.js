const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Word = require('../models/Word')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

const respondWithError = require('../utils/respondWithError')

function isValidWord(word) {
  // english must be a non-empty string
  if (typeof word.english !== 'string' || word.english.length === 0) {
    return false
  }

  // persian must be a non-empty string
  if (typeof word.persian !== 'string' || word.persian.length === 0) {
    return false
  }

  // phonetic must be a non-empty string
  if (typeof word.phonetic !== 'string' || word.phonetic.length === 0) {
    return false
  }

  // tags must be an array
  if (!Array.isArray(word.tags)) {
    return false
  }

  // tags array must contain only non-empty strings
  if (word.tags.some(tag => typeof tag !== 'string' || tag.length === 0)) {
    return false
  }

  return true
}

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

router.get('/:word_id', async function(req, res) {
  try {
    const word = await Word.findById(
      req.params.word_id,
      '_id createdAt english persian phonetic tags'
    )
    return res.json(word)
  } catch (err) {
    return respondWithError(res, err)
  }
})

router.post('/', auth, admin, function(req, res) {
  if (Array.isArray(req.body)) {
    if (req.body.some(word => !isValidWord(word))) {
      return respondWithError(res, 'wordArrayInvalid')
    }

    Word.insertMany(req.body)
      .then(function(words) {
        return res.status(201).json(words)
      })
      .catch(function(err) {
        respondWithError(res, err)
      })
  } else {
    if (!isValidWord(req.body)) {
      return respondWithError(res, 'wordInvalid')
    }

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

router.put('/:word_id', auth, admin, async function(req, res) {
  var editedWord = {
    updatedAt: Date.now()
  }

  if (req.body.english) {
    editedWord.english = req.body.english
  }

  if (req.body.persian) {
    editedWord.persian = req.body.persian
  }

  if (req.body.phonetic) {
    editedWord.phonetic = req.body.phonetic
  }

  if (req.body.tags) {
    editedWord.tags = req.body.tags
  }

  try {
    const word = await Word.findByIdAndUpdate(req.params.word_id, editedWord, {
      new: true
    })
    if (word) {
      return res.json(word)
    } else {
      return respondWithError(res, 'wordNotFound')
    }
  } catch (err) {
    return respondWithError(res, err)
  }
})

router.delete('/:word_id', auth, admin, async function(req, res) {
  try {
    const word = await Word.findByIdAndRemove(req.params.word_id)

    if (word) {
      return res.json(word)
    } else {
      return respondWithError(res, 'wordNotFoun')
    }
  } catch (err) {
    return respondWithError(res, err)
  }
})

module.exports = router
