import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store';

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

export default () => (
  <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={require('./components/App').default}>
          <IndexRoute component={require('./containers/WordListContainer').default} />
          <Route path="/words" component={require('./components/Words/Words').default}>
            <IndexRoute component={require('./containers/WordListContainer').default} />
            <Route path="import" component={require('./containers/ImportContainer').default} />
            <Route path="export" component={require('./containers/ExportContainer').default} />
          </Route>
          <Route path="/quiz" component={require('./containers/QuizContainer').default} />
          
          <Route path="*" component={require('./components/NoMatch').default}/>
        </Route>
      </Router>
  </Provider>
)
