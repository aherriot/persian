import {request, quizEqual, getScoreIndex} from '../utils';

import * as types from '../constants/actionTypes';
import constants from '../constants/constants';
import quizStates from '../constants/quizStates';
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

export function selfEvaluate() {
  return {
    type: types.SELF_EVAL
  }
}

export function markCorrect(currentWord) {
  return (dispatch, getState) => {
    const quiz = getState().quiz;
    const scoreIndex = getScoreIndex(quiz.options.fromLang, quiz.options.toLang);
    const score = Math.min(currentWord.scores[scoreIndex] + 1, constants.MAX_BUCKET);

    dispatch(markCorrectPending());
    if(quiz.quizState === quizStates.SELF_EVAL) {
      dispatch(selectWord());
    }

    request('/api/words/' + currentWord._id + '/score', 'PUT',
      {index: scoreIndex, score: score}
    )
    .then(word =>
      dispatch(markCorrectSuccess(word))
    )
    .catch(err =>
      dispatch(markCorrectError(err))
    );
  }

}

function markCorrectPending() {
  return {
    type: types.MARK_CORRECT_PENDING,
  }
}

function markCorrectSuccess(word) {
  return {
    type: types.MARK_CORRECT_SUCCESS,
    payload: {
      word: word
    }
  }
}

function markCorrectError(error) {
  return {
    type: types.MARK_CORRECT_ERROR,
    error: error
  }
}

export function markWrong(response, currentWord) {
  return (dispatch, getState) => {

    const quiz = getState().quiz;
    const score = constants.MIN_BUCKET;
    const scoreIndex = getScoreIndex(quiz.options.fromLang, quiz.options.toLang);

    dispatch(markWrongPending(response));
    if(quiz.quizState === quizStates.SELF_EVAL) {
      dispatch(selectWord());
    }

    request('/api/words/' + currentWord._id + '/score', 'PUT',
      {index: scoreIndex, score: score}
    )
      .then(word => {
        dispatch(markWrongSuccess(word));
      })
      .catch(err => {
        dispatch(markWrongError(err));
      });
  }
}


function markWrongPending(response) {
  return {
    type: types.MARK_WRONG_PENDING,
    payload: {
      response: response,
    }
  }
}

function markWrongSuccess(word) {
  return {
    type: types.MARK_WRONG_SUCCESS,
    payload: {
      word: word
    }
  }
}


function markWrongError(error) {
  return {
    type: types.MARK_WRONG_ERROR,
    error: error
  }
}

export function checkWord(response) {

  return (dispatch, getState) => {

    const quiz = getState().quiz;
    const currentWord = quiz.currentWord;
    const isCorrect = quizEqual(response, currentWord[quiz.options.toLang]);

    if(isCorrect) {
      dispatch(markCorrect(currentWord));

    } else {
      dispatch(markWrong(response, currentWord));
    }
  }
}

export function undoMarkWrong() {
  return (dispatch, getState) => {

    const {currentWord: word, options} = getState().quiz;
    const scoreIndex = getScoreIndex(options.fromLang, options.toLang);
    const newScore = Math.min(word.scores[scoreIndex] + 1, constants.MAX_BUCKET);

    dispatch(markCorrectPending());

    request('/api/words/' + word._id + '/score',  'PUT',
      {index: scoreIndex, score: newScore}
    )
      .then(word => {
        dispatch(markCorrectSuccess(word));
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
  localStorage.setItem('typeResponse', options.typeResponse);

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
