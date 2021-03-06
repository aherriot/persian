const express = require('express')
const mongoose = require('mongoose')

const Score = require('../models/Score')
const Word = require('../models/Word')
const auth = require('../middlewares/auth')

const respondWithError = require('../utils/respondWithError')

const router = express.Router()

router.get('/', auth, function(req, res) {
  Score.find(
    { userId: req.user._id },
    'wordId userId fromPersian fromEnglish',
    function(err, scores) {
      if (err) {
        return respondWithError(res, err)
      }

      res.json(scores)
    }
  )
})

router.put('/:wordId', auth, async function(req, res) {
  if (
    req.body.direction !== 'fromEnglish' &&
    req.body.direction !== 'fromPersian' &&
    req.body.direction !== 'both'
  ) {
    return respondWithError(res, 'directionInvalid')
  } else if (
    !Number.isInteger(req.body.score) ||
    req.body.score < 0 ||
    req.body.score > 7
  ) {
    return respondWithError(res, 'scoreInvalid')
  }

  let score
  try {
    score = await Score.findOne({
      userId: req.user._id,
      wordId: req.params.wordId
    })
  } catch (err) {
    if (err.name === 'CastError') {
      return respondWithError(res, 'wordIdInvalid')
    }
    return respondWithError(res, err)
  }

  if (score) {
    if (req.body.direction === 'both') {
      score.fromEnglish = {
        score: req.body.score,
        quizzedAt: Date.now()
      }
      score.fromPersian = {
        score: req.body.score,
        quizzedAt: Date.now()
      }
    } else {
      const direction = score[req.body.direction]
      if (direction) {
        direction.score = req.body.score
        direction.quizzedAt = Date.now()
      } else {
        score[req.body.direction] = {
          score: req.body.score,
          quizzedAt: Date.now()
        }
      }
    }

    try {
      await score.save()
      return res.json(score)
    } catch (err) {
      return respondWithError(res, err)
    }
  } else {
    // score does not yet exist for this word

    let word
    try {
      //see if the word even exists before trying to create a score
      word = await Word.findById(req.params.wordId)
    } catch (err) {
      return respondWithError(res, err)
    }

    if (!word) {
      return respondWithError(res, 'wordNotFound')
    }

    let newScore
    if (req.body.direction === 'both') {
      newScore = new Score({
        fromPersian: {
          score: req.body.score,
          quizzedAt: Date.now()
        },
        fromEnglish: {
          score: req.body.score,
          quizzedAt: Date.now()
        },
        userId: req.user._id,
        wordId: req.params.wordId
      })
    } else {
      newScore = new Score({
        [req.body.direction]: {
          score: req.body.score,
          quizzedAt: Date.now()
        },
        userId: req.user._id,
        wordId: req.params.wordId
      })
    }

    try {
      await newScore.save()
      return res.json(newScore)
    } catch (err) {
      return respondWithError(res, err)
    }
  }
})

module.exports = router
