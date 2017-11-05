export function showAlert(title, text) {
  return {
    type: 'app/SHOW_ALERT',
    payload: {
      title,
      text
    }
  }
}

export function hideAlert() {
  return { type: 'app/HIDE_ALERT' }
}
