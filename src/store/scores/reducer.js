const actionHandlers = {
  'scores/FETCH_PENDING': (state, action) => {
    return { ...state, fetchStatus: 'PENDING' }
  },
  'scores/FETCH_SUCCESS': (state, action) => {
    const byWordId = action.payload.response.reduce((acc, score, index) => {
      acc[score.wordId] = score
      return acc
    }, {})
    return {
      ...state,
      fetchStatus: 'SUCCESS',
      fetchTime: Date.now(),
      byWordId: byWordId,
      error: null
    }
  },
  'scores/FETCH_ERROR': (state, action) => {
    return { ...state, fetchStatus: 'ERROR', error: action.error }
  },
  'scores/UPDATE_PENDING': (state, action) => {
    return state
  },
  'scores/UPDATE_SUCCESS': (state, action) => {
    const newScore = action.payload.response
    return {
      ...state,
      fetchStatus: 'SUCCESS',
      byWordId: {
        ...state.byWordId,
        [newScore.wordId]: newScore
      },
      error: null
    }
  },
  'scores/UPDATE_ERROR': (state, action) => {
    return { ...state, fetchStatus: 'ERROR', error: action.error }
  }
}

const defaultState = {
  fetchStatus: 'INIT',
  fetchTime: null,
  byWordId: {},
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
