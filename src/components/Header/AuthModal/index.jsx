import React, { Component } from 'react'
import Modal from 'react-modal'

import AuthForm from './AuthForm'

class AuthModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.auth.open}
        onRequestClose={this.props.actions.closeAuthDialog}>
        <AuthForm auth={this.props.auth} actions={this.props.actions} />
      </Modal>
    )
  }
}

export default AuthModal
