import React from 'react';
import { render } from 'react-dom';

import Main from './Main';

const root = document.getElementById('root')

// if (__DEV__) {
  const RedBox = require('redbox-react').default

  try {
    render(<Main />, root);
  } catch (e) {
    render(<RedBox error={e} />, root);
  }

// } else {
//   render(<Main />, root);
// }
