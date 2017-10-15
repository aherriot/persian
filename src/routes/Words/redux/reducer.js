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
    return { ...state, selectedWordId: null, editingWord: false }
  },
  'words/EDIT_WORD': (state, action) => {
    return { ...state, editingWord: true }
  },
  'words/CANCEL_EDIT_WORD': (state, action) => {
    return { ...state, editingWord: false }
  }
}

const defaultState = {
  filterModalOpen: false,
  addModalOpen: false,
  selectedWordId: null,
  editingWord: false
}

export default function(state = defaultState, action) {
  const actionHandler = actionHandlers[action.type]
  if (actionHandler) {
    return actionHandler(state, action)
  } else {
    return state
  }
}
