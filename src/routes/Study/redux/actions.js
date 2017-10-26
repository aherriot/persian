import { updateScore } from 'store/scores/actions'

export function selectWord() {
  return function(dispatch, getState) {
    let state = getState()
    dispatch({
      type: 'study/SELECT_WORD',
      payload: {
        seed: Math.random(),
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

export function markCorrect(wordId, direction, score) {
  return function(dispatch, getState) {
    dispatch(updateScore(wordId, direction, score))

    dispatch({
      type: 'study/MARK_CORRECT'
    })
  }
}

export function markWrong(wordId, direction) {
  return function(dispatch, getState) {
    dispatch(updateScore(wordId, direction, 0))
    return {
      type: 'study/MARK_WRONG'
    }
  }
}

export function undoMarkWrong() {
  return {
    type: 'study/UNDO_MARK_WRONG'
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
