var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Score', new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  wordId: {type: Schema.Types.ObjectId, ref: 'Word'},

  scores: {type: [Number], default: [0,0,0,0,0,0]},
  quizzedAt: {type: Date, default: null},
  
  // correctCount: {type: Number, default: 0},
  // wrongCount: {type: Number, default: 0},)
}));
