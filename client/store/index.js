import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';


export default function configureStore(history) {

  const enhancer = compose(
    applyMiddleware(thunk, routerMiddleware(history)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );

  const store = createStore(rootReducer, undefined, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}


//
// let store;
// let middleware = [ thunk, reduxRouterMiddleware];
//
// if (process.env.NODE_ENV === 'production') {
//
//   let createStoreWithMiddleware = compose(
//     applyMiddleware(...middleware),
//     window.devToolsExtension ? window.devToolsExtension() : f => f
//   )(createStore);
//
//   store = createStoreWithMiddleware(reducers);
//
// } else {
//
//   let createStoreWithMiddleware = compose(
//     applyMiddleware(...middleware),
//     window.devToolsExtension ? window.devToolsExtension() : f => f
//   )(createStore);
//
//   store = createStoreWithMiddleware(reducers);
//
//   reduxRouterMiddleware.listenForReplays(store);
// }
//
// export default store;
