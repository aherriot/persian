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
    <div>
      <Router history={browserHistory}>
        <Route path="/" component={require('./components/App')}>
          <Route path="/users" component={require('./components/Users')} />
          <Route path="/words" component={require('./containers/WordListContainer')} />
          <Route path="/quiz" component={require('./containers/QuizContainer')} />
          <Route path="*" component={require('./components/NoMatch')}/>
        </Route>
      </Router>
      {DevTools}
    </div>
  </Provider>,
  document.getElementById('root')
);
