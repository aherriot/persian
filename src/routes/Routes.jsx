import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './common.css'

import Home from './Home'
import Words from './Words/redux/container'
import Suggestions from './Suggestions/redux/container'
import Study from './Study/redux/container'
import Leaderboard from './Leaderboard/redux/container'
import Profile from './Profile/redux/container'
import Export from './Export/redux/container'
import Import from './Import/redux/container'
import NotFound from './NotFound'

import Alert from 'commonComponents/Alert'

class Routes extends Component {
  render() {
    return (
      <div className="Routes">
        <Switch>
          <Route path="/" exact component={Home} />

          <Route path="/words" exact component={Words} />
          <Route path="/words/suggestions" exact component={Suggestions} />
          <Route path="/words/import" exact component={Import} />
          <Route path="/words/export" exact component={Export} />

          <Route path="/quiz" exact component={Study} />
          <Route path="/leaderboard" exact component={Leaderboard} />

          <Route path="/profile" exact component={Profile} />
          <Route path="/about" exact render={() => <div>about</div>} />
          <Route component={NotFound} />
        </Switch>
        <Alert />
      </div>
    )
  }
}

export default Routes
