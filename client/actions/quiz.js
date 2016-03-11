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

function submitWord(response, isCorrect) {
  return {
    type: types.SUBMIT_WORD,
    payload: {
      response: response,
      isCorrect: isCorrect
    }
  }
}

export function checkWord(response) {

  return (dispatch, getState) => {

    const quiz = getState().quiz;

    const currentWord = quiz.currentWord;

    const isCorrect = (response === currentWord[quiz.options.toLang]);

    dispatch(submitWord(response, isCorrect));

    //quiz direction:
    // etc...
    if(isCorrect) {
      dispatch(markCorrect(currentWord));
    } else {
      dispatch(markWrong(currentWord));
    }
  }
}

export function markCorrect(word, languagePair) {
  const editedWord = {id: word.id, scores: Math.min(word.scores + 1, 5)};

  return (dispatch, getState) => {

    httpPut('/api/words/' + word.id, {word: editedWord})
      .then(data => {
        dispatch(editWordSuccess(editedWord));
      })
      .catch(err => dispatch(editWordError(err)));
  };
}

export function markWrong(word, languagePair) {
  const editedWord = {id: word.id, scores: 0};

  return (dispatch, getState) => {
    httpPut('/api/words/' + word.id, {word: editedWord})
      .then(data => {
        dispatch(editWordSuccess(editedWord));
      })
      .catch(err => dispatch(editWordError(err)));
  };
}

export function showQuizOptions() {
  return {
    type: types.SHOW_QUIZ_OPTIONS
  }
}

export function updateQuizOptions(options) {
  return {
    type: types.UPDATE_QUIZ_OPTIONS,
    payload: {
      options: options
    }
  }
}
