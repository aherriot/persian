const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Score = require('./Score')
const Suggestion = require('./Suggestion')
const config = require('../config')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'user' },
  createdAt: { type: Date, default: Date.now }
})

// generate password hash if it has changed
userSchema.pre('save', function(next) {
  const user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  // generate a salt
  bcrypt.genSalt(config.SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err)

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err)

      // override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
})

userSchema.pre('remove', function(next) {
  Score.remove({ userId: this._id }).exec()
  Suggestion.remove({ useurId: this._id }).exec()
  next()
})

// Check if password is valid
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return cb(err)
    }
    cb(null, isMatch)
  })
}

module.exports = mongoose.model('User', userSchema)
