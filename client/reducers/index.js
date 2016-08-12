import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

import auth from './auth';
import words from './words';
import quiz from './quiz';


const rootReducer = (state = {}, action) => {
  return {
    routing: routeReducer(state.routing, action),
    auth: auth(state.auth, action),
    words: words(state.words, action),
    quiz: quiz(state.quiz, action)
  };
}

export default rootReducer;
