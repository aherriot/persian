import * as types from '../constants/actionTypes';

const defaultState = {
  showingOptions: false,
  isQuizzing: false,
  isCorrect: true,
  currentWord: null,
  previousWordId: null,
  recentWrongIds: [],
  response: null,
  options: {
    fromLang: 'phonetic',
    toLang: 'english',
    selectionAlgorithm: 'LEITNER',
    filter: ''
  }
};

function selectLeitnerFromSeed(list, seed, previousWordId, recentWrongIds, quizOptions) {

  let bucketIndex = 0;
  let bucket = [];

  // search through word list from lowest score upwards until we find a word.
  while(bucket.length === 0) {
    bucket = list.filter((word) => {
      if (previousWordId === word.id) {
        return false;
      }

      if(word.scores !== bucketIndex) {
        return false;
      }


      if(quizOptions.filter.length > 0) {
        if(word.tags.every(tag => !tag.includes(quizOptions.filter))) {
          return false;
        }
      }

      return true;
    });
    bucketIndex++;
  }

  return bucket[Math.floor(seed*bucket.length)];
}

export default function quiz(state = defaultState, action, words) {
  switch (action.type) {

  case types.SELECT_WORD:
    let word = null;
    if (words.list.length) {
      if(state.options.selectionAlgorithm === 'LEITNER') {
        word = selectLeitnerFromSeed(
          words.list,
          action.payload.seed,
          state.previousWordId,
          state.recentWrongIds,
          state.options
        );
      } else {
        throw new Exception("Unknown quiz algorithm: "  + state.options.selectionAlgorithm);
      }

    }

    return {
      ...state,
      currentWord: word,
      isQuizzing: true,
      isCorrect: null,
    };

  case types.SUBMIT_WORD:

    if(action.payload.isCorrect) {
      //remove from recent wrong list
      let recentWrongIds = state.recentWrongIds.filter((wordId) => {
        return wordId !== state.currentWord.id;
      });

      return {...state,
        isQuizzing: false,
        isCorrect: true,
        previousWordId: state.currentWord.id,
        recentWrongIds: recentWrongIds,
        response: action.payload.response
      };
    } else {
      let inRecentWrong = (state.recentWrongIds.indexOf(state.currentWord.id) !== -1);

      if(inRecentWrong) {
        return {...state,
          isQuizzing: false,
          isCorrect: false,
          previousWordId: state.currentWord.id
        };
      } else {
        let newRecentWrongs = state.recentWrongIds.slice();
        newRecentWrongs.push(state.currentWord.id);
        return {...state,
          isQuizzing: false,
          isCorrect: false,
          previousWordId: state.currentWord.id,
          recentWrongIds: newRecentWrongs,
          response: action.payload.response
        };
      }

    }

  case types.SHOW_QUIZ_OPTIONS:
    return {
      ...state,
      showingOptions: true
    };

  case types.UPDATE_QUIZ_OPTIONS:
    return {
      ...state,
      showingOptions: false,
      options: {...state.options, ...action.payload.options}
    }

  default:
    return state;
  }
}
