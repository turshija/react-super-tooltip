import React from 'react';
import ReactDOM from 'react-dom';
import ReactSuperTooltip from '../src';

ReactDOM.render(
  <div style={{ width: 1000, height: 1000, background: 'black' }}>
    <ReactSuperTooltip
      component='div'
      trigger='hover'
      onShow={() => console.log('show')}
      getContent={() => 'test test test test'}
      style={{ height: 50, width: 50, background: 'blue', marginTop: 200, marginLeft: 200 }}>
      <div/>
    </ReactSuperTooltip>
  </div>,
  document.getElementById('root'));
