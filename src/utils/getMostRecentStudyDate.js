// get the total score for a single word, or return null if there
// is no score for that word

export default function getMostRecentStudyDate(wordId, scores) {
  let date = null
  const scoreForWord = scores.byWordId[wordId]
  if (scoreForWord) {
    let fromEnglishDate, fromPersianDate
    if (scoreForWord.fromEnglish) {
      fromEnglishDate = new Date(scoreForWord.fromEnglish.quizzedAt)
    }

    if (scoreForWord.fromPersian) {
      fromPersianDate = new Date(scoreForWord.fromPersian.quizzedAt)
    }

    if (fromEnglishDate && !fromPersianDate) {
      return fromEnglishDate
    } else if (fromPersianDate && !fromEnglishDate) {
      return fromPersianDate
    } else if (fromEnglishDate > fromPersianDate) {
      return fromEnglishDate
    } else {
      return fromPersianDate
    }
  }
  return date
}
