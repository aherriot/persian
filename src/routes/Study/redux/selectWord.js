export default function selectWord(state, action) {
  // If we haven't loaded the scores, don't do anything
  if (action.payload.scores.fetchStatus !== 'SUCCESS') {
    return state
  }

  if (state.options.algorithm === 'SPACED_REPETITION') {
    return spacedRepetition(state, action)
  } else if (state.options.algorithm === 'LEAST_RECENT') {
    return leastRecent(state, action)
  } else if (state.options.algorithm === 'RANDOM') {
    return random(state, action)
  }
  return state
}

// SPACED REPETITION
// The core of the spaced repetition algorithm works
// by assigning words into score buckets numbered 0 through 7
// If the word is answered correctly, the word is moved up one bucket.
// If the word is answered incorrectly, the word is reset back to bucket 0.
// The timestamp of when it was last tested is also stored.

// Words that are in the 0th bucket are eligible to be selected immediately,
// while words in other buckets are selected only after a set amount of time
// since the last time it was chosen. For example, one hour for bucket 1,
// one day for bucket 2, two days for bucket 3 etc...
// In other words, the better we know a word, the less often we test it

// In addition to this, we do not want to overwhelm the user
// with too many words that have never been tested.
// We assign these words as bucket -1 to indicate they are new and untested.
// Only if there are less than five words in bucket 0, do we then start to
// introduce new, untested words, to prevent the user from being overwhelmed.

// Also, if all words in the category have been tested correctly and the
// time has not passed for them to be retested, a message will be displayed
// prompting them to try a different category and if they still continue,
// words will be chosen at random, even if it is too early.

// TODO: These calculation don't need to be done every time a word is selected
// so in the future, we can cache the list of candidate words,
// when words are answered correctly, we remove it from the list,
// when words are answered incorrectly, we keep it in the list
// Then every 10 minutes or so, we can recalculate if other words
// are now ready to be tested and can be included in the candidateWords

