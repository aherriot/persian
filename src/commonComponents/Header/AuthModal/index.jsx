import React, { PureComponent } from 'react'

import Modal from 'commonComponents/Modal'
import LoginForm from './LoginForm'
import CreateAccountForm from './CreateAccountForm'

class AuthModal extends PureComponent {
  render() {
    const { auth, actions } = this.props

    let title, form
    if (auth.open) {
      if (auth.showCreateAccount) {
        title = 'Create Account'
        form = <CreateAccountForm auth={auth} actions={actions} />
      } else {
        title = 'Login'
        form = <LoginForm auth={auth} actions={actions} />
      }
      return (
        <Modal open={auth.open} onClose={actions.closeAuthModal} title={title}>
          {form}
        </Modal>
      )
    } else {
      return null
    }
  }
}

export default AuthModal
