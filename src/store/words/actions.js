import { authRequest } from 'utils/request'

export function fetchWords() {
  return authRequest('words/FETCH', '/api/words')
}

export function addWord(word) {
  return authRequest('words/ADD', `/api/words`, 'POST', word)
}

export function updateWord(word) {
  return authRequest('words/UPDATE', `/api/words/${word._id}`, 'PUT', word)
}

export function deleteWord(word) {
  return authRequest('words/DELETE', `/api/words/${word._id}`, 'DELETE')
}
