// get the total score for a single word, or return null if there
// is no score for that word

export default function getTotalScore(wordId, scores) {
  let score = null
  const scoreForWord = scores.byWordId[wordId]
  if (scoreForWord) {
    score = 0
    if (scoreForWord.fromEnglish) {
      score += scoreForWord.fromEnglish.score
    }

    if (scoreForWord.fromPersian) {
      score += scoreForWord.fromPersian.score
    }
  }
  return score
}