function spacedRepetition(state, action) {
  const { seed, words, scores, currentTime } = action.payload

  // if the alternateSides option is true,
  // we swap the question and answer side
  // each time we select a new word.
  let questionSide = state.options.questionSide
  let answerSide = state.options.answerSide
  if (state.options.alternateSides) {
    questionSide = state.options.answerSide
    answerSide = state.options.questionSide
  }

  const untestedWords = []
  const candidateWords = []
  let wordList
  // If a specify tag category has been choose
  // only choose words from that category
  if (state.options.tagFilter) {
    // When the words are first fetched from the server
    // we store the words in a hashmap by category
    // to make this filtering more efficient.
    // This is in addition to the hashmap 'byId'.
    wordList = words.byTag[state.options.tagFilter] || []
  } else {
    // otherwise, we choose from the pool of all words
    wordList = Object.keys(words.byId)
  }

  // used to track wether we should introduce new words
  // or focus on the incorrectly answer words.
  let wordsWithZeroScoreCount = 0

  // Iterate over all the potential words
  // to remove the ones that are not ready to be tested
  for (let i = 0; i < wordList.length; i++) {
    // Don't use a word, if it was the previously selected word
    if (wordList[i] === state.selectedWordId) {
      continue
    }

    const word = words.byId[wordList[i]]

    // Find a score bucket assigned to word
    const scoreForWord = scores.byWordId[word._id]

    // score of -1 indicates that we have not tested this word yet
    let score = -1
    let lastedQuizzedDate
    // if this user has a score object associated with this word
    // meaning that they have previously encountered this word.
    if (scoreForWord) {
      // if they are quizzing from english, because we separately track
      // scores for english->persian and persian->english.
      if (questionSide === 'english') {
        // Check if this key exists
        if (scoreForWord.fromEnglish) {
          score = scoreForWord.fromEnglish.score
          lastedQuizzedDate = new Date(scoreForWord.fromEnglish.quizzedAt)
        } else if (scoreForWord.fromPersian) {
          // Even if the word does not have a score for english->persian
          // if it has a score in the other direction, we give it a score
          // of 0, because this word has been seen by this user before.
          // so we do not consider it an untested word
          score = 0
        }
        // quizzing from persian
      } else {
        // Check if this key exists
        if (scoreForWord.fromPersian) {
          score = scoreForWord.fromPersian.score
          lastedQuizzedDate = new Date(scoreForWord.fromPersian.quizzedAt)
        } else if (scoreForWord.fromEnglish) {
          // Even if the word does not have a score for persian->english
          // if it has a score in the other direction, we give it a score
          // of 0, because this word has been seen by this user before.
          // so we do not consider it an untested word
          score = 0
        }
      }
    }

    // We include the word as a candidate to test based on the score bucket
    // and the time since last quizzed
    let timeSinceQuizzed = currentTime - lastedQuizzedDate

    if (score === -1) {
      // this word has never been seen by this user
      untestedWords.push(word._id)
    } else if (score === 0) {
      // This word was most recently answered incorrectly
      candidateWords.push(word._id)
      wordsWithZeroScoreCount++
    } else if (score === 1) {
      // if it has been at least 1 hour
      // 60 * 60 * 1000
      if (timeSinceQuizzed > 3600000) {
        candidateWords.push(word._id)
      }
    } else if (score === 2) {
      // if it has been at least 1 day
      // 24 * 60 * 60 * 1000
      if (timeSinceQuizzed > 86400000) {
        candidateWords.push(word._id)
      }
    } else if (score === 3) {
      // if it has been at least 3 days
      // 3 * 24 * 60 * 60 * 1000
      if (timeSinceQuizzed > 259200000) {
        candidateWords.push(word._id)
      }
    } else if (score === 4) {
      // if it has been at least 10 days
      // 10 * 24 * 60 * 60 * 1000
      if (timeSinceQuizzed > 864000000) {
        candidateWords.push(word._id)
      }
    } else if (score === 5) {
      // if it has been at least 1 month
      // 30 * 24 * 60 * 60 * 1000
      if (timeSinceQuizzed > 2592000000) {
        candidateWords.push(word._id)
      }
    } else if (score === 6) {
      // if it has been at least 4 months
      // 4 * 30 * 24 * 60 * 60 * 1000
      if (timeSinceQuizzed > 10368000000) {
        candidateWords.push(word._id)
      }
    } else if (score === 6) {
      // if it has been at least a year
      // 12 * 30 * 24 * 60 * 60 * 1000
      if (timeSinceQuizzed > 31104000000) {
        candidateWords.push(word._id)
      }
    }
  }

  // If we have less than five words with a score of 0
  // it is time to start introducing new words to the user
  // This is done to not overwhelm the user with too many
  // new words while they still are incorrectly answering
  for (let i = 5; i > wordsWithZeroScoreCount; i--) {
    if (untestedWords.length > 0) {
      // we pseudorandomly choose an untested word to add to candidate choices
      // using the deterministic randomFromSeed function (so that testing is deterministic)
      const randIndex = Math.floor(untestedWords.length * randomFromSeed(seed))
      const word = untestedWords.splice(randIndex, 1)
      candidateWords.push(word)
    } else {
      // no more untested words to add.
      break
    }
  }

  let selectedWordId
  let status = null

  if (candidateWords.length > 0) {
    // finally we pick a word from the candidates, if we have anything
    selectedWordId = candidateWords[Math.floor(seed * candidateWords.length)]
  } else {
    // we have reach a few special states
    if (wordList.length === 0) {
      // no words at all exist to test
      status = 'NO_WORDS'
      selectedWordId = null
    } else {
      if (state.options.tagFilter) {
        // if only this category is finished, suggestion that they change category
        status = 'CATEGORY_FINISHED'
      } else {
        // all words in the system are finished testing for now
        status = 'WORDS_FINISHED'
      }
      selectedWordId = wordList[Math.floor(seed * wordList.length)]
    }
  }

  return {
    ...state,
    isEvaluating: false,
    selectedWordId: selectedWordId,
    status: status,
    wordCount: candidateWords.length + untestedWords.length,
    options: { ...state.options, questionSide, answerSide }
  }
}

