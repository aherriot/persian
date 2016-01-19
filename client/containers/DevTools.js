import React from 'react';

import { createDevTools } from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';

// import FilterableLogMonitor from 'redux-devtools-filterable-log-monitor';
import LogMonitor from 'redux-devtools-log-monitor';


const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'>
    {/*<FilterableLogMonitor />*/}
    <LogMonitor />
  </DockMonitor>
);

export default DevTools;
