import * as types from '../constants/actionTypes';
import * as constants from '../constants/constants';

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
    selectionAlgorithm: constants.LEITNER,
    filter: ''
  }
};

function selectLeitnerFromSeed(list, seed, previousWordId, recentWrongIds, quizOptions) {

  let bucketIndex = 0;
  let bucket = [];

  //select from recentWrongIds
  const recentWrongThreshold = recentWrongIds.length / constants.MAX_RECENT_WRONG_LENGTH;
  if(seed < recentWrongThreshold) {
    const newSeed = seed / recentWrongThreshold;
    const wordId = recentWrongIds[Math.floor(newSeed*recentWrongIds.length)];
    console.log('from recentWrong');
    return list.find(word => word._id === wordId);
  } else {
    // search through word list from lowest score upwards until we find a word.
    while(bucket.length === 0 && bucketIndex <= constants.MAX_BUCKET) {
      bucket = list.filter((word) => {
        //Don't show the same word twice in a row
        if (previousWordId === word._id) {
          return false;
        }

        //if it is in a different bucket
        if(word.scores !== bucketIndex) {
          return false;
        }

        // if already in recent wrong list, don't use.
        if(recentWrongIds.includes(word._id)) {
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

    if(bucket.length) {
      console.log('from bucket: ', bucketIndex-1)
      return bucket[Math.floor(seed*bucket.length)];
    } else {
      console.log('not found');
      return null; //no word match
    }
  }
}


function selectRandomFromSeed(list, seed, previousWordId, recentWrongIds, quizOptions) {

  //select from recentWrongIds
  const recentWrongThreshold = recentWrongIds.length / constants.MAX_RECENT_WRONG_LENGTH;
  if(seed < recentWrongThreshold) {
    const newSeed = seed / recentWrongThreshold;
    const wordId = recentWrongIds[Math.floor(newSeed*recentWrongIds.length)];
    return list.find(word => word._id === wordId);
  } else {
    // search through word list from lowest score upwards until we find a word.
    const filteredList = list.filter((word) => {
        //Don't show the same word twice in a row
      if (previousWordId === word._id) {
        return false;
      }

      // if already in recent wrong list, don't use.
      if(recentWrongIds.includes(word._id)) {
        return false;
      }

      if(quizOptions.filter.length > 0) {
        if(word.tags.every(tag => !tag.includes(quizOptions.filter))) {
          return false;
        }
      }

      return true;
    });

    if(filteredList.length) {
      return filteredList[Math.floor(seed*filteredList.length)];
    } else {
      return null; //no word match
    }
  }
}

export default function quiz(state = defaultState, action, words) {
  switch (action.type) {

  case types.SELECT_WORD:
    let word = null;
    if (words.list.length) {
      switch(state.options.selectionAlgorithm) {
      case constants.LEITNER:
        word = selectLeitnerFromSeed(
          words.list,
          action.payload.seed,
          state.previousWordId,
          state.recentWrongIds,
          state.options
        );
        break;

      case constants.RANDOM:
        word = selectRandomFromSeed(
          words.list,
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
      isQuizzing: true,
      isCorrect: null,
    };

  case types.SUBMIT_WORD:

    if(action.payload.isCorrect) {
      //remove from recent wrong list
      let recentWrongIds = state.recentWrongIds.filter((wordId) => {
        return wordId !== state.currentWord._id;
      });

      return {...state,
        isQuizzing: false,
        isCorrect: true,
        previousWordId: state.currentWord._id,
        recentWrongIds: recentWrongIds,
        response: action.payload.response
      };
    } else {
      let inRecentWrong = (state.recentWrongIds.indexOf(state.currentWord._id) !== -1);

      if(inRecentWrong) {
        return {...state,
          isQuizzing: false,
          isCorrect: false,
          previousWordId: state.currentWord._id
        };
      } else {
        let newRecentWrongs = state.recentWrongIds.slice();
        newRecentWrongs.push(state.currentWord._id);
        return {...state,
          isQuizzing: false,
          isCorrect: false,
          previousWordId: state.currentWord._id,
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
      options: {...state.options, ...action.payload.options},
      recentWrongIds: []
    }

  default:
    return state;
  }
}
