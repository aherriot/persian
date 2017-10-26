import jwtDecode from 'jwt-decode'

const actionHandlers = {
  'auth/OPEN_DIALOG': (state, action) => {
    return { ...state, open: true, showingCreateAccount: false }
  },
  'auth/CLOSE_DIALOG': (state, action) => {
    return { ...state, open: false }
  },
  'auth/LOGIN_PENDING': (state, action) => {
    return { ...state, status: 'PENDING' }
  },
  'auth/LOGIN_SUCCESS': (state, action) => {
    const decoded = jwtDecode(action.payload.response.token)
    localStorage.setItem('token', action.payload.response.token)
    return {
      ...state,
      status: 'SUCCESS',
      token: action.payload.response.token,
      username: decoded.username,
      role: decoded.role,
      expiresAt: decoded.exp,
      error: null
    }
  },
  'auth/LOGIN_ERROR': (state, action) => {
    return {
      ...state,
      status: 'ERROR'
    }
  },
  'auth/LOGOUT': (state, action) => {
    localStorage.removeItem('token')

    return {
      ...state,
      token: null,
      username: null,
      role: null,
      expiresAt: null
    }
  }
}

const token = localStorage.getItem('token')
let decoded

if (token) {
  decoded = jwtDecode(token)
}

const defaultState = {
  open: false,
  showingCreateAccount: false,

  status: 'INIT',
  token: token,
  username: decoded ? decoded.username : null,
  role: decoded ? decoded.role : null,
  expiresAt: decoded ? decoded.exp : null,
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
