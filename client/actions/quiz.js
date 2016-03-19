import {httpPut, areEqual} from '../utils';

import * as types from '../constants/actionTypes';
import constants from '../constants/constants';
import {editWord, editWordPending, editWordSuccess, editWordError} from './words';

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

    const isCorrect = areEqual(response, currentWord[quiz.options.toLang]);

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

  const wordUpdate = {scores: Math.min(word.scores + 1, constants.MAX_BUCKET)};
  return (dispatch, getState) => {
    httpPut('/api/words/' + word._id, {word: wordUpdate})
      .then(data => {
        dispatch(editWordSuccess(data));
      })
      .catch(err => dispatch(editWordError(err)));
  };
}

export function markWrong(word, languagePair) {
  const wordUpdate = {scores: constants.MIN_BUCKET};
  return (dispatch, getState) => {
    httpPut('/api/words/' + word._id, {word: wordUpdate})
      .then(data => {
        dispatch(editWordSuccess(data));
      })
      .catch(err => dispatch(editWordError(err)));
  };
}

export function undoMarkWrong() {
  return (dispatch, getState) => {

    const word = getState().quiz.currentWord;
    httpPut('/api/words/' + word._id, {word: {scores: word.scores}})
      .then(data => {
        dispatch(editWordSuccess(data));
      })
      .catch(err => dispatch(editWordError(err)));
  }
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

export function startEditingWord() {
  return {
    type: types.START_EDITING_WORD
  }
}

export function quizEditWord(word) {
  return (dispatch) => {
    dispatch(editWord(word));
    dispatch({
      type: types.QUIZ_EDIT_WORD,
      payload: {
        word: word
      }
    });
  }
}



export function revertEditWord() {
  return {
    type: types.REVERT_EDIT_WORD
  }
}
