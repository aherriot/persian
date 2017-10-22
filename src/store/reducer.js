import { combineReducers } from 'redux'
import wordsReducer from './words/reducer'
// import scoresReducer from './scores/reducer'
import authReducer from './auth/reducer'

import wordsRouteReducer from 'routes/Words/redux/reducer'

export default combineReducers({
  data: combineReducers({
    words: wordsReducer,
    // scores: scoresReducer,
    auth: authReducer
  }),
  routes: combineReducers({
    words: wordsRouteReducer
    // study: studyReducer
  })
})
