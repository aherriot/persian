import jwtDecode from 'jwt-decode'

const actionHandlers = {
  'auth/OPEN_MODAL': (state, action) => {
    return {
      ...state,
      open: true,
      showCreateAccount: action.payload.showCreateAccount
    }
  },
  'auth/CLOSE_MODAL': (state, action) => {
    return { ...state, open: false }
  },
  'auth/SHOW_LOGIN': (state, action) => {
    return { ...state, showCreateAccount: false }
  },
  'auth/SHOW_CREATE_ACCOUNT': (state, action) => {
    return { ...state, showCreateAccount: true }
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
      id: decoded._id,
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
  'auth/CREATE_ACCOUNT_PENDING': (state, action) => {
    return { ...state, status: 'PENDING' }
  },
  'auth/CREATE_ACCOUNT_SUCCESS': (state, action) => {
    const decoded = jwtDecode(action.payload.response.token)
    localStorage.setItem('token', action.payload.response.token)
    return {
      ...state,
      status: 'SUCCESS',
      token: action.payload.response.token,
      username: decoded.username,
      id: decoded._id,
      role: decoded.role,
      expiresAt: decoded.exp,
      error: null
    }
  },
  'auth/CREATE_ACCOUNT_ERROR': (state, action) => {
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
      id: null,
      role: null,
      expiresAt: null
    }
  },
  'auth/REFRESH_TOKEN_SUCCESS': (state, action) => {
    localStorage.setItem('token', action.payload.response.token)
    return { ...state, token: action.payload.response.token }
  },
  'auth/REFRESH_TOKEN_ERROR': (state, action) => {
    localStorage.removeItem('token')

    return {
      ...state,
      token: null,
      username: null,
      id: null,
      role: null,
      expiresAt: null
    }
  },
  'auth/AUTH_ERROR': (state, action) => {
    return { ...state, open: true }
  }
}

const token = localStorage.getItem('token')
let decoded

if (token) {
  decoded = jwtDecode(token)
}

const defaultState = {
  open: false,
  showCreateAccount: false,

  status: 'INIT',
  token: token,
  username: decoded ? decoded.username : null,
  id: decoded ? decoded._id : null,
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
