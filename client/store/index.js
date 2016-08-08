import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {browserHistory} from 'react-router';
import {syncHistory} from 'redux-simple-router';

import reducers from '../reducers';

const reduxRouterMiddleware = syncHistory(browserHistory);

let store;
let middleware = [ thunk, reduxRouterMiddleware];

if (process.env.NODE_ENV === 'production') {

  let createStoreWithMiddleware = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  store = createStoreWithMiddleware(reducers);

} else {

  let createStoreWithMiddleware = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  store = createStoreWithMiddleware(reducers);

  reduxRouterMiddleware.listenForReplays(store);
}

export default store;
