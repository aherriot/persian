import * as types from '../constants/actionTypes';

const defaultState = {
  isQuizzing: false,
  isCorrect: true,
  currentWord: null,
  previousWordId: null,
  recentWrongIds: [],
  response: null,
  options: {
    fromLang: 'phonetic',
    toLang: 'english',
    selectionAlgorithm: 'LEITNER'
  }
};

function selectLeitnerFromSeed(list, seed, previousWordId, recentWrongIds) {

  let bucketIndex = 0;
  let bucket = [];

  // search through word list from lowest score upwards until we find a word.
  while(bucket.length === 0) {
    bucket = list.filter((word) => {
      return previousWordId != word.id && word.scores === bucketIndex;
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
          state.recentWrongIds);
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

  default:
    return state;
  }
}
