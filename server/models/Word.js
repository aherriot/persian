const mongoose = require('mongoose')
const Score = require('./Score')
const Suggestion = require('./Suggestion')

const Schema = mongoose.Schema

const wordSchema = new Schema({
  english: { type: String, required: true },
  persian: { type: String, required: true },
  phonetic: { type: String, required: true },
  tags: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

wordSchema.pre('remove', function(next) {
  Score.remove({ wordId: this._id }).exec()
  Suggestion.remove({ wordId: this._id }).exec()
  next()
})

module.exports = mongoose.model('Word', wordSchema)
