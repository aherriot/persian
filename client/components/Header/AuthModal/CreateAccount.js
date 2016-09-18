import React, {Component} from 'react';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
  }

  onCreateAccount = (e) => {
    e.preventDefault();
    this.props.actions.login(this.refs.username.value, this.refs.password.value);
    return false;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onCreateAccount}>
          <input type="text" ref="username" placeholder="username" />
          <input type="password" ref="password" placeholder="password" />
          <input type="password" ref="password2" placeholder="password" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default CreateAccount;
