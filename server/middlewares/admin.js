// protect router so only admins can use it
function admin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    return res
      .status(401)
      .json({ code: 'adminOnly', message: 'Only admin users can list users' })
  }
}

module.exports = admin
