import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';

import store from './store';

import App from './components/App';
import Users from './components/Users';

import WordListContainer from './containers/WordListContainer';
import QuizContainer from './containers/QuizContainer';

import NoMatch from './components/NoMatch';

ReactDOM.render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Route path="/" component={App}>
        <Route path="/users" component={Users} />
        <Route path="/words" component={WordListContainer} />
        <Route path="/quiz" component={QuizContainer} />
        <Route path="*" component={NoMatch}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
