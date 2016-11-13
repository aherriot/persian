import * as types from './constants';
import constants from '../../constants/constants';

const defaultState = {
  status: constants.INIT,
  byId: {},
  error: {}
};

export default function wordsReducer(state = defaultState, action) {
  switch (action.type) {
  case types.FETCH_WORDS_PENDING:
    return {
      ...state,
      byId: {},
      status: constants.PENDING
    };
  case types.FETCH_WORDS_SUCCESS:

    const byId = action.payload.response.reduce((acc, word, index) => {
      acc[word._id] = word;
      return acc;
    }, {});

    return {
      ...state,
      byId: byId,
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
      // status: constants.PENDING
    };
  case types.ADD_WORD_SUCCESS:

    let newWord = action.payload.response;
    return {
      ...state,
      byId: {...state.byId, [newWord._id]: newWord},
      status: constants.SUCCESS
    };
  case types.ADD_WORD_ERROR:
    return {
      ...state,
      status: constants.ERROR,
      error: {message: 'Failed to delete word'}
    };

  case types.BULK_ADD_WORDS_SUCCESS:

    const newByIds = action.payload.response.reduce((acc, word, index) => {
      acc[word._id] = word;
      return acc;
    }, {});

    return {
      ...state,
      byId: {...state.byId, ...newByIds},
      status: constants.SUCCESS
    };
  case types.EDIT_WORD_PENDING:
    return {
      ...state,
      status: constants.SUCCESS
    };

  case types.EDIT_WORD_SUCCESS:

    const editedWord = action.payload.response;
    return {...state,
      byId: {...state.byId, [editedWord._id]: editedWord},
      status: constants.SUCCESS
    };
  case types.EDIT_WORD_ERROR:
    return {...state,
      error: {message: action.payload.error},
      status: constants.ERROR
    };

  case types.DELETE_WORD_PENDING:
    return {...state,
      // status: constants.PENDING
    };
  case types.DELETE_WORD_SUCCESS:
    const newWords = {...state.byId};
    delete newWords[action.payload.response._id];

    return {...state,
      byId: newWords,
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
