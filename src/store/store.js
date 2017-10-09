import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'

import rootReducer from './reducer'

export const history = createHistory()

const middleware = [thunk]

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
