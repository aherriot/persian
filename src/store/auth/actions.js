import { authRequest } from 'utils/request'

export function openAuthModal(showCreateAccount = false) {
  return {
    type: 'auth/OPEN_MODAL',
    payload: { showCreateAccount }
  }
}

export function closeAuthModal() {
  return { type: 'auth/CLOSE_MODAL' }
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

export function changePassword(userId, password, newPassword) {
  return authRequest(
    'auth/CHANGE_PASSWORD',
    `/api/users/${userId}/password`,
    'PUT',
    {
      password,
      newPassword
    }
  )
}

export function logout() {
  return { type: 'auth/LOGOUT' }
}

export function refreshToken() {
  return authRequest('auth/REFRESH_TOKEN', '/api/users/refresh-token')
}
