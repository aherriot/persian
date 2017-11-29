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

const usernameRegex = /[a-zA-Z0-9-_.]+/
function isUsernameValid(username) {
  return usernameRegex.test(username)
}

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
      const user = await User.findOne(
        { username: req.body.username },
        '_id username role password'
      )

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

// given a valid token, respond with a new token with the same information
// but updated expiry date.
router.get('/refresh-token', auth, async function(req, res) {
  // We trust the information coming from the request authentication token,
  // because it is signed with the server's secret. See the 'auth' middleware.
  const token = jwt.sign(
    { _id: req.user._id, username: req.user.username, role: req.user.role },
    config.JWT_SECRET,
    {
      expiresIn: config.JWT_EXPIRY
    }
  )
  return res.json({ token: token })
})

router.post('/', async function(req, res) {
  if (!req.body.username) {
    return respondWithError(res, 'usernameMissing')
  } else if (req.body.username.length < 3 || req.body.username.length > 10) {
    return respondWithError(res, 'usernameLength')
  } else if (!isUsernameValid(req.body.username)) {
    return respondWithError(res, 'usernameInvalid')
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

    if (!user) {
      return respondWithError(res, 'userNotFound')
    }

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
router.put('/:id/password', auth, async function(req, res) {
  if (req.user._id !== req.params.id) {
    return respondWithError(res, 'userWrong')
  } else if (!req.body.password) {
    return respondWithError(res, 'passwordMissing')
  } else if (!req.body.newPassword) {
    return respondWithError(res, 'newPasswordMissing')
  }

  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return respondWithError(res, 'userNotFound')
    }

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

          return res.json({ success: true })
        })
      } else {
        return respondWithError(res, 'unauthorized')
      }
    })
  } catch (err) {
    return respondWithError(res, err)
  }
})

router.delete('/:id', auth, async function(req, res) {
  if (req.user.role !== 'admin' && req.user._id !== req.params.id) {
    return respondWithError(res, 'userWrong')
  }
  try {
    const user = await User.findByIdAndRemove(req.params.id)
    if (user) {
      user.remove()
    }

    res.json({ success: true })
  } catch (err) {
    respondWithError(res, err)
  }
})

router.get('/leaderboard', async function(req, res) {
  let users
  try {
    users = await User.find({})
  } catch (err) {
    return respondWithError(res, err)
  }

  let leaderboardArray = []
  let refCount = 0
  users.forEach(async function(user) {
    let scores
    try {
      scores = await Score.find({ userId: user._id })
    } catch (err) {
      return respondWithError(res, err)
    }

    refCount++

    let sum = 0
    let mostRecent = null
    scores.forEach(score => {
      if (score.fromEnglish.score) {
        sum += score.fromEnglish.score
        if (!mostRecent || mostRecent < score.fromEnglish.quizzedAt) {
          mostRecent = score.fromEnglish.quizzedAt
        }
      }

      if (score.fromPersian.score) {
        sum += score.fromPersian.score
        if (!mostRecent || mostRecent < score.fromPersian.quizzedAt) {
          mostRecent = score.fromPersian.quizzedAt
        }
      }
    })

    leaderboardArray.push({
      username: '' + user.username,
      quizzedWords: scores.length,
      mostRecent: mostRecent,
      score: sum
    })

    if (refCount === users.length) {
      return res.json(leaderboardArray)
    }
  })
})

module.exports = router
