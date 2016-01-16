import * as types from '../constants/actionTypes';
import * as status from '../constants/actionStatus';

let nextId = 1000;

const defaultState = {
  loading: false,
  list: [
    {id: 0, english: 'beforeLoad'}
  ],
  error: {}
};

function fetchReducer(state, action) {
  switch(action.status) {
    case status.PENDING:
      return {
        ...state,
        list: [],
        loading: true
      };
    case status.SUCCESS:
      return {
        ...state,
        list: action.payload.words,
        loading: false
      };
    case status.FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false
      };
    default:
      return state;
  }
}

function addReducer(state, action) {
  switch(action.status) {
    case status.PENDING:
      return {
        ...state,
        list: [...state.list, {id: nextId++, english: action.payload.word.english}],
        loading: true
      };

    case status.SUCCESS:
      let words = state.list.map((word) => {
        if(action.payload.word.id === word.id) {
          return {...word, id: action.payload.word.id};
        }
        return word;
      });

      return {
        ...state,
        list: words,
        loading: false
      };

    case status.FAILURE:
      let revertedWords = state.list.filter((word) => word.id != (nextId-1));
      return {
        ...state,
        list: revertedWords,
        loading: false,
        error: {message: 'Failed to delete word'}
      };

    default:
      return state;
  }
}

function editReducer(state, action) {
  switch(action.status) {
    case status.PENDING:
      let words = state.list.map((word) => {
        if(action.payload.word.id === word.id) {
          return {...word, english: action.payload.word.english};
        }
        return word;
      });
      return {...state, list: words, loading: true};
    case status.SUCCESS:
      return {...state, loading: false};
    case status.FAILURE:
      return {...state, error: {message: action.error}, loading: false};
    default:
      return state;
  }
}


function deleteReducer(state, action) {
  switch(action.status) {
    case status.PENDING:
      let newWords = state.list.filter((word) => word.id != action.payload.word.id);
      return {...state, list: newWords, loading: true};
    case status.SUCCESS:
      return {...state, loading: false};
    case status.FAILURE:
      return {...state, error: {message: action.error}, loading: false};
    default:
      return state;
  }
}

export default function words(state = defaultState, action) {
  switch(action.type) {
    case types.FETCH_WORDS:
      return fetchReducer(state, action);
    case types.ADD_WORD:
      return addReducer(state, action);
    case types.EDIT_WORD:
      return editReducer(state, action);
    case types.DELETE_WORD:
      return deleteReducer(state, action);
    default:
      return state;
  }
}
