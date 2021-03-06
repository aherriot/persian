export function openChangePasswordModal() {
  return {
    type: 'profile/OPEN_CHANGE_PASSWORD_MODAL'
  }
}

export function closeChangePasswordModal() {
  return {
    type: 'profile/CLOSE_CHANGE_PASSWORD_MODAL'
  }
}

export function setCategory(category) {
  return {
    type: 'profile/SET_CATEGORY',
    payload: { category: category }
  }
}
