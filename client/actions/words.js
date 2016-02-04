import * as types from '../constants/actionTypes';
import {httpGet, httpPut, httpPost, httpDelete} from '../utils';

import {selectWord} from './quiz';

function fetchWordsPending() {
  return {
    type: types.FETCH_WORDS_PENDING
  };
}

function fetchWordsSuccess(words) {
  return {
    type: types.FETCH_WORDS_SUCCESS,
    payload: {
      words: words,
      error: {}
    }
  };
}

function fetchWordsError(error) {
  return {
    type: types.FETCH_WORDS_ERROR,
    payload: {
      error: error
    }
  };
}

export function fetchWords() {
  return (dispatch) => {
    dispatch(fetchWordsPending());

    httpGet('/api/words')
      .then(data => {
        dispatch(fetchWordsSuccess(data));
        dispatch(selectWord());
      })
      .catch(err => {
        dispatch(fetchWordsError(err));
      });
  };
}

function addWordPending(word) {
  return {
    type: types.ADD_WORD_PENDING,
    payload: {
      word: word
    }
  };
}

function addWordSuccess(word) {
  return {
    type: types.ADD_WORD_SUCCESS,
    payload: {
      word: word,
      error: {}
    }
  };
}

function addWordError(word, error) {
  return {
    type: types.ADD_WORDS_ERROR,
    payload: {
      word: word,
      error: error
    }
  };
}

export function addWord(word) {
  return (dispatch) => {
    dispatch(addWordPending());

    httpPost('/api/words', word)
      .then(data => dispatch(addWordSuccess(data)))
      .catch(err => dispatch(addWordError(err)));
  };
}

function bulkAddWordsPending() {
  return {
    type: types.BULK_ADD_WORDS_PENDING
  };
}

function bulkAddWordsSuccess(words) {
  return {
    type: types.BULK_ADD_WORDS_SUCCESS,
    payload: {
      word: words,
      error: {}
    }
  };
}

function bulkAddWordsError(words, error) {
  return {
    type: types.BULK_ADD_WORDS_ERROR,
    payload: {
      words: words,
      error: error
    }
  };
}

export function bulkAddWords(words) {
  return (dispatch) => {
    dispatch(bulkAddWordsPending());

    httpPost('/api/words', words)
      .then(data => dispatch(bulkAddWordsSuccess(data)))
      .catch(err => dispatch(bulkAddWordsError(err)));
  };
}

function deleteWordPending(word) {
  return {
    type: types.DELETE_WORD_PENDING,
    payload: {
      word: {
        id: word.id
      }
    }
  };
}

function deleteWordSuccess() {
  return {
    type: types.DELETE_WORD_SUCCESS,
    payload: {}
  };
}

function deleteWordError(word, error) {
  return {
    type: types.DELETE_WORDS_ERROR,
    payload: {
      word: word,
      error: error
    }
  };
}

export function deleteWord(word) {
  return (dispatch) => {
    dispatch(deleteWordPending(word));

    httpDelete('/api/words/' + word.id)
      .then(data => dispatch(deleteWordSuccess(data)))
      .catch(err => dispatch(deleteWordError(err)));
  };
}

export function editWordPending() {
  return {
    type: types.EDIT_WORD_PENDING
  };
}

export function editWordSuccess(word) {
  return {
    type: types.EDIT_WORD_SUCCESS,
    payload: {word: word}
  };
}

export function editWordError(word, error) {
  return {
    type: types.EDIT_WORDS_ERROR,
    payload: {
      word: word,
      error: error
    }
  };
}

export function editWord(word) {
  return (dispatch) => {
    dispatch(editWordPending(word));
    httpPut('/api/words/' + word.id, {word: word})
      .then(data => dispatch(editWordSuccess(data.word)))
      .catch(err => dispatch(editWordError(err)));

  };
}
