import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

import user from './user.js';
import words from './words.js';
import quiz from './quiz.js';

export default combineReducers({
  routing: routeReducer,
  user: user,
  words: words
});
