export function showAlert(title, text, action) {
  return {
    type: 'app/SHOW_ALERT',
    payload: {
      title,
      text,
      action
    }
  }
}

export function hideAlert() {
  return { type: 'app/HIDE_ALERT' }
}
