import {httpPut} from '../utils';

import * as types from '../constants/actionTypes';
import {editWordPending, editWordSuccess, editWordError} from './words';

export function selectWord() {
  return {
    type: types.SELECT_WORD,
    payload: {
      seed: Math.random()
    }
  };
}



export function markCorrect(word, languagePair) {
  const editedWord = {id: word.id, scores: Math.min(word.scores + 1, 5)};

  return (dispatch) => {
    dispatch(editWordPending());
    httpPut('/api/words/' + word.id, {word: editedWord})
      .then(data => {
        dispatch(editWordSuccess(editedWord));
        dispatch(markCorrectSuccess(editedWord.id));
        dispatch(selectWord());
      })
      .catch(err => dispatch(editWordError(err)));
  };
}

function markCorrectSuccess(wordId) {
  return {
    type: types.MARK_CORRECT_SUCCESS,
    payload: {
      wordId: wordId
    }
  }
}

export function markWrong(word, languagePair) {
  const editedWord = {id: word.id, scores: 0};

  return (dispatch) => {
    dispatch(editWordPending());
    httpPut('/api/words/' + word.id, {word: editedWord})
      .then(data => {
        dispatch(editWordSuccess(editedWord));
        dispatch(markWrongSuccess(editedWord.id));
        dispatch(selectWord());
      })
      .catch(err => dispatch(editWordError(err)));
  };
}

function markWrongSuccess(wordId) {
  return {
    type: types.MARK_WRONG_SUCCESS,
    payload: {
      wordId: wordId
    }
  }
}
