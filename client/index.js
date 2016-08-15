import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store';

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <div className="test">
      <Router history={history}>
        <Route path="/" component={require('./components/App')}>
          <IndexRoute component={require('./containers/WordListContainer')} />
          <Route path="/login" component={require('./containers/LoginContainer')} />
          <Route path="/createAccount" component={require('./containers/CreateAccountContainer')} />

          <Route path="/words" component={require('./containers/WordListContainer')} />
          <Route path="/words/import" component={require('./containers/ImportContainer')} />
          <Route path="/words/export" component={require('./containers/ExportContainer')} />

          <Route path="/quiz" component={require('./containers/QuizContainer')} />
          <Route path="/quiz/options" component={require('./containers/QuizContainer')} />


          <Route path="*" component={require('./components/NoMatch')}/>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
);
