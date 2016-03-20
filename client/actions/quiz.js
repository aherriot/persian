import {httpPut, quizEqual, getScoreIndex} from '../utils';

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

    const isCorrect = quizEqual(response, currentWord[quiz.options.toLang]);

    dispatch(submitWord(response, isCorrect));

    const scoreIndex = getScoreIndex(quiz.options.fromLang, quiz.options.toLang);

    if(isCorrect) {
      dispatch(markCorrect(currentWord, scoreIndex));
    } else {
      dispatch(markWrong(currentWord, scoreIndex));
    }
  }
}

export function markCorrect(word, scoreIndex) {

  const wordUpdate = {scores: word.scores.slice()};
  wordUpdate.scores[scoreIndex] = Math.min(word.scores[scoreIndex] + 1, constants.MAX_BUCKET);
  return (dispatch, getState) => {
    httpPut('/api/words/' + word._id, {word: wordUpdate})
      .then(data => {
        dispatch(editWordSuccess(data));
      })
      .catch(err => dispatch(editWordError(err)));
  };
}

export function markWrong(word, scoreIndex) {
  const wordUpdate = {scores: word.scores.slice()};
  wordUpdate.scores[scoreIndex] = constants.MIN_BUCKET;
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
        dispatch(selectWord());
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
