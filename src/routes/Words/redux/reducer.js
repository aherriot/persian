const actionHandlers = {
  'words/OPEN_FILTER_MODAL': (state, action) => {
    return { ...state, filterModalOpen: true }
  },
  'words/CLOSE_FILTER_MODAL': (state, action) => {
    return { ...state, filterModalOpen: false }
  },
  'words/OPEN_ADD_MODAL': (state, action) => {
    return { ...state, addModalOpen: true }
  },
  'words/CLOSE_ADD_MODAL': (state, action) => {
    return { ...state, addModalOpen: false }
  },
  'words/SELECT_WORD': (state, action) => {
    return { ...state, selectedWordId: action.payload.wordId }
  },
  'words/DESELECT_WORD': (state, action) => {
    return {
      ...state,
      selectedWordId: null,
      editingWord: false,
      confirmingDelete: false
    }
  },
  'words/EDIT_WORD': (state, action) => {
    return { ...state, editingWord: true }
  },
  'words/CANCEL_EDIT_WORD': (state, action) => {
    return { ...state, editingWord: false, confirmingDelete: false }
  },
  'words/CONFIRM_DELETE_WORD': (state, action) => {
    return { ...state, confirmingDelete: true }
  },
  'words/DISMISS_DELETE_WORD': (state, action) => {
    return { ...state, confirmingDelete: false }
  },
  'words/SET_SEARCH_TEXT': (state, action) => {
    return { ...state, searchText: action.payload.searchText.toLowerCase() }
  },
  'words/SET_SORT_BY': (state, action) => {
    localStorage.setItem('sortBy', action.payload.sortBy)
    return { ...state, sortBy: action.payload.sortBy }
  },
  'words/DELETE_SUCCESS': (state, action) => {
    return { ...state, selectedWordId: null }
  },
  // We use the fact the user has jumped to the quiz
  // to reset the search text.
  'study/SELECT_WORD': (state, action) => {
    return { ...state, searchText: '' }
  }
}

const defaultState = {
  filterModalOpen: false,
  addModalOpen: false,
  selectedWordId: null,
  editingWord: false,
  confirmingDelete: false,

  searchText: '',
  sortBy: localStorage.getItem('sortBy') || 'english'
}

export default function(state = defaultState, action) {
  const actionHandler = actionHandlers[action.type]
  if (actionHandler) {
    return actionHandler(state, action)
  } else {
    return state
  }
}
