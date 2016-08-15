import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import words from './words';
import quiz from './quiz';


const rootReducer = (state = {}, action) => {
  return {
    routing: routerReducer(state.routing, action),
    auth: auth(state.auth, action),
    words: words(state.words, action),
    quiz: quiz(state.quiz, action)
  };
}

export default rootReducer;
