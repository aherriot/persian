import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './reducer';


export default function configureStore(history) {

  const enhancer = compose(
    applyMiddleware(thunk, routerMiddleware(history)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );

  const store = createStore(rootReducer, undefined, enhancer);

  if (module.hot) {
    module.hot.accept('./reducer', () =>
      store.replaceReducer(require('./reducer').default)
    );
  }

  return store;
}
