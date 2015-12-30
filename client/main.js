import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';

import store from './store';

import App from './components/App';
import Users from './components/Users';
import Recipes from './components/Recipes';

import WordListContainer from './containers/WordListContainer';

import NoMatch from './components/NoMatch';

ReactDOM.render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Route path="/" component={App}>
        <Route path="/users" component={Users} />
        <Route path="/recipes" component={Recipes} />
        <Route path="/words" component={WordListContainer} />

        <Route path="*" component={NoMatch}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
