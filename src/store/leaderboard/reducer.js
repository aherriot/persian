const actionHandlers = {
  'leaderboard/FETCH_PENDING': (state, action) => {
    return { ...state, status: 'PENDING' }
  },
  'leaderboard/FETCH_SUCCESS': (state, action) => {
    return {
      ...state,
      status: 'SUCCESS',
      fetchTime: action.payload.time,
      data: action.payload.response,
      error: null
    }
  },
  'leaderboard/FETCH_ERROR': (state, action) => {
    return { ...state, status: 'ERROR', error: action.error }
  }
}

const defaultState = {
  status: 'INIT',
  fetchTime: null,
  data: [],
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
