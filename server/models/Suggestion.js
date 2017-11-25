const mongoose = require('mongoose')
const Schema = mongoose.Schema

const suggestionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  wordId: { type: Schema.Types.ObjectId, ref: 'Word' },
  text: { type: String, required: true }
})

// suggestionSchema.index({ userId: 1, wordId: 1 }, { unique: true })

module.exports = mongoose.model('Suggestion', suggestionSchema)
