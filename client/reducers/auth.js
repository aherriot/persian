import * as types from '../constants/actionTypes';


const defaultState = {
  username: undefined,
  token: undefined,
  error: undefined
};

export default function words(state = defaultState, action) {
  switch (action.type) {
  case types.LOGIN_SUCCESS:
    return {...state,
      username: action.payload.username,
      token: action.payload.token,
      error: undefined
    };
  case types.LOGIN_ERROR:
    return {...state,
      username: null,
      token: null,
      error: action.payload.error
    };
  default:
    return state;
  }
}
