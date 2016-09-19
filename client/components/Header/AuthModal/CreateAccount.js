import React, {Component} from 'react';

// if (!values.email) {
//   errors.email = 'Required'
// } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//   errors.email = 'Invalid email address'
// }

// if (!values.username) {
//   errors.username = 'Enter username'
// } else if (values.username.length < 3) {
//   errors.username = 'Must be at least 3 characters'
// } else if (values.username.length > 10) {
//   errors.username = 'Must be 10 characters or less'
// }

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
          <input type="email" ref="email" placeholder="email" />
          <input type="password" ref="password" placeholder="password" />
          <input type="password" ref="password2" placeholder="password" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default CreateAccount;
