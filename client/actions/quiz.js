import {quizEqual, getScoreIndex} from '../utils';
import request from '../utils/request';

import * as types from '../constants/actionTypes';
import constants from '../constants/constants';
import quizStates from '../constants/quizStates';
import {editWord} from './words';

export function selectWord() {
  return (dispatch, getState) => {
    localStorage.setItem('currentBucket', getState().quiz.currentBucket);

    dispatch({
      type: types.SELECT_WORD,
      payload: {
        seed: Math.random(),
        words: getState().words.byId,
        scores: getState().scores.byWordId
      }
    });
  };
}

export function selfEvaluate() {
  return {
    type: types.SELF_EVAL
  };
}

function markCorrectPending(word) {
  return {
    type: types.MARK_CORRECT_PENDING,
    payload: {
      word: word
    }
  };
}

function markCorrectSuccess(word) {
  return {
    type: types.MARK_CORRECT_SUCCESS,
    payload: {
      word: word
    }
  };
}

function markCorrectError(error) {
  return {
    type: types.MARK_CORRECT_ERROR,
    error: error
  };
}

export function markCorrect() {
  return (dispatch, getState) => {
    const {words: {byId: words}, quiz} = getState();
    const currentWord = words[quiz.currentWordId];

    const scoreIndex = getScoreIndex(quiz.options.fromLang, quiz.options.toLang);
    const score = Math.min(currentWord.scores[scoreIndex] + 1, constants.MAX_BUCKET);

    dispatch(markCorrectPending(currentWord));

    if (quiz.quizState === quizStates.SELF_EVAL) {
      dispatch(selectWord());
    }

    request('/api/words/' + currentWord._id + '/score', 'PUT',
      {index: scoreIndex, score: score}
    )
    .then(word =>
      dispatch(markCorrectSuccess(word))
    )
    .catch(err => {
      dispatch(markCorrectError(err));
    });
  };
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
  };
}

export function markWrong(response, currentWord) {
  return (dispatch, getState) => {
    const quiz = getState().quiz;
    const score = constants.MIN_BUCKET;
    const scoreIndex = getScoreIndex(quiz.options.fromLang, quiz.options.toLang);

    dispatch(markWrongPending(response));
    if (quiz.quizState === quizStates.SELF_EVAL) {
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
  };
}

export function checkWord(response) {

  return (dispatch, getState) => {

    const {words: {byId: words}, quiz} = getState();
    const currentWord = words[quiz.currentWordId];
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

    const {words: {byId: words}, quiz: {currentWordId, options}} = getState();

    const currentWord = words[currentWordId];
    const scoreIndex = getScoreIndex(options.fromLang, options.toLang);
    const newScore = Math.min(currentWord.scores[scoreIndex] + 1, constants.MAX_BUCKET);

    dispatch(markCorrectPending(currentWord));
    dispatch(selectWord());

    request('/api/words/' + currentWordId + '/score',  'PUT',
      {index: scoreIndex, score: newScore}
    )
      .then(word => {
        dispatch(markCorrectSuccess(currentWord));
      })
      .catch(err => dispatch(markError(err)));
  }
}

export function showQuizOptions() {
  return {
    type: types.SHOW_QUIZ_OPTIONS
  }
}

function updateQuizOptions(options, currentBucket) {

  localStorage.setItem('fromLang', options.fromLang);
  localStorage.setItem('toLang', options.toLang);
  localStorage.setItem('selectionAlgorithm', options.selectionAlgorithm);
  localStorage.setItem('filter', options.filter);
  localStorage.setItem('typeResponse', options.typeResponse);
  localStorage.setItem('currentBucket', currentBucket);

  return {
    type: types.UPDATE_QUIZ_OPTIONS,
    payload: {
      options: options,
      currentBucket: currentBucket
    }
  }
}

export function setQuizOptions(newOptions, newBucket) {
  return (dispatch, getState) => {

    let quiz = getState().quiz;

    dispatch(updateQuizOptions(newOptions, newBucket));

    // If we have changed the filter or the bucket, also select a new word
    if(newOptions.filter !== quiz.options.filter ||
        quiz.currentBucket !== newBucket) {
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
