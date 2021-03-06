const actionHandlers = {
  'profile/OPEN_CHANGE_PASSWORD_MODAL': function(state, action) {
    return { ...state, showChangePasswordModal: true }
  },
  'profile/CLOSE_CHANGE_PASSWORD_MODAL': function(state, action) {
    return { ...state, showChangePasswordModal: false }
  },
  'profile/SET_CATEGORY': function(state, action) {
    return { ...state, selectedTag: action.payload.category }
  }
}
const defaultState = {
  showChangePasswordModal: false,
  selectedTag: ''
}

export default function(state = defaultState, action) {
  const actionHandler = actionHandlers[action.type]
  if (actionHandler) {
    return actionHandler(state, action)
  } else {
    return state
  }
}
