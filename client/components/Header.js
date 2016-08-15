import React, { Component } from 'react';
import {Link} from 'react-router';

export default class Header extends Component {

  constructor() {
    super();

    this.state = {
      promptForLogin: false
    };
  }

  onLogin = (e) => {
    e.preventDefault();
    this.setState({promptForLogin: true});
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.actions.login(this.refs.username.value, this.refs.password.value);
  }

  getAuthSection() {

    if(this.props.auth.username) {
      return (
        <span>{this.props.auth.username}</span>
      )
    } else if(this.state.promptForLogin) {
      return (
        <span>
          <form onSubmit={this.onSubmit}>
            <input type="text" ref="username" placeholder="username"/>
            <input type="password" ref="password" placeholder="password"/>
            <input type="submit" value="Login"/>
          </form>
        </span>
      )
    } else {
      return (
        <span>
          <a href="#" onClick={this.onLogin}>Login</a>
        </span>
      )
    }
  }
  render() {
    return (
      <div>
        <h1>Persian Flashcards</h1>

        <Link to="/words">Words</Link>
        <Link to="/quiz">Quiz</Link>

        {this.getAuthSection()}
      </div>
    )
  }
}
