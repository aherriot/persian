import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './common.css'

import Home from './Home'
import Words from './Words/redux/container'
import Study from './Study/redux/container'

class Routes extends Component {
  render() {
    return (
      <div className="Routes">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact render={() => <div>about</div>} />
          <Route path="/words" exact component={Words} />
          <Route path="/words/import" exact render={() => <div>import</div>} />
          <Route path="/words/export" exact render={() => <div>export</div>} />
          <Route path="/quiz" exact component={Study} />
        </Switch>
      </div>
    )
  }
}

export default Routes
