var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scoreSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  wordId: {type: Schema.Types.ObjectId, ref: 'Word'},

  scores: {type: [Number], default: [0,0,0,0,0,0]},
  quizzedAt: {type: Date, default: null},

  // correctCount: {type: Number, default: 0},
  // wrongCount: {type: Number, default: 0},)
})

scoreSchema.index({userId: 1, wordId: 1}, {unique: true});

module.exports = mongoose.model('Score', scoreSchema);

// db.users.find().forEach(user => {
//   if(user.username === 'aherriot') {
//     db.words.find().forEach(word => {
//       if(word.quizzedAt) {
//         print(word.english, 'adding')
//         db.scores.insert({
//           userId: user._id,
//           wordId: word._id,
//           quizzedAt: word.quizzedAt,
//           scores: word.scores,
//           __v: 0
//         });
//       } else {
//         print(word.english, 'skipping')
//       }
//     });
//   }
// });
