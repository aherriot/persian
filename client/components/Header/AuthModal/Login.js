import React, {Component} from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  onLogin = (e) => {
    e.preventDefault();
    console.log('login!');
    this.props.actions.login(this.refs.username.value, this.refs.password.value);
    return false;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onLogin}>
          <input type="text" ref="username" placeholder="username" />
          <input type="password" ref="password" placeholder="password" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Login;
