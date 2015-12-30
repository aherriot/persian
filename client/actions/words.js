import * as types from '../constants/ActionTypes';

export function addWord(english) {
  return {
    type: types.ADD_WORD,
    payload: {
      english: english
    }
  };
}

export function deleteWord(id) {
  return {
    type: types.DELETE_WORD,
    payload: {
      id: id
    }
  };
}

export function editWord(id, english) {

  return {
    type: types.EDIT_WORD,
    payload: {
      id : id,
      english: english
    }
  }
}
