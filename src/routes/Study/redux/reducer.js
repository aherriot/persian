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
    return {
      ...state,
      isEvaluating: true,
      wasCorrect: false,
      previousScore: action.payload.previousScore
    }
  },
  // 'study/UNDO_MARK_WRONG': function(state, action) {
  //   return { ...state, wasCorrect: true }
  // },
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
    localStorage.setItem('studyOptions', JSON.stringify(action.payload.options))
    return { ...state, showEditWord: false, options: action.payload.options }
  },
  'study/SET_TAG_FILTER': function(state, action) {
    const newOptions = { ...state.options, tagFilter: action.payload.tagFilter }
    localStorage.setItem('studyOptions', JSON.stringify(newOptions))
    return {
      ...state,
      options: newOptions
    }
  }
}

// retrive options from local storage
let studyOptions = JSON.parse(localStorage.getItem('studyOptions'))
if (!studyOptions) {
  studyOptions = {
    questionSide: 'persian', // question side
    answerSide: 'english', // answer side
    tagFilter: '', // only quiz words that have this tag.
    evaluation: 'MULTIPLE', // do they have to type response,
    algorithm: 'SPACED_REPETITION' // how the next word is selected
  }
}

const defaultState = {
  showOptions: false, // showing options modal
  showEditWord: false, // show edit word modal

  isEvaluating: false, //ie: quizzing,
  wasCorrect: false, // was the question answered correctly?

  // Extra message that the selection algorithm to indicate it
  // has no more words to test for this category
  // We will use this status to indicate other things in the future
  status: null,

  selectedWordId: null,

  // previousScore is remember if word graded as wrong,
  // so the user can undo it and mark it as correct.
  previousScore: 0,

  options: studyOptions
}

export default function(state = defaultState, action) {
  const actionHandler = actionHandlers[action.type]
  if (actionHandler) {
    return actionHandler(state, action)
  } else {
    return state
  }
}
