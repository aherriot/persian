import * as types from '../constants/actionTypes';

const defaultState = {
  currentWord: 'before select'
};

export default function words(state = defaultState, action, words) {
  switch (action.type) {
  case types.SELECT_WORD:
    let word;
    if(words.length) {
      word = words[Math.floor(Math.random()*words.length)].english;
    } else {
      word = 'No words';
    }
    return {...state, currentWord: word};
  default:
    return state;
  }
}
