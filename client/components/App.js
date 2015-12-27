import React, {Component} from 'react';
// import styles from './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }
  render() {
    return (
      <div>
        <h1>App</h1>
        <p>this is the app.</p>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element
};
