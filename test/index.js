import React from 'react';
import ReactDOM from 'react-dom';
import ReactSuperTooltip from '../src';

ReactDOM.render(
  <div style={{ width: 1000, height: 1000, background: 'black' }}>
    <ReactSuperTooltip component='div' getContent={() => 'test'} style={{ height: 50, width: 50, background: 'blue' }}>
      <div></div>
    </ReactSuperTooltip>
  </div>,
  document.getElementById('root'));
