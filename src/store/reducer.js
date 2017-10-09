import { combineReducers } from 'redux'
import wordsReducer from './words/reducer'

export default combineReducers({
  words: wordsReducer
})
