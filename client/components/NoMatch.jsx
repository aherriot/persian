import React, {Component} from 'react';
import {Link} from 'react-router';

export default class NoMatch extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <p>404 File Not Found.</p>
        <p><Link to="/">Home</Link></p>
      </div>
    );
  }
}
