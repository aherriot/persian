import selectWord from './selectWord'

const actionHandlers = {
  'study/SELECT_WORD': selectWord,
  'study/REVEAL_ANSWER': function(state, action) {
    return state
  },
  'study/MARK_CORRECT': function(state, action) {
    return { ...state, isEvaluating: true, wasCorrect: true }
  },
  'study/MARK_WRONG': function(state, action) {
    return { ...state, isEvaluating: true, wasCorrect: false }
  },
  'study/UNDO_MARK_WRONG': function(state, action) {
    return { ...state, wasCorrect: true }
  },
  'study/OPEN_OPTIONS_MODAL': function(state, action) {
    return { ...state, showOptions: true }
  },
  'study/CLOSE_OPTIONS_MODAL': function(state, action) {
    return { ...state, showOptions: false }
  },
  'study/OPEN_EDIT_WORD_MODAL': function(state, action) {
    return { ...state, showEditWord: true }
  },
  'study/CLOSE_EDIT_WORD_MODAL': function(state, action) {
    return { ...state, showEditWord: false }
  },
  'study/SET_OPTIONS': function(state, action) {
    return { ...state, showEditWord: false, options: action.payload.options }
  }
}

const defaultState = {
  showOptions: false, // showing options modal
  showEditWord: false, // show edit word modal

  isEvaluating: false, //ie: quizzing,
  wasCorrect: false, // was the question answered correctly?
  selectedWordId: null,

  options: {
    questionSide: 'persian', // question side
    answerSide: 'english', // answer side
    evaluation: 'TYPING', // do they have to type response,
    algorithm: 'SPACED_REPETITION' // how the next word is selected
  }
}

export default function(state = defaultState, action) {
  const actionHandler = actionHandlers[action.type]
  if (actionHandler) {
    return actionHandler(state, action)
  } else {
    return state
  }
}
