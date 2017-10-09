import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import './common.css'

import Home from './views/Home'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ul>
          <li>
            <Link to="/">Home!</Link>
          </li>
          <li>
            <Link to="/words">words</Link>
          </li>
          <li>
            <Link to="/words/import">import</Link>
          </li>
          <li>
            <Link to="/quiz">quiz</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact render={() => <div>about</div>} />
          <Route path="/words" exact render={() => <div>Words</div>} />
          <Route path="/words/import" exact render={() => <div>import</div>} />
          <Route path="/words/export" exact render={() => <div>export</div>} />
          <Route path="/quiz" exact render={() => <div>Quiz</div>} />
        </Switch>
      </div>
    )
  }
}

export default App
