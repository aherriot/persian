const actions = {
  'words/FETCH_PENDING': (state, action) => {
    return state
  }
}

const defaultState = {
  test: true
}

export default function(state = defaultState, action) {
  const actionHandler = actions[action.type]
  if (actionHandler) {
    return actionHandler(state, action)
  } else {
    return state
  }
}
