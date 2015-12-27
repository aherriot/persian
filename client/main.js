import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';


import App from './components/App';
import Users from './components/Users';
import Recipes from './components/Recipes';
import NoMatch from './components/NoMatch';

ReactDOM.render((
  <Router history={createBrowserHistory()}>
   <Route path="/" component={App}>
     <Route path="/users" component={Users} />
     <Route path="/recipes" component={Recipes} />

     <Route path="*" component={NoMatch}/>
   </Route>
 </Router>
), document.getElementById('root'));
