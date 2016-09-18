import React, { Component } from 'react';
import {Link} from 'react-router';
import AuthModal from './AuthModal';
import styles from './Header.css';

export default class Header extends Component {

  constructor() {
    super();
  }

  onShowLogin = (e) => {
    e.preventDefault();
    this.props.actions.showLoginDialog();
  }

  onShowCreateAccount = (e) => {
    e.preventDefault();
    this.props.actions.showCreateAccountDialog();
  }


  onLogout = (e) => {
    e.preventDefault();
    this.props.actions.logout();
  }

  getAuthSection() {

    if(this.props.auth.token) {
      return (
        <div className={styles.authSection}>
          {this.props.auth.username} {' '}
          <a href="#" onClick={this.onLogout}>Logout</a>
        </div>
      )
    } else {
      return (
        <div className={styles.authSection}>
          <a href="#" onClick={this.onShowLogin}>Login</a>
          <a href="#" onClick={this.onShowCreateAccount}>Create Account</a>
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
        <AuthModal auth={this.props.auth} actions={this.props.actions} />
      </div>
    )
  }
}
