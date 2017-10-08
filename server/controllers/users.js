const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const Score = require('../models/Score')
const config = require('../config')

const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

const respondWithError = require('../utils/respondWithError')

const router = express.Router()

router.get('/', auth, admin, async function(req, res) {
  try {
    const users = await User.find(
      {},
      { username: 1, email: 1, role: 1, createdAt: 1 }
    )
    return res.json(users)
  } catch (err) {
    return respondWithError(res, err)
  }
})

router.post('/login', async function(req, res) {
  if (!req.body.password) {
    return respondWithError(res, 'passwordMissing')
  } else if (!req.body.username) {
    return respondWithError(res, 'usernameMissing')
  } else {
    try {
      const user = await User.findOne({ username: req.body.username })
      if (!user) {
        return respondWithError(res, 'invalidAuthentication')
      }

      user.comparePassword(req.body.password, function(err, isMatch) {
        if (err) {
          return respondWithError(res, err)
        }

        if (!isMatch) {
          return respondWithError(res, 'invalidAuthentication')
        }

        const token = jwt.sign(
          { _id: user._id, username: user.username, role: user.role },
          config.JWT_SECRET,
          {
            expiresIn: config.JWT_EXPIRY
          }
        )

        return res.json({ token: token })
      })
    } catch (err) {
      return respondWithError(res, err)
    }
  }
})

router.post('/', async function(req, res) {
  if (!req.body.username) {
    return respondWithError(res, 'usernameMissing')
  } else if (req.body.username.length < 3 || req.body.username.length > 10) {
    return respondWithError(res, 'usernameLength')
  } else if (!req.body.password) {
    return respondWithError(res, 'passwordMissing')
  } else if (req.body.password.length < 6 || req.body.password.length > 30) {
    return respondWithError(res, 'passwordLength')
  } else if (!req.body.email) {
    return respondWithError(res, 'emailMissing')
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(req.body.email)
  ) {
    return respondWithError(res, 'emailInvalid')
  }

  try {
    const existingUser = await User.findOne({
      $or: [
        { username: req.body.username.toLowerCase() },
        { email: req.body.email.toLowerCase() }
      ]
    })

    if (existingUser) {
      if (
        existingUser.username.toLowerCase() === req.body.username.toLowerCase()
      ) {
        return respondWithError(res, 'usernameDuplicate')
      } else {
        return respondWithError(res, 'emailDuplicate')
      }
    }

    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    })

    try {
      await newUser.save()

      const token = jwt.sign(
        { _id: newUser._id, username: newUser.newUsername, role: newUser.role },
        config.JWT_SECRET,
        {
          expiresIn: config.JWT_EXPIRY
        }
      )

      return res.json({ token: token })
    } catch (err) {
      return respondWithError(res, err)
    }

    return res.json({ user: newUser })
  } catch (err) {
    return respondWithError(res, err)
  }
})

router.put('/:id', auth, async function(req, res) {
  if (req.user._id !== req.params.id) {
    return respondWithError(res, 'userWrong')
  }

  let isModified = false
  try {
    const user = await User.findById(req.params.id)

    if (req.body.email) {
      isModified = true
      user.email = req.body.email
    }

    if (isModified) {
      try {
        await user.save()
      } catch (err) {
        return respondWithError(res, err)
      }
    }

    // if (req.body.username) {
    //   user.username = req.body.username
    // }

    res.json({})
  } catch (err) {
    return respondWithError(res, err)
  }
})

// Separate route just to change password. requires current password to be reauthenticated.
router.put('/:id/password', auth, function(req, res) {
  if (req.user._id !== req.params.id) {
    return respondWithError(res, 'userWrong')
  } else if (!req.body.password) {
    return respondWithError(res, 'passwordMissing')
  } else if (!req.body.newPassword) {
    return respondWithError(res, 'newPasswordMissing')
  }

  User.findById(req.params._id, function(err, user) {
    if (err) {
      return respondWithError(res, err)
    }

    if (user) {
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (err) {
          return respondWithError(res, err)
        }

        if (isMatch) {
          user.password = req.body.newPassword

          user.save(function(err, user) {
            if (err) {
              return respondWithError(res, err)
            }

            return res.json({})
          })
        } else {
          return respondWithError(res, 'unauthorized')
        }
      })
    } else {
      return respondWithError(res, 'unauthorized')
    }
  })
})

router.delete('/:id', auth, async function(req, res) {
  if (req.user.role !== 'admin' && req.user._id !== req.params.id) {
    return respondWithError(res, 'userWrong')
  }
  try {
    await Score.remove({ userId: req.params.id })
    await User.findByIdAndRemove(req.params.id)

    res.json({ success: true })
  } catch (err) {
    respondWithError(res, err)
  }
})

router.get('/leaderboard', auth, admin, async function(req, res) {
  try {
    const users = await User.find({})

    let respObj = []
    let refCount = 0
    users.forEach(async function(user) {
      try {
        const scores = await Score.find({ userId: user._id })
        refCount++

        let sum = 0
        let mostRecent = null
        scores.forEach(score => {
          if (!mostRecent || score.quizzedAt > mostRecent) {
            mostRecent = score.quizzedAt
          }

          score.scores.forEach(scoreElem => (sum += scoreElem))
        })

        respObj.push({
          username: user.username,
          quizzedWords: scores.length,
          mostRecent: mostRecent,
          score: sum
        })

        if (refCount === users.length) {
          return res.json(respObj)
        }
      } catch (err) {
        return respondWithError(res, err)
      }
    })
  } catch (err) {
    return respondWithError(res, err)
  }
})

module.exports = router
