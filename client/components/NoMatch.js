import React from 'react';
import {Link} from 'react-router';

export default class NoMatch extends React.Component {
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
