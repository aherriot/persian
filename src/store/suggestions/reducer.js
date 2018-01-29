const actionHandlers = {
  'suggestions/FETCH_PENDING': (state, action) => {
    return { ...state, status: 'PENDING' }
  },
  'suggestions/FETCH_SUCCESS': (state, action) => {
    const byId = action.payload.response.reduce((acc, suggestion, index) => {
      acc[suggestion._id] = suggestion
      return acc
    }, {})
    return {
      ...state,
      status: 'SUCCESS',
      fetchTime: action.payload.time,
      byId: byId,
      error: null
    }
  },
  'suggestions/FETCH_ERROR': (state, action) => {
    return { ...state, status: 'ERROR', error: action.error }
  },
  'suggestions/DELETE_PENDING': (state, action) => {
    return state
  },
  'suggestions/DELETE_SUCCESS': (state, action) => {
    const deletedSuggestion = action.payload.response
    const { [deletedSuggestion._id]: _, ...remainingIds } = state.byId

    return {
      ...state,
      status: 'SUCCESS',
      byId: remainingIds,
      error: null
    }
  },
  'suggestions/DELETE_ERROR': (state, action) => {
    return { ...state, status: 'ERROR', error: action.error }
  }
}

const defaultState = {
  status: 'INIT',
  fetchTime: null,
  byId: {},
  error: null
}

export default function(state = defaultState, action) {
  const actionHandler = actionHandlers[action.type]
  if (actionHandler) {
    return actionHandler(state, action)
  } else {
    return state
  }
}
