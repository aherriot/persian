import { authRequest } from 'utils/request'

export function openAuthDialog() {
  return {
    type: 'auth/OPEN_DIALOG'
  }
}

export function closeAuthDialog() {
  return { type: 'auth/CLOSE_DIALOG' }
}

export function showLogin() {
  return { type: 'auth/SHOW_LOGIN' }
}

export function showCreateAccount() {
  return { type: 'auth/SHOW_CREATE_ACCOUNT' }
}

export function login(username, password) {
  return authRequest('auth/LOGIN', '/api/users/login', 'POST', {
    username,
    password
  })
}

export function createAccount(username, email, password) {
  return authRequest('auth/CREATE_ACCOUNT', '/api/users', 'POST', {
    username,
    password,
    email
  })
}

export function logout() {
  return { type: 'auth/LOGOUT' }
}

export function refreshToken() {
  return authRequest('auth/REFRESH_TOKEN', '/api/users/refresh-token')
}
