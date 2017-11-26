import { authRequest } from 'utils/request'

export function fetchSuggestions() {
  return authRequest('suggestions/FETCH', '/api/suggestions')
}

export function fetchAllSuggestions() {
  return authRequest('suggestions/FETCH', '/api/suggestions/all')
}

export function deleteSuggestion(suggestion) {
  return authRequest(
    'suggestion/DELETE',
    `/api/suggestions/${suggestion._id}`,
    'DELETE'
  )
}

export function addSuggestion(suggestion) {
  return authRequest('suggestion/ADD', `/api/suggestions`, 'POST', suggestion)
}
