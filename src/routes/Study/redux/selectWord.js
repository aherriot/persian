export default function selectWord(state, action) {
  if (state.options.algorithm === 'SPACED_REPETITION') {
    // action.payload.seed
    // generate candidate words
    // pick randomWord
    const wordIds = Object.keys(action.payload.words.byId)

    const wordId = wordIds[Math.floor(Math.random() * wordIds.length)]

    return { ...state, isEvaluating: false, selectedWordId: wordId }
  } else if (state.options.algorithm === 'LEAST_RECENT') {
    // iterate over all words, find one without score, or the oldest tested one
    const wordIds = Object.keys(action.payload.words.byId)

    const wordId = wordIds[Math.floor(Math.random() * wordIds.length)]
    return { ...state, isEvaluating: false, selectedWordId: wordId }
  } else if (state.options.algorithm === 'RANDOM') {
    const wordIds = Object.keys(action.payload.words.byId)
    const wordId = wordIds[Math.floor(Math.random() * wordIds.length)]
    return { ...state, isEvaluating: false, selectedWordId: wordId }
  }
  return state
}

// quizing word (type response)
// show correct screen

// quizzing word (type response)
// show wrong, type correct answer or (undo mark wrong)  or (skip)

// quzzing word (button to reveal answer)
// self evaluate (right and wrong button)

// quizzing
// evaluate

// editWord
// quizOptions

function matchesFilter() {
  return true
}

export function spacedRepetition(words, scores, study) {
  const now = new Date()
  const wordsToTest = []

  for (let wordId in words) {
    const word = words.byId[wordId]
    if (!matchesFilter(word)) {
      continue
    }

    const scoreForWord = scores.byWordId[wordId]

    let score = 0
    let date
    // if this user has a score object associated with this word
    // meaning that they have previously encountered this word.
    if (scoreForWord) {
      // if they are quizzing from english
      if (study.from === 'english') {
        // may not exist
        if (scoreForWord.fromEnglish) {
          score = scoreForWord.fromEnglish.score
          date = new Date(scoreForWord.fromEnglish.data)
        }
        // quizzing from persian
      } else {
        // may not exist
        if (scoreForWord.fromPersian) {
          score = scoreForWord.fromPersian.score
          date = new Date(scoreForWord.fromPersian.data)
        }
      }
    }

    // spaced repetition
    // based on the score and the time since last quizzed
    let timeSinceQuizzed = now - date
    if (score === 0) {
      wordsToTest.push(wordId)
    } else if (score === 1) {
      // if it has been at least 1 hour
      if (timeSinceQuizzed > 3600000) {
        // 60 * 60 * 1000
        wordsToTest.push(wordId)
      }
    } else if (score === 2) {
      // if it has been at least 1 day
      if (timeSinceQuizzed > 86400000) {
        // 24 * 60 * 60 * 1000
        wordsToTest.push(wordId)
      }
    } else if (score === 3) {
      // if it has been at least 2 days
      if (timeSinceQuizzed > 172800000) {
        // 2 * 24 * 60 * 60 * 1000
        wordsToTest.push(wordId)
      }
    } else if (score === 4) {
      // if it has been at least 1 week
      if (timeSinceQuizzed > 604800000) {
        // 7 * 24 * 60 * 60 * 1000
        wordsToTest.push(wordId)
      }
    } else if (score === 5) {
      // if it has been at least 1 month
      if (timeSinceQuizzed > 2592000000) {
        // 30 * 24 * 60 * 60 * 1000
        wordsToTest.push(wordId)
      }
    }
  }
}

export function randElem(arr, randNumber = Math.random()) {
  const randIndex = Math.floor(randNumber * arr.length)
  return arr[randIndex]
}
