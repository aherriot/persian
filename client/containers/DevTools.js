import React from 'react';

import { createDevTools } from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';

// import FilterableLogMonitor from 'redux-devtools-filterable-log-monitor';
import LogMonitor from 'redux-devtools-log-monitor';


const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'>
    <LogMonitor select={(state) => {
        return {list: state.words.list, quiz: state.quiz};
      }}/>
  </DockMonitor>
);

export default DevTools;
