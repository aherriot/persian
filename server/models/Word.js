const mongoose = require('mongoose')
const Scores = require('./Score')

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
  Scores.remove({ wordId: this._id }).exec()
  next()
})

module.exports = mongoose.model('Word', wordSchema)
