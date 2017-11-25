const jwt = require('jsonwebtoken')
const config = require('../config')
const respondWithError = require('../utils/respondWithError')

// validate JWT and extract data from it
function auth(req, res, next) {
  let token = req.headers['authorization']
  if (token) {
    token = token.replace('Bearer ', '')

    // verifies secret and checks exp
    jwt.verify(token, config.JWT_SECRET, function(err, decoded) {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return respondWithError(res, 'TokenExpiredError')
        } else {
          return respondWithError(res, 'JsonWebTokenError')
        }
      }

      req.user = {
        _id: decoded._id,
        username: decoded.username,
        role: decoded.role
      }

      next()
    })
  } else {
    return respondWithError(res, 'missingAuthToken')
  }
}

module.exports = auth
