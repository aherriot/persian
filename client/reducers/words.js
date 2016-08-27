import * as types from '../constants/actionTypes';
import * as constants from '../constants/constants';


function editReducer(state, action) {
  switch (action.status) {

  default:
    return state;
  }
}


function deleteReducer(state, action) {
  switch (action.status) {

  default:
    return state;
  }
}

const defaultState = {
  status: constants.INIT,
  list: [],
  error: {}
};

export default function wordsReducer(state = defaultState, action) {
  switch (action.type) {
  case types.FETCH_WORDS_PENDING:
    return {
      ...state,
      list: [],
      status: constants.PENDING
    };
  case types.FETCH_WORDS_SUCCESS:
    return {
      ...state,
      list: action.payload.words,
      status: constants.SUCCESS
    };
  case types.FETCH_WORDS_ERROR:
    return {
      ...state,
      error: action.payload.error,
      status: constants.ERROR
    };
  case types.ADD_WORD_PENDING:
    return {...state,
      status: constants.PENDING
    };
  case types.ADD_WORD_SUCCESS:
    return {
      ...state,
      list: [...state.list, action.payload.word],
      status: constants.SUCCESS
    };
  case types.ADD_WORD_ERROR:
    return {
      ...state,
      status: constants.ERROR,
      error: {message: 'Failed to delete word'}
    };

  case types.BULK_ADD_WORDS_SUCCESS:

    return {
      ...state,
      list: [...state.list, ...action.payload.words],
      status: constants.SUCCESS
    };
  case types.EDIT_WORD_PENDING:
    return {
      ...state,
      status: constants.SUCCESS
    };
  case types.EDIT_WORD_SUCCESS:
  case types.MARK_CORRECT_SUCCESS:
  case types.MARK_WRONG_SUCCESS:
    let newWords = state.list.map((word) => {
      if (action.payload.word._id === word._id) {
        return {...word, ...action.payload.word};
      } else {
        return word;
      }
    });
    return {...state,
      list: newWords,
      status: constants.SUCCESS
    };
  case types.EDIT_WORD_ERROR:
    if(action.payload.error.response.status === 401) {
      return {...state,
        error: {message: 'Unauthorized'},
        status: constants.ERROR
      };
    } else {
      return {...state,
        error: {message: action.payload.error},
        status: constants.ERROR
      };
    }

  case types.DELETE_WORD_PENDING:
    newWords = state.list.filter((word) => word._id !== action.payload.word._id);
    return {...state,
      list: newWords,
      status: constants.SUCCESS
    };
  case types.DELETE_WORD_SUCCESS:
    return {...state,
      status: constants.SUCCESS
    };
  case types.DELETE_WORD_ERROR:
    return {...state,
      error: {message: action.error},
      status: constants.ERROR
    };
  default:
    return state;
  }
}
