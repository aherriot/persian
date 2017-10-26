import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './common.css'

import Home from './Home'
import Words from './Words/redux/container'
import Study from './Study/redux/container'
import Profile from './Profile/redux/container'

class Routes extends Component {
  render() {
    return (
      <div className="Routes">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/words" exact component={Words} />
          <Route path="/quiz" exact component={Study} />
          <Route path="/profile" exact component={Profile} />

          <Route path="/about" exact render={() => <div>about</div>} />
          <Route path="/words/import" exact render={() => <div>import</div>} />
          <Route path="/words/export" exact render={() => <div>export</div>} />
        </Switch>
      </div>
    )
  }
}

export default Routes
