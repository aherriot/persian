const actionHandlers = {
  'words/FETCH_SUCCESS': (state, action) => {
    const byId = action.payload.response.reduce((acc, word, index) => {
      acc[word._id] = word
      return acc
    }, {})
    return {
      ...state,
      fetchStatus: 'SUCCESS',
      fetchTime: Date.now(),
      byId: byId,
      error: null
    }
  }
}

const defaultState = {
  fetchStatus: 'INIT',
  fetchTime: null,
  modifyStatus: 'INIT',
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