// LEAST RECENT
function leastRecent(state, action) {
  const { seed, words, scores, currentTime } = action.payload

  // if the alternateSides option is true,
  // we swap the question and answer side
  // each time we select a new word.
  let questionSide = state.options.questionSide
  let answerSide = state.options.answerSide
  if (state.options.alternateSides) {
    questionSide = state.options.answerSide
    answerSide = state.options.questionSide
  }

  // track which word is the oldest
  let oldestTime = currentTime
  let selectedWordId

  const untestedWords = []
  let wordList

  // If a specify tag category has been choose
  // only choose words from that category
  if (state.options.tagFilter) {
    // When the words are first fetched from the server
    // we store the words in a hashmap by category
    // to make this filtering more efficient.
    // This is in addition to the hashmap 'byId'.
    wordList = words.byTag[state.options.tagFilter] || []
  } else {
    // otherwise, we choose from the pool of all words
    wordList = Object.keys(words.byId)
  }

  for (let i = 0; i < wordList.length; i++) {
    const word = words.byId[wordList[i]]

    // Find a score bucket assigned to word
    const scoreForWord = scores.byWordId[word._id]

    let lastQuizzedDate
    // if this user has a score object associated with this word
    // meaning that they have previously encountered this word.
    if (scoreForWord) {
      // if they are quizzing from english, because we separately track
      // scores for english->persian and persian->english.
      if (questionSide === 'english') {
        // Check if this key exists
        if (scoreForWord.fromEnglish) {
          lastQuizzedDate = new Date(scoreForWord.fromEnglish.quizzedAt)
        }
        // quizzing from persian
      } else {
        // Check if this key exists
        if (scoreForWord.fromPersian) {
          lastQuizzedDate = new Date(scoreForWord.fromPersian.quizzedAt)
        }
      }
    }

    // if it doesn't have a lastQuizzedDate,
    // this word hasn't been tested yet
    if (!lastQuizzedDate) {
      untestedWords.push(word._id)

      // otherwise, see if it is the oldest word
    } else if (lastQuizzedDate < oldestTime) {
      oldestTime = lastQuizzedDate
      selectedWordId = word._id
    }
  }

  // after we have looked at all the words,
  // if any are untested, select one of those at random
  // otherwise, we will just use the oldest one found through
  // iterating over all the words.
  if (untestedWords.length > 0) {
    const randIndex = Math.floor(untestedWords.length * seed)
    selectedWordId = untestedWords[randIndex]
  }

  return {
    ...state,
    isEvaluating: false,
    selectedWordId: selectedWordId,
    wordCount: wordList.length,
    options: { ...state.options, questionSide, answerSide }
  }
}

// RANDOM
function random(state, action) {
  const { words } = action.payload

  // if the alternateSides option is true,
  // we swap the question and answer side
  // each time we select a new word.
  let questionSide = state.options.questionSide
  let answerSide = state.options.answerSide
  if (state.options.alternateSides) {
    questionSide = state.options.answerSide
    answerSide = state.options.questionSide
  }

  let wordList
  // If a specify tag category has been choose
  // only choose words from that category
  if (state.options.tagFilter) {
    // When the words are first fetched from the server
    // we store the words in a hashmap by category
    // to make this filtering more efficient.
    // This is in addition to the hashmap 'byId'.
    wordList = words.byTag[state.options.tagFilter] || []
  } else {
    // otherwise, we choose from the pool of all words
    wordList = Object.keys(words.byId)
  }

  // select a word at random from the choices
  const wordId = wordList[Math.floor(action.payload.seed * wordList.length)]

  return {
    ...state,
    isEvaluating: false,
    selectedWordId: wordId,
    wordCount: wordList.length,
    options: { ...state.options, questionSide, answerSide }
  }
}

// This isn't really random, but good enough for our purpose
// of deriving a random number from another random number deterministically
// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
function randomFromSeed(seed) {
  return Number(
    '0.' +
      Math.sin(seed)
        .toString()
        .substr(6)
  )
}
