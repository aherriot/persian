import * as types from '../constants/actionTypes';

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
  loading: false,
  hasLoaded: false,
  list: [],
  error: {}
};

export default function wordsReducer(state = defaultState, action) {
  switch (action.type) {
  case types.FETCH_WORDS_PENDING:
    return {
      ...state,
      list: [],
      loading: true,
      hasLoaded: false
    };
  case types.FETCH_WORDS_SUCCESS:
    return {
      ...state,
      list: action.payload.words,
      loading: false,
      hasLoaded: true
    };
  case types.FETCH_WORDS_ERROR:
    return {
      ...state,
      error: action.payload.error,
      loading: false,
      hasLoaded: false
    };
  case types.ADD_WORD_PENDING:
    return {...state, loading: true};
  case types.ADD_WORD_SUCCESS:
    return {
      ...state,
      list: [...state.list, action.payload.word],
      loading: false
    };
  case types.ADD_WORD_ERROR:
    return {
      ...state,
      loading: false,
      error: {message: 'Failed to delete word'}
    };

  case types.BULK_ADD_WORDS_SUCCESS:

    return {
      ...state,
      list: [...state.list, ...action.payload.words]
    };
  case types.EDIT_WORD_PENDING:
    return {...state, loading: true};
  case types.EDIT_WORD_SUCCESS:
    let newWords = state.list.map((word) => {
      if (action.payload.word._id === word._id) {
        return {...word, ...action.payload.word};
      } else {
        return word;
      }
    });
    return {...state, list: newWords, loading: false};
  case types.EDIT_WORD_ERROR:
    return {...state, error: {message: action.error}, loading: false};
  case types.DELETE_WORD_PENDING:
    newWords = state.list.filter((word) => word._id !== action.payload.word._id);
    return {...state, list: newWords, loading: true};
  case types.DELETE_WORD_SUCCESS:
    return {...state, loading: false};
  case types.DELETE_WORD_ERROR:
    return {...state, error: {message: action.error}, loading: false};
  default:
    return state;
  }
}
