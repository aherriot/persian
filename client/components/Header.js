import React, { Component } from 'react';
import {Link} from 'react-router';

import styles from './Header.css';

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

  onLogout = (e) => {
    e.preventDefault();
    this.props.actions.logout();
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.actions.login(this.refs.username.value, this.refs.password.value);
  }

  getAuthSection() {

    if(this.props.auth.username) {
      return (
        <div className={styles.authSection}>

          {this.props.auth.username} {' '}
          <a href="#" onClick={this.onLogout}>Logout</a>
        </div>
      )
    } else if(this.state.promptForLogin) {
      return (
        <div className={styles.authSection}>
          <form onSubmit={this.onSubmit}>
            <input type="text" ref="username" placeholder="username"/>
            <input type="password" ref="password" placeholder="password"/>
            <input type="submit" value="Login"/>
          </form>
        </div>
      )
    } else {
      return (
        <div className={styles.authSection}>
          <a href="#" onClick={this.onLogin}>Login</a>
        </div>
      )
    }
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>Persian Flashcards</div>

        <div className={styles.linkSection}>

          <Link to="/words"
            className={styles.link}
            activeClassName={styles.activeLink}>
            Words
          </Link>
          <Link to="/quiz"
            className={styles.link}
            activeClassName={styles.activeLink}>
            Quiz
          </Link>
        </div>

        {this.getAuthSection()}
      </div>
    )
  }
}
