import { authRequest } from 'utils/request'

export function openAuthDialog() {
  return {
    type: 'auth/OPEN_DIALOG'
  }
}

export function closeAuthDialog() {
  return { type: 'auth/CLOSE_DIALOG' }
}

export function login(username, password) {
  return authRequest('auth/LOGIN', '/api/users/login', 'POST', {
    username,
    password
  })
}

export function logout() {
  return { type: 'auth/LOGOUT' }
}
