import React, {Component} from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import styles from './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <HeaderContainer />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element
};
