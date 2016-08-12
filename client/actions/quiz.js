import {httpPut, quizEqual, getScoreIndex} from '../utils';

import * as types from '../constants/actionTypes';
import constants from '../constants/constants';
import {editWord, editWordPending, editWordSuccess, editWordError} from './words';

export function selectWord() {
  return (dispatch, getState) => {
    dispatch({
      type: types.SELECT_WORD,
      payload: {
        seed: Math.random(),
        words: getState().words.list
      }
    });
  }

}

function markCorrect(response) {
  return {
    type: types.MARK_CORRECT,
    payload: {
      response: response
    }
  }

}

function markWrong(response) {
  return {
    type: types.MARK_WRONG,
    payload: {
      response: response
    }
  }
}

function markSuccess(word) {
  return {
    type: types.MARK_SUCCESS,
    payload: {
      word: word
    }
  }

}

function markError(error) {
  return {
    type: types.MARK_ERROR,
    error: error
  }
}

export function checkWord(response) {

  return (dispatch, getState) => {

    const quiz = getState().quiz;
    const currentWord = quiz.currentWord;
    const isCorrect = quizEqual(response, currentWord[quiz.options.toLang]);
    const scoreIndex = getScoreIndex(quiz.options.fromLang, quiz.options.toLang);

    if(isCorrect) {
      dispatch(markCorrect(response));

      const score = Math.min(currentWord.scores[scoreIndex] + 1, constants.MAX_BUCKET);
      httpPut('/api/words/' + currentWord._id + '/score', {index: scoreIndex, score: score})
        .then(word =>
          dispatch(markSuccess(word))
        )
        .catch(err =>
          dispatch(markError(err))
        );


    } else {
      dispatch(markWrong(response));
      const score = constants.MIN_BUCKET;

      httpPut('/api/words/' + currentWord._id + '/score', {index: scoreIndex, score: score})
        .then(word => {
          dispatch(markSuccess(word));
        })
        .catch(err => {
          dispatch(markError(err));
        });
    }
  }
}

export function undoMarkWrong() {
  return (dispatch, getState) => {

    const {currentWord: word, options} = getState().quiz;
    const scoreIndex = getScoreIndex(options.fromLang, options.toLang);
    const newScore = Math.min(word.scores[scoreIndex] + 1, constants.MAX_BUCKET);
    dispatch(markCorrect(''));

    httpPut('/api/words/' + word._id + '/score', {index: scoreIndex, score: newScore})
      .then(word => {
        dispatch(markSuccess(word));
        dispatch(selectWord());
      })
      .catch(err => dispatch(markError(err)));
  }
}

export function showQuizOptions() {
  return {
    type: types.SHOW_QUIZ_OPTIONS
  }
}

function updateQuizOptions(options) {

  localStorage.setItem('fromLang', options.fromLang);
  localStorage.setItem('toLang', options.toLang);
  localStorage.setItem('selectionAlgorithm', options.selectionAlgorithm);
  localStorage.setItem('filter', options.filter);

  return {
    type: types.UPDATE_QUIZ_OPTIONS,
    payload: {
      options: options
    }
  }
}

export function setQuizOptions(newOptions) {
  return (dispatch, getState) => {

    let currentOptions = getState().quiz.options;

    dispatch(updateQuizOptions(newOptions));

    if(newOptions.filter !== currentOptions.filter) {
      dispatch(selectWord());
    }
  }
}

export function revertQuizOptions() {
  return {
    type: types.REVERT_QUIZ_OPTIONS
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
