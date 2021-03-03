import React from 'react';
import ReactDOM from 'react-dom';
import ReactSuperTooltip from '../src';

let tooltipRef;

ReactDOM.render(
  <>
    <div>
      <button onClick={() => setTimeout(() => tooltipRef.show(), 0)}>show tooltip</button>
      <button onClick={() => tooltipRef.hide()}>hide tooltip</button>
    </div>

    <div style={{ width: 1000, height: 1000, background: 'black', position: 'relative' }}>
      <div style={{ width: 300, height: 300, marginTop: 100, marginLeft: 100, background: 'green', position: 'relative' }} id='container'>
        <ReactSuperTooltip
          component='div'
          trigger='hover'
          ref={(ref) => tooltipRef = ref}
          bounds='#container'
          keepInBounds
          onShow={() => console.log('show')}
          content='test test test test'
          tooltipClassName='tooltip-class'
          tooltipContainerClassName='root-class'
          style={{ height: 50, width: 50, background: 'blue', position: 'absolute', top: 200, left: 200, whiteSpace: 'nowrap' }}>
          <div/>
        </ReactSuperTooltip>
      </div>
    </div>
  </>,
  document.getElementById('root'));
