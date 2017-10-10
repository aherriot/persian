import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './common.css'

import Home from './views/Home'
import Words from './views/Words'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact render={() => <div>about</div>} />
          <Route path="/words" exact component={Words} />
          <Route path="/words/import" exact render={() => <div>import</div>} />
          <Route path="/words/export" exact render={() => <div>export</div>} />
          <Route path="/quiz" exact render={() => <div>Quiz</div>} />
        </Switch>
      </div>
    )
  }
}

export default App
