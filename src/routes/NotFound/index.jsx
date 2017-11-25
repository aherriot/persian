import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from 'components/Header'

import './NotFound.css'

export default class NotFound extends Component {
  render() {
    return (
      <div className="NotFound">
        <Header title="Page Not Found" />
        <div className="NotFound__content">
          <h3>404 - Page not found</h3>
        </div>
        <p>
          You seem to be lost. Go back{' '}
          <Link className="link" to="/">
            home
          </Link>.
        </p>
      </div>
    )
  }
}
