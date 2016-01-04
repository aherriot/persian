import { combineReducers } from 'redux'

import words from './words.js';
import user from './user.js';

export default combineReducers({
  words,
  user
});
