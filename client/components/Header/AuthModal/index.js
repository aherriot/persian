import React, { Component } from 'react';
import Modal from 'react-modal';
import constants from '../../../constants/constants'
import Login from './Login';

class AuthModal extends Component {

  render() {
    return (
      <Modal
        isOpen={this.props.auth.showAuthDialog}
        onRequestClose={this.props.actions.hideAuthDialog}>

        {this.props.auth.screen === constants.LOGIN &&
          <Login {...this.props}/>
        }

        {this.props.auth.screen === constants.CREATE_ACCOUNT &&
          <div>create account</div>
        }

        {this.props.auth.screen === constants.FORGOT &&
          <div>forgot account</div>
        }

      </Modal>
    )
  }
}

export default AuthModal
