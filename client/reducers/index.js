import { combineReducers } from 'redux';

import user from './user.js';
import words from './words.js';
import quiz from './quiz.js';

export default combineReducers({
  user: user,
  words: words
});
