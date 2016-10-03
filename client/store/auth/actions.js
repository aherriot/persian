import { push } from 'react-router-redux';
import jwtDecode from 'jwt-decode';
import { SubmissionError } from 'redux-form';

import request from 'utils/request';
import * as types from './constants';

export function showLoginDialog() {
  return {
    type: types.SHOW_LOGIN_DIALOG
  }
}

export function showCreateAccountDialog() {
  return {
    type: types.SHOW_CREATE_ACCOUNT_DIALOG
  }
}

export function hideAuthDialog() {
  return {
    type: types.HIDE_AUTH_DIALOG
  }
}

function loginSuccess(token) {

  let decoded = jwtDecode(token);

  localStorage.setItem('token', token);

  return {
    type: types.LOGIN_SUCCESS,
    payload: {
      username: decoded.username,
      exp: decoded.exp,
      role: decoded.role,
      token: token,
    }
  }
}

function loginError(error) {
  localStorage.removeItem('token');

  return {
    type: types.LOGIN_ERROR,
    error: error
  }
}

function loginPending() {
  return {
    type: types.LOGIN_PENDING
  }
}

export function login(username, password) {
    return function(dispatch) {
        dispatch(loginPending());

        return request('/api/users/login', 'POST', {
          username: username,
          password: password
        })
        .then(resp => {
          dispatch(loginSuccess(resp.token));
        })
        // .catch(error => {
        //   dispatch(loginError(error));
        //   return error;
        // })
    }
}

export function logout() {
    localStorage.removeItem('token');

    return {
        type: types.LOGOUT
    }
}

export function logoutAndRedirect(redirect = '/login') {
    return (dispatch, state) => {
      dispatch(logout());
      dispatch(push(redirect));
    }
}

function createAccountSuccess(token) {
  localStorage.setItem('token', token);

  let decoded = jwtDecode(token);

  return {
    type: types.CREATE_ACCOUNT_SUCCESS,
    payload: {
      username: decoded.username,
      token: token,
      role: decoded.role,
      exp: decoded.exp
    }
  }
}

function createAccountFailure(error) {
  localStorage.removeItem('token');

  return {
    type: types.CREATE_ACCOUNT_ERROR,
    error: error
  }
}

function createAccountPending() {
  return {
    type: types.CREATE_ACCOUNT_PENDING
  }
}

export function createAccount(username, email, password) {
    return function(dispatch) {
        dispatch(createAccountPending());
        return request('/api/users', 'POST', {
          username: username,
          email: email,
          password: password
        })
        .then(response => {
          dispatch(createAccountSuccess(response.token));
        })
        // .catch(error => {
        //   dispatch(createAccountFailure(error));
        //   return error;
        // })
    }
}
