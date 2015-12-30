import * as types from '../constants/ActionTypes';

let nextId = 1;
const defaultState = [
  {id: 0, english: 'banana'}
];

export default function words(state = defaultState, action) {
  switch(action.type) {
    case types.ADD_WORD:
      return [...state, {
        id: nextId++,
        english: action.payload.english
      }];
    case types.EDIT_WORD:
      return state.map((word) => {
        if(action.payload.id === word.id) {
          return Object.assign({}, word, { english: action.payload.english });
        }
        return word;
      });
    case types.DELETE_WORD:
      return state.filter((word) => word.id != action.payload.id);
    default:
      return state;
  }
}
