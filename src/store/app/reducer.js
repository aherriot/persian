const actionHandlers = {
  'app/SHOW_ALERT': (state, action) => {
    const alert = { title: action.payload.title, text: action.payload.text }
    return { ...state, alerts: state.alerts.concat(alert) }
  },
  'app/HIDE_ALERT': (state, action) => {
    const alerts = state.alerts.slice()
    alerts.shift()
    return { ...state, alerts: alerts }
  }
}

const defaultState = {
  alerts: []
}

export default function(state = defaultState, action) {
  const actionHandler = actionHandlers[action.type]
  if (actionHandler) {
    return actionHandler(state, action)
  } else {
    return state
  }
}
