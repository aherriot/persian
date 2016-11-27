import {quizEqual, getScoreIndex} from 'utils';
import request from 'utils/request';

import * as types from './constants';
import constants from 'constants/constants';
import quizStates from 'constants/quizStates';
import {setScore} from 'store/scores/actions';
import {editWord} from 'store/words/actions';

export function selectWord() {
  return (dispatch, getState) => {
    localStorage.setItem('currentBucket', getState().quiz.currentBucket);

    let state = getState();
    dispatch({
      type: types.SELECT_WORD,
      payload: {
        seed: Math.random(),
        words: state.words.byId,
        scores: state.scores.byWordId
      }
    });
  };
}

export function selfEvaluate() {
  return {
    type: types.SELF_EVAL
  };
}

export function markCorrect() {
  return (dispatch, getState) => {

    const {scores: {byWordId: scores}, quiz} = getState();
    const index = getScoreIndex(quiz.options.fromLang, quiz.options.toLang);

    let scoreObject = scores[quiz.currentWordId];
    let score

    if(scoreObject) {
      score = Math.min(scoreObject.scores[index] + 1, constants.MAX_BUCKET);
    } else {
      score = 1 // This user has yet to be quizzed on this word, so default to 1
    }

    dispatch(setScore(quiz.currentWordId, index, score));
    dispatch({
      type: types.MARK_CORRECT
    })
  };
}

export function markWrong(response) {
  return (dispatch, getState) => {
    const quiz = getState().quiz;
    const scoreIndex = getScoreIndex(quiz.options.fromLang, quiz.options.toLang);

    dispatch(setScore(quiz.currentWordId, scoreIndex, constants.MIN_BUCKET));
    dispatch({
      type: types.MARK_WRONG,
      payload: {response: response}
    })

    // dispatch(markWrongPending(response));

    if (quiz.quizState === quizStates.SELF_EVAL) {
      dispatch(selectWord());
    }

  };
}

export function checkWord(response) {

  return (dispatch, getState) => {

    const {words: {byId: words}, quiz} = getState();
    const currentWord = words[quiz.currentWordId];
    const isCorrect = quizEqual(response, currentWord[quiz.options.toLang]);

    if(isCorrect) {
      dispatch(markCorrect());

    } else {
      dispatch(markWrong(response));
    }
  }
}

export function undoMarkWrong() {
  return (dispatch, getState) => {

    const {quiz: {currentWordId, options}, scores: {byWordId: scores}} = getState();

    const scoreIndex = getScoreIndex(options.fromLang, options.toLang);
    const newScore = Math.min(scores[currentWordId].scores[scoreIndex] + 1, constants.MAX_BUCKET);

    dispatch({type: types.MARK_CORRECT});
    dispatch(setScore(currentWordId, scoreIndex, newScore));
    dispatch(selectWord());
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
