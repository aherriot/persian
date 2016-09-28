import * as actionsTypes from './constants';
import constants from 'constants/constants';
import jwtDecode from 'jwt-decode'


const token = localStorage.getItem('token');
let decoded = undefined;

if(token) {
  decoded = jwtDecode(token);

  //If it has expired
  if(decoded.exp * 1000 > Date.now()) {
    decoded = undefined;
  }
}

const defaultState = {
  token: token,
  username: decoded ? decoded.email : undefined,
  role: decoded ? decoded.role : undefined,
  exp: decoded ? decoded.role : undefined,

  showAuthDialog: false,
  screen: constants.LOGIN,

  error: undefined
}

export default function auth(state = defaultState, action) {
  switch(action.type) {

  case actionsTypes.SHOW_CREATE_ACCOUNT_DIALOG:
    return {...state,
      showAuthDialog: true,
      screen: constants.CREATE_ACCOUNT
    };

  case actionsTypes.SHOW_LOGIN_DIALOG:
    return {...state,
      showAuthDialog: true,
      screen: constants.LOGIN

    };

  case actionsTypes.SHOW_FORGOT_DIALOG:
    return {...state,
      showAuthDialog: true,
      screen: constants.FORGOT

    };

  case actionsTypes.HIDE_AUTH_DIALOG:
    return {...state,
      showAuthDialog: false
    };

  case actionsTypes.LOGIN_SUCCESS:
    return {...state,
      username: action.payload.username,
      token: action.payload.token,
      role: action.payload.role,
      showAuthDialog: false,
      error: undefined

    };
  case actionsTypes.LOGIN_ERROR:
    return {...state,
      username: undefined,
      token: undefined,
      role: undefined,
      error: action.error
    };

  case actionsTypes.LOGOUT:
    return {...state,
      username: undefined,
      token: undefined,
      role: undefined,
      error: undefined,
    };

  case actionsTypes.AUTH_ERROR:

    return {...state,
      username: undefined,
      token: undefined,
      role: undefined,
      showAuthDialog: true,
      screen: constants.LOGIN,
      error: action.error
    }

  case actionsTypes.CREATE_ACCOUNT_PENDING:
    return state;

  case actionsTypes.CREATE_ACCOUNT_SUCCESS:
    return {...state,
      username: action.payload.username,
      token: action.payload.token,
      role: action.payload.role,
      showAuthDialog: false,

    };

  case actionsTypes.CREATE_ACCOUNT_ERROR:
    return {...state,
      username: undefined,
      token: undefined,
      role: undefined,
      error: action.error
    };

  default:
    return state;
  }
}
