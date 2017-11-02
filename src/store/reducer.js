import { combineReducers } from 'redux'
import wordsReducer from './words/reducer'
import scoresReducer from './scores/reducer'
import authReducer from './auth/reducer'

import appReducer from './app/reducer'
import wordsRouteReducer from 'routes/Words/redux/reducer'
import studyRouteReducer from 'routes/Study/redux/reducer'

export default combineReducers({
  data: combineReducers({
    words: wordsReducer,
    scores: scoresReducer,
    auth: authReducer
  }),
  app: appReducer,
  routes: combineReducers({
    words: wordsRouteReducer,
    study: studyRouteReducer
  })
})
