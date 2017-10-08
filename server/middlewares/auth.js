const jwt = require('jsonwebtoken')
const config = require('../config')

// validate JWT and extract data from it
function auth(req, res, next) {
  let token = req.headers['authorization']
  if (token) {
    token = token.replace('Bearer ', '')

    // verifies secret and checks exp
    jwt.verify(token, config.JWT_SECRET, function(err, decoded) {
      if (err) {
        return res.status(401).json({ code: err.name, message: err.message })
      }

      req.user = {
        _id: decoded._id,
        username: decoded.username,
        role: decoded.role
      }

      next()
    })
  } else {
    return res.status(401).json({
      code: 'missingAuthToken',
      message: 'No Authorization token provided'
    })
  }
}

module.exports = auth
