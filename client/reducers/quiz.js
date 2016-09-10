import * as types from '../constants/actionTypes';
import constants from '../constants/constants';
import quizStates from '../constants/quizStates';
import {filterWords, getScoreIndex, selectLeitner, selectLeastRecent, selectRandom} from '../utils/';


//determine if "typeResponse" is true, false, or not defined in localStorage
let typeResponse = localStorage.getItem('typeResponse');
if(typeResponse) {
  typeResponse = (typeResponse === 'true');
} else {
  typeResponse = true;
}

const defaultState = {
  quizState: quizStates.NO_WORDS,
  nextQuizState: null,
  currentWordId: null,
  currentBucket: Number(localStorage.getItem('currentBucket')) || 0,

  filteredWordIds: [],

  previousWordId: null,

  recentWrongIds: [],
  response: null,
  options: {
    fromLang: localStorage.getItem('fromLang') || constants.PHONETIC,
    toLang: localStorage.getItem('toLang') || constants.ENGLISH,
    selectionAlgorithm: localStorage.getItem('selectionAlgorithm') || constants.LEITNER,
    filter: localStorage.getItem('filter') || '',
    typeResponse: typeResponse
  }
};

export default function quiz(state = defaultState, action) {
  switch (action.type) {

  case types.SELECT_WORD:
    //TODO: refactor this to make it legible

    // debugger
    let loopCounter = 0;
    let word = null;

    let filteredWordIds = state.filteredWordIds;
    let currentBucket = state.currentBucket;
    let recentWrongIds = state.recentWrongIds;
    let previousWordId = state.previousWordId;

    let wordKeys = Object.keys(action.payload.words);
    // if we don't have any words, return null;
    if (wordKeys.length === 0) {
      return {
        ...state,
        currentWordId: null,
        quizState: quizStates.QUIZZING
      }
    }

    // If out filtered list is empty, try to refilter it.
    if(filteredWordIds.length === 0) {
      filteredWordIds = filterWords(
        action.payload.words,
        state.options,
        currentBucket
      );
    }

    // Now decide if we want a new word of one from the recent wrong list
    // if(state.options.testRecentWrong) { //
    //
    // }

    //filter previousWordId from recentWrongIds
    const filteredRecentWrong = recentWrongIds.filter(wordId => wordId !== previousWordId);
    //select from recentWrongIds
    const recentWrongThreshold = filteredRecentWrong.length / constants.MAX_RECENT_WRONG_LENGTH;

    if(action.payload.seed < recentWrongThreshold) {
      const newSeed = action.payload.seed / recentWrongThreshold;
      word = filteredRecentWrong[Math.floor(newSeed*filteredRecentWrong.length)];
    } else {
      // rescale the seed based on if we are using recentWrong or not
      const newSeed = action.payload.seed / (1 - recentWrongThreshold);

      switch(state.options.selectionAlgorithm) {
      case constants.LEITNER:

        while(!word && currentBucket <= constants.MAX_BUCKET) {
          loopCounter++;
          if(loopCounter > constants.MAX_BUCKET) {

            if(recentWrongIds.length === 0) {

              if(previousWordId === null) {
                return {
                  ...state,
                  currentWordId: null,
                  previousWordId: null,
                  recentWrongIds: [],
                  response: null,
                  quizState: quizStates.NO_WORDS
                }
              } else {
                previousWordId = null;
              }

            } else {

              recentWrongIds = [];
            }

            loopCounter = 0;
          }

          const wordIds = filteredWordIds.filter(wordId => {

            if (previousWordId === wordId) {
              return false;
            }

            // if already in recent wrong list, don't use.
            if(recentWrongIds.includes(wordId)) {
              return false;
            }

            return true;
          });

          // console.log('exclude prev and recentWrong. remaining: ', words.length);

          // word = selectLeitner(
          //   words,
          //   action.payload.seed,
          //   previousWordId,
          //   recentWrongIds,
          //   state.options
          // );

          word = wordIds[Math.floor(action.payload.seed*wordIds.length)];
          // word = action.payload.words[selectedWordId];

          if(!word) {
            if(currentBucket >= constants.MAX_BUCKET) {
              currentBucket = 0;
            } else {
              currentBucket++;
            }
            console.log('currentBucket: ', currentBucket);


            filteredWordIds = filterWords(
              action.payload.words,
              state.options,
              currentBucket
            );


          }
        }
        break;

      case constants.RANDOM:
          word = selectRandom(
            filteredWordIds,
            action.payload.seed,
            previousWordId,
            recentWrongIds,
            state.options
          );
          break;

      case constants.LEAST_RECENT:
          word = selectLeastRecent(
            filteredWordIds,
            action.payload.seed,
            previousWordId,
            recentWrongIds,
            state.options
          );
          break;


      default:
          throw new Exception("Unknown quiz algorithm: "  + state.options.selectionAlgorithm);

      }
    }

    console.log('SELECTED: ', word);
    return {
      ...state,
      currentWordId: word,
      currentBucket: currentBucket,
      filteredWordIds: filteredWordIds,
      recentWrongIds: recentWrongIds,
      previousWordId: previousWordId,
      quizState: quizStates.QUIZZING,
      response: null
    }

  case types.SELF_EVAL:
    return {...state,
      quizState: quizStates.SELF_EVAL
    };

  case types.MARK_CORRECT_PENDING:

    recentWrongIds = state.recentWrongIds.filter((wordId) => {
      return wordId !== state.currentWordId;
    });

    filteredWordIds = state.filteredWordIds.filter(wordId => wordId !== state.currentWordId)

    return {...state,
      quizState: quiz.quizState === quizStates.SELF_EVAL ? quizStates.SELF_EVAL : quizStates.CORRECT,
      previousWordId: state.currentWordId,
      recentWrongIds: recentWrongIds,
      filteredWordIds: filteredWordIds
    };

  case types.MARK_WRONG_PENDING:

    const inRecentWrong = (state.recentWrongIds.indexOf(state.currentWordId) !== -1);
    let recentWrongs = state.recentWrongIds;

    if(!inRecentWrong) {
      recentWrongs = state.recentWrongIds.slice();
      recentWrongs.push(state.currentWordId);
    }

    filteredWordIds = state.filteredWordIds.filter(wordId => wordId !== state.currentWordId)

    return {...state,
      quizState: quiz.quizState === quizStates.SELF_EVAL ? quizStates.SELF_EVAL : quizStates.WRONG,
      previousWordId: state.currentWordId,
      recentWrongIds: recentWrongs,
      filteredWordIds: filteredWordIds,
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
      currentBucket: action.payload.currentBucket,
      recentWrongIds: [],
      filteredWordIds: []
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
      // currentWord: action.payload.word
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
