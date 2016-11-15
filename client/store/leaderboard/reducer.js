import * as types from './constants';
import constants from '../../constants/constants';

const defaultState = {
  status: constants.INIT,
  error: {},
  data: []
};

export default function usersReducer(state = defaultState, action) {
  switch (action.type) {
  case types.FETCH_LEADERBOARD_PENDING:
    return {
      ...state,
      status: constants.PENDING,
      data: []
    }

  case types.FETCH_LEADERBOARD_SUCCESS:
    return {
      ...state,
      status: constants.SUCCESS,
      data: action.payload.response
    };

  }

  return state
}
