import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import store from './store';

let DevTools;
if (process.env.NODE_ENV === 'production') {
  DevTools = '';
} else {
  DevTools = require('./containers/DevTools');
  DevTools = <DevTools />;
}

ReactDOM.render(
  <Provider store={store}>
    <div className="test">
      <Router history={browserHistory}>
        <Route path="/" component={require('./components/App')}>
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
      {DevTools}
    </div>
  </Provider>,
  document.getElementById('root')
);
