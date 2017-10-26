const actionHandlers = {
  'words/FETCH_PENDING': (state, action) => {
    return { ...state, fetchStatus: 'PENDING' }
  },
  'words/FETCH_SUCCESS': (state, action) => {
    const byTag = {}
    // normalize the words by id, for fast lookup with a word id.
    const byId = action.payload.response.reduce((acc, word, index) => {
      // Also category the words by tags for fast lookup later
      word.tags.forEach(function(tag) {
        if (byTag[tag]) {
          byTag[tag].push(word._id)
        } else {
          byTag[tag] = [word._id]
        }
      })

      acc[word._id] = word
      return acc
    }, {})
    return {
      ...state,
      fetchStatus: 'SUCCESS',
      fetchTime: Date.now(),
      byId: byId,
      byTag: byTag,
      error: null
    }
  }
}

const defaultState = {
  fetchStatus: 'INIT',
  fetchTime: null,
  modifyStatus: 'INIT',
  byId: {},
  byTag: {},
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
