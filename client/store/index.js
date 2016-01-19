import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {browserHistory} from 'react-router';
import {syncHistory} from 'redux-simple-router';

import reducers from '../reducers';

const reduxRouterMiddleware = syncHistory(browserHistory);

let store;

if (process.env.NODE_ENV === 'production') {

  let createStoreWithMiddleware = compose(
    applyMiddleware(thunk, reduxRouterMiddleware)
  )(createStore);

  store = createStoreWithMiddleware(reducers);

} else {

  let createStoreWithMiddleware = compose(
    applyMiddleware(thunk, reduxRouterMiddleware),
    require('../containers/DevTools').instrument()
  )(createStore);

  store = createStoreWithMiddleware(reducers);

  reduxRouterMiddleware.listenForReplays(store);
}

export default store;
