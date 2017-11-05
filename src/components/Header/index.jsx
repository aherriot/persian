import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as authActions from 'store/auth/actions'

import AuthModal from './AuthModal'

import './Header.css'
import Logo from '../Logo'

function Header({ title, auth, actions }) {
  return (
    <header className="Header">
      <div className="left">
        <Logo isLink />
        <div className="title">{title}</div>
      </div>
      <div className="right">
        {auth.username ? (
          <Link role="button" type="button" to="/profile">
            {auth.username}
          </Link>
        ) : (
          <button
            type="button"
            className="button"
            onClick={actions.openAuthDialog}>
            Login
          </button>
        )}
      </div>
      <AuthModal auth={auth} actions={actions} />
    </header>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.data.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...authActions
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
