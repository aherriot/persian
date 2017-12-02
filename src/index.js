import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import store, { history } from './store/store'
import ReactGA from 'react-ga'

import Routes from './routes/Routes'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-52203908-2')
  ReactGA.pageview(window.location.pathname + window.location.search)
}
