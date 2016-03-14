import React, {Component} from 'react';
import {Link} from 'react-router';
import styles from './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Persian Flashcards</h1>
        <p>
          <Link to="/words">Words</Link>{' '}
          <Link to="/quiz">Quiz</Link>
        </p>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element
};
