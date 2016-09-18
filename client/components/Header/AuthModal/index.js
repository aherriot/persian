import React, { Component } from 'react';
import Modal from 'react-modal';
import constants from '../../../constants/constants'

class AuthModal extends Component {

  onLogout = (e) => {
    e.preventDefault();
    this.props.actions.logout();
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.actions.login(this.refs.username.value, this.refs.password.value);
  }

  render() {
    return (
      <Modal
        isOpen={this.props.auth.showAuthDialog}
        onRequestClose={this.props.actions.hideAuthDialog}>

        {this.props.auth.screen === constants.LOGIN &&
          <form onSubmit={this.onSubmit}>
            {/* <div>{this.props.auth}</div> */}
            <input type="text" ref="username" placeholder="username"/>
            <input type="password" ref="password" placeholder="password"/>
            <input type="submit" value="Login"/>
          </form>
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
