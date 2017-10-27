import React, { Component } from 'react'
import Modal from 'react-modal'

import LoginForm from './LoginForm'
import CreateAccountForm from './CreateAccountForm'

class AuthModal extends Component {
  render() {
    const { auth, actions } = this.props

    const form = auth.showingCreateAccount ? (
      <CreateAccountForm auth={auth} actions={actions} />
    ) : (
      <LoginForm auth={auth} actions={actions} />
    )

    return (
      <Modal
        isOpen={auth.open}
        onRequestClose={actions.closeAuthDialog}
        className="ReactModal__Content"
        overlayClassName="ReactModal__Overlay">
        {form}
      </Modal>
    )
  }
}

export default AuthModal
