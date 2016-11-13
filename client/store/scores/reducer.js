import * as types from './constants';
import constants from '../../constants/constants';

const defaultState = {
  status: constants.INIT,
  byWordId: {},
  error: {}
};

export default function wordsReducer(state = defaultState, action) {
  switch (action.type) {

  case types.FETCH_SCORES_PENDING:
    return {
      ...state,
      byWordId: {},
      status: constants.PENDING
    }

  case types.FETCH_SCORES_SUCCESS:

    const byWordId = action.payload.response.reduce((acc, score, index) => {
      acc[score.wordId] = score;
      return acc;
    }, {});

    return {
      ...state,
      byWordId: byWordId,
      status: constants.SUCCESS
    };

  case types.FETCH_SCORES_ERROR:
    return {
      ...state,
      byWordId: {},
      error: action.payload.error
    }

  case types.SET_SCORE_PENDING:
    return {...state}

  case types.SET_SCORE_SUCCESS:

    const newScore = action.payload.response;
    return {...state,
      byWordId: {...state.byWordId, [newScore.wordId]: newScore},
      status: constants.SUCCESS
    };
  case types.SET_SCORE_ERROR:
    return {
      ...state,
      error: action.payload.error
    }
  default:
    return state;
  }
}
