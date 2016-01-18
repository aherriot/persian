import * as types from '../constants/actionTypes';

const defaultState = {
  currentWord: 'before select'
};

export default function words(state = defaultState, action) {
  switch (action.type) {
  case types.SELECT_WORD:
    return {...state, currentWord: 'selected word'};
  default:
    return state;
  }
}
