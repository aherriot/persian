const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scoreSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  wordId: { type: Schema.Types.ObjectId, ref: 'Word' },
  fromEnglish: {
    score: { type: Number },
    quizzedAt: { type: Date }
  },
  fromPersian: {
    score: { type: Number },
    quizzedAt: { type: Date }
  }
})

scoreSchema.index({ userId: 1, wordId: 1 }, { unique: true })

module.exports = mongoose.model('Score', scoreSchema)
