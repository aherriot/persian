import React, {Component} from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log('login!');
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
