import React from 'react';
import {Link} from 'react-router';

export default class Users extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>Users</h2>
        <Link to="/recipes">recipes</Link>
      </div>
    );
  }
}
