import { authRequest } from 'utils/request'

export function fetchWords() {
  return authRequest('words/FETCH', '/api/words')
}
