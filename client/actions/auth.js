import { push } from 'react-router-redux';

import * as types from '../constants/actionTypes';
import { request } from '../utils';


export function loginSuccess(username, response) {
  localStorage.setItem('token', response.token);
  localStorage.setItem('username', username);

  return {
    type: types.LOGIN_SUCCESS,
    payload: {
      username: username,
      token: response.token,
    }
  }
}

export function loginError(error) {
  localStorage.removeItem('token');
  localStorage.removeItem('username');

  return {
    type: types.LOGIN_ERROR,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function loginPending() {
  return {
    type: types.LOGIN_PENDING
  }
}

export function login(username, password) {
    return function(dispatch) {
        dispatch(loginPending());

        return request('/api/login', 'POST', {
          username: username,
          password: password
        })
        .then(response => {
          dispatch(loginSuccess(username, response));
        })
        .catch(error => {
          dispatch(loginError(error));
        })
    }
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
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

export function createAccountSuccess(username, token) {
  localStorage.setItem('token', token);
  localStorage.setItem('username', username);

  return {
    type: types.CREATE_ACCOUNT_SUCCESS,
    payload: {
      username: username,
      token: token
    }
  }
}

export function createAccountFailure(error) {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  return {
    type: types.CREATE_ACCOUNT_ERROR,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function createAccountPending() {
  return {
    type: types.CREATE_ACCOUNT_PENDING
  }
}

export function createAccount(username, password, redirect="/recipes") {
    return function(dispatch) {
        dispatch(createAccountPending());
        return request('/users', {
          username: username,
          password: password
        })
        .then(response => {
          dispatch(createAccountSuccess(response.user.username, response.token));
          dispatch(push(redirect));
        })
        .catch(error => {
            dispatch(createAccountFailure(error));
        })
    }
}
