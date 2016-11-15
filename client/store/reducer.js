import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth/reducer';
import words from './words/reducer';
import scores from './scores/reducer';
import quiz from './quiz/reducer';
import leaderboard from './leaderboard/reducer';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,

  auth: auth,
  words: words,
  scores: scores,
  quiz: quiz,
  leaderboard: leaderboard
});
