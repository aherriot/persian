import { combineReducers } from 'redux'

import appReducer from './app/reducer'

import wordsReducer from './words/reducer'
import scoresReducer from './scores/reducer'
import authReducer from './auth/reducer'

import wordsRouteReducer from 'routes/Words/redux/reducer'
import studyRouteReducer from 'routes/Study/redux/reducer'
import profileRouteReducer from 'routes/Profile/redux/reducer'

export default combineReducers({
  // general app state (like global error messages)
  app: appReducer,

  // data from APIs
  data: combineReducers({
    words: wordsReducer,
    scores: scoresReducer,
    auth: authReducer
  }),

  // view state for specific routes
  routes: combineReducers({
    words: wordsRouteReducer,
    study: studyRouteReducer,
    profile: profileRouteReducer
  })
})
