import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import words from './words';
import scores from './scores';
import quiz from './quiz';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,

  auth: auth,
  words: words,
  scores: scores,
  quiz: quiz,
});
