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
  byIds: {},
  error: {}
};

export default function wordsReducer(state = defaultState, action) {
  switch (action.type) {
  case types.FETCH_WORDS_PENDING:
    return {
      ...state,
      byIds: {},
      status: constants.PENDING
    };
  case types.FETCH_WORDS_SUCCESS:

    const byIds = action.payload.words.reduce((acc, word, index) => {
      acc[word._id] = word;
      return acc;
    }, {});

    return {
      ...state,
      byIds: byIds,
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

    let newWord = action.payload.word;
    return {
      ...state,
      byIds: {...state.byIds, [newWord._id]: newWord},
      status: constants.SUCCESS
    };
  case types.ADD_WORD_ERROR:
    return {
      ...state,
      status: constants.ERROR,
      error: {message: 'Failed to delete word'}
    };

  case types.BULK_ADD_WORDS_SUCCESS:

    const newByIds = action.payload.words.reduce((acc, word, index) => {
      acc[word._id] = word;
      return acc;
    }, {});

    return {
      ...state,
      byIds: {...state.byIds, ...newByIds},
      status: constants.SUCCESS
    };
  case types.EDIT_WORD_PENDING:
    return {
      ...state,
      status: constants.SUCCESS
    };

  case types.MARK_CORRECT_PENDING:
  case types.MARK_WRONG_PENDING:

    //TODO update the word bucket in here, so selection algorithm picks the right word immediately
    // otherwise, word list has wrong score for word until server responds after editing word.
    return {
      ...state
    }


  case types.EDIT_WORD_SUCCESS:
  case types.MARK_CORRECT_SUCCESS:
  case types.MARK_WRONG_SUCCESS:


    const editedWord = action.payload.word;
    return {...state,
      byIds: {...state.byIds, [editedWord._id]: editedWord},
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
    const newWords = {...state.byIds};
    delete newWords[action.payload.word._id];

    return {...state,
      byIds: newWords,
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
