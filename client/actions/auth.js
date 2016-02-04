import * as types from '../constants/actionTypes';
import {httpGet, httpPut, httpPost, httpDelete} from '../utils';

export function login(username, password) {
  return (dispatch) => {
    httpPost(`/api/auth/${username}/${password}`)
      .then(data => {
        dispatch(loginSuccess(data));
      })
      .catch(err => {
        dispatch(loginError(err));
      });
  };
}

function loginSuccess(token) {

}

function loginError(token) {

}
