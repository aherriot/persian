const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model(
  'Word',
  new Schema({
    english: { type: String, required: true },
    persian: { type: String, required: true },
    phonetic: { type: String, required: true },
    tags: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  })
)
