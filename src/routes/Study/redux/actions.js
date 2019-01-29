import { updateScore } from 'store/scores/actions'

export function selectWord() {
  return function(dispatch, getState) {
    let state = getState()
    dispatch({
      type: 'study/SELECT_WORD',
      payload: {
        seed: Math.random(),
        currentTime: Date.now(),
        words: state.data.words,
        scores: state.data.scores
      }
    })
  }
}

export function revealAnswer() {
  return {
    type: 'study/OPEN_OPTIONS_MODAL'
  }
}

export function markCorrect(wordId, direction, newScore) {
  return function(dispatch, getState) {
    dispatch(updateScore(wordId, direction, Math.min(newScore, 7)))

    dispatch({
      type: 'study/MARK_CORRECT'
    })
  }
}

export function markWrong(wordId, direction) {
  return function(dispatch, getState) {
    // we also remember the previous score,
    // so that we can support "undo mark wrong" functionality
    const scoreForWord = getState().data.scores.byWordId[wordId]
    let previousScore = 0
    if (scoreForWord && scoreForWord[direction]) {
      previousScore = scoreForWord[direction].score
    }

    dispatch(updateScore(wordId, direction, 0))
    dispatch({
      type: 'study/MARK_WRONG',
      payload: {
        previousScore: previousScore
      }
    })
  }
}

export function undoMarkWrong() {
  return function(dispatch, getState) {
    // extract the information we need to undo
    // mark wrong from the quiz state.
    const {
      selectedWordId,
      options: { questionSide },
      previousScore
    } = getState().routes.study

    // determine the quest direction from the questionSide of the card
    const direction = questionSide === 'english' ? 'fromEnglish' : 'fromPersian'

    dispatch({
      type: 'study/UNDO_MARK_WRONG'
    })
    dispatch(markCorrect(selectedWordId, direction, previousScore + 1))
  }
}

export function openOptionsModal() {
  return {
    type: 'study/OPEN_OPTIONS_MODAL'
  }
}

export function closeOptionsModal() {
  return {
    type: 'study/CLOSE_OPTIONS_MODAL'
  }
}

export function openEditWordModal() {
  return {
    type: 'study/OPEN_EDIT_WORD_MODAL'
  }
}

export function closeEditWordModal() {
  return {
    type: 'study/CLOSE_EDIT_WORD_MODAL'
  }
}

export function setOptions(options) {
  return {
    type: 'study/SET_OPTIONS',
    payload: {
      options: options
    }
  }
}

export function setTagFilter(tagFilter = '') {
  return {
    type: 'study/SET_TAG_FILTER',
    payload: {
      tagFilter: tagFilter
    }
  }
}
