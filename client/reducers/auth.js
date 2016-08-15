import * as types from '../constants/actionTypes';

const defaultState = {
  token: localStorage.getItem('token'),
  username: localStorage.getItem('username')
}

export default function auth(state = defaultState, action) {
  switch(action.type) {
  case types.LOGIN_SUCCESS:
    return {...state,
      // loggedIn: true,
      username: action.payload.username,
      token: action.payload.token
    };
  case types.LOGIN_ERROR:
    return {...state,
      // loggedIn: false,
      username: undefined,
      token: undefined
    };

  case types.LOGOUT:
    return {...state,
      username: undefined,
      token: undefined
    };

  case types.CREATE_ACCOUNT_PENDING:
    return {...state

    };

  case types.CREATE_ACCOUNT_SUCCESS:
    return {
      username: action.payload.username,
      token: action.payload.token
    };

  case types.CREATE_ACCOUNT_ERROR:
    return {...state,
      username: undefined,
      token: undefined
    };

  default:
    return state;
  }
}
