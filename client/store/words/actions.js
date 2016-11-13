import {authRequest} from 'utils/request';

export function fetchWords() {
  return authRequest('FETCH_WORDS', '/api/words');
}

export function addWord(word) {
  return authRequest('ADD_WORD', '/api/words', 'POST', word);
}

export function bulkAddWords(words) {
  return authRequest('BULK_ADD_WORDS', '/api/words', 'POST', words);
}

export function deleteWord(word) {
  return authRequest('DELETE_WORD', '/api/words/' + word._id, 'DELETE');
}

export function editWord(word) {
  return authRequest('EDIT_WORD', '/api/words/' + word._id, 'PUT', {word: word});
}
