import * as types from '../constants/actionTypes';
import constants from '../constants/constants';
import quizStates from '../constants/quizStates';
import {getScoreIndex, selectLeitnerFromSeed, selectRandomFromSeed} from '../utils/';

const defaultState = {
  quizState: quizStates.NO_WORDS,
  nextQuizState: null,
  currentWord: null,
  previousWordId: null,

  recentWrongIds: [],
  response: null,
  options: {
    fromLang: localStorage.getItem('fromLang') || constants.PHONETIC,
    toLang: localStorage.getItem('toLang') || constants.ENGLISH,
    selectionAlgorithm: localStorage.getItem('selectionAlgorithm') || constants.LEITNER,
    filter: localStorage.getItem('filter') || ''
  }
};

export default function quiz(state = defaultState, action) {
  switch (action.type) {

  case types.SELECT_WORD:
    let word = null;

    // If we have words, select the next word
    if (action.payload.words.length) {
      switch(state.options.selectionAlgorithm) {
      case constants.LEITNER:
        word = selectLeitnerFromSeed(
          action.payload.words,
          action.payload.seed,
          state.previousWordId,
          state.recentWrongIds,
          state.options
        );
        break;

      case constants.RANDOM:
        word = selectRandomFromSeed(
          action.payload.words,
          action.payload.seed,
          state.previousWordId,
          state.recentWrongIds,
          state.options
        );
        break;

      default:
        throw new Exception("Unknown quiz algorithm: "  + state.options.selectionAlgorithm);
      }
    }

    return {
      ...state,
      currentWord: word,
      quizState: quizStates.QUIZZING,
    }

  case types.MARK_CORRECT:

      let recentWrongIds = state.recentWrongIds.filter((wordId) => {
        return wordId !== state.currentWord._id;
      });

      return {...state,
        quizState: quizStates.CORRECT,
        previousWordId: state.currentWord._id,
        recentWrongIds: recentWrongIds,
        response: action.payload.response
      };

  case types.MARK_WRONG:

      let inRecentWrong = (state.recentWrongIds.indexOf(state.currentWord._id) !== -1);
      let recentWrongs = state.recentWrongIds;

      if(!inRecentWrong) {
        recentWrongs = state.recentWrongIds.slice();
        recentWrongs.push(state.currentWord._id);
      }

      return {...state,
        quizState: quizStates.WRONG,
        previousWordId: state.currentWord._id,
        recentWrongIds: recentWrongs,
        response: action.payload.response
      };

  case types.SHOW_QUIZ_OPTIONS:
    return {
      ...state,
      quizState: quizStates.OPTIONS,
      nextQuizState: state.quizState === quizStates.OPTIONS || state.quizState === quizStates.EDITING ? state.nextQuizState : state.quizState
    };

  case types.UPDATE_QUIZ_OPTIONS:
    return {
      ...state,
      quizState: state.nextQuizState,
      options: {...state.options, ...action.payload.options},
      recentWrongIds: []
    }

  case types.REVERT_QUIZ_OPTIONS:
    return {
      ...state,
      quizState: state.nextQuizState
    }

  case types.START_EDITING_WORD:
    return {
      ...state,
      quizState: quizStates.EDITING,
      nextQuizState: state.quizState === quizStates.OPTIONS || state.quizState === quizStates.EDITING ? state.nextQuizState : state.quizState
    };

  case types.QUIZ_EDIT_WORD:
    return {
      ...state,
      quizState: state.nextQuizState,
      currentWord: action.payload.word
    };


  case types.REVERT_EDIT_WORD:
    return {
      ...state,
      quizState: state.nextQuizState,
    };

  default:
    return state;
  }
}
