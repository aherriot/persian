import React from 'react'
import {Link} from 'react-router';

export default (props) =>
  <div>
    <div>
      <Link to="/words">Words</Link>{' '}
      <Link to="/words/import">Import</Link>{' '}
      <Link to="/words/export">Export</Link>
    </div>
    {props.children}
  </div>
