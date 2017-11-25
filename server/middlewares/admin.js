// protect route so only admins can use it

const respondWithError = require('../utils/respondWithError')

function admin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    return respondWithError(res, 'adminOnly')
  }
}

module.exports = admin
