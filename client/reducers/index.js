import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

import user from './user';
import words from './words';
import quiz from './quiz';


const rootReducer = (state = {}, action) => {
  return {
    routing: routeReducer(state.routing, action),
    user: user(state.user, action),
    words: words(state.words, action),
    quiz: quiz(state.quiz, action, state.words)
  };
}

export default rootReducer;
