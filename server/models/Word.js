var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Word', new Schema({
  english:  {type: String, required: true},
  persian: {type: String, required: true},
  phonetic: {type: String, required: true},
  tags: {type: [String], required: true},
  scores: {type: [Number], default: [0,0,0,0,0,0]},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  quizzedAt: {type: Date, default: null},
  // correctCount: {type: Number, default: 0},
  // wrongCount: {type: Number, default: 0},)
}));
