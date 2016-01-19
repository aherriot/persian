import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';

let createStoreWithMiddleware;

if (process.env.NODE_ENV === 'production') {

  createStoreWithMiddleware = compose(
    applyMiddleware(thunk)
  )(createStore);

} else {

  createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
    require('../containers/DevTools').instrument()
  )(createStore);

}

export default createStoreWithMiddleware(reducers);
