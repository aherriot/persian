import * as types from '../constants/actionTypes';

const defaultState = {
  currentWordId: null,
  previousWordId: null,
  recentWrongIds: [],
  selectionAlgorithm: 'LEITNER'
};

function selectRandom(list, seed, previousWordId, recentWrongIds) {

  let bucketIndex = 0;
  let bucket = [];

  while(bucket.length === 0) {
    console.log('looking in bucket: ', bucketIndex);
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
    let id;
    if (words.list.length) {
      let word = selectRandom(
        words.list,
        action.payload.seed,
        state.previousWordId,
        state.recentWrongIds);

      id = word.id
    } else {
      id = null;
    }
    return {...state, currentWordId: id};

  case types.MARK_CORRECT_SUCCESS:
    let recentWrongIds = state.recentWrongIds.filter((wordId) => {
      return wordId !== action.payload.wordId
    });

    return {...state,
      currentWordId: null,
      previousWordId: action.payload.wordId,
      recentWrongIds: recentWrongIds
    };

  case types.MARK_WRONG_SUCCESS:
    let notInRecentWrong = state.recentWrongIds.indexOf(action.payload.wordId) === -1;

    if(notInRecentWrong) {
      let newRecentWrongs = state.recentWrongIds.slice();
      newRecentWrongs.push(action.payload.wordId);
      return {...state,
        currentWordId: null,
        previousWordId: action.payload.wordId,
        recentWrongIds: newRecentWrongs
      };
    } else {
      return {...state,
        currentWordId: null,
        previousWordId: action.payload.wordId
      };
    }

  default:
    return state;
  }
}
