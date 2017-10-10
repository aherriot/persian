import { combineReducers } from 'redux'
import wordsReducer from './words/reducer'

export default combineReducers({
  data: combineReducers({
    words: wordsReducer
  })
})
