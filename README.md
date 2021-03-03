# react-super-tooltip
[![Version](http://img.shields.io/npm/v/react-super-tooltip.svg)](https://www.npmjs.org/package/react-super-tooltip)

## EXAMPLE

[TODO](https://www.google.com)

[Spott.ai - interactive videos and images](https://spott.ai)

## WHY ANOTHER TOOLTIP LIBRARY ?!

`react-super-tooltip` is made to be super simple to use, but still be very smart out of the box with default 
configuration. It can automatically position itself to be in the viewport by calculating the best position 
relative to your element (top, right, bottom, left or any 4 corners), and even when it finds perfect location 
it will additionally offset itself to find even better fit. 

## Installation

```sh
npm i react-super-tooltip
```

## Usage

1 . Import react-super-tooltip in your code

```js
import ReactSuperTooltip from 'react-super-tooltip'
```

2 . Wrap your element in `<ReactSuperTooltip>` component

```jsx
<ReactSuperTooltip>
  <button>Hover me</button>
</ReactSuperTooltip>
```

3 . That's it

## Options

* Each `<ReactSuperTooltip />` can have its own props which will override default behavior for that specific tooltip, for example `<ReactSuperTooltip trigger="click" />`

Name                |Type       |Default    |Description
|:---               |:---       |:---       |:---
content             |Node       |           |Tooltip content
trigger             |String     |hover      |How to trigger tooltip (Available: hover, click)
ignoreTrigger       |Bool       |false      |Tooltip can be opened only manually (by calling tooltipRef.show()), trigger is ignored
preferredPosition   |String     |right      |Define your preferred position that will be used if multiple positions are possible 
interactive         |Bool       |true       |Allow mouse events on the tooltip and keep it open when hovered
component           |Component  |`div`      |Choose container element
arrowSize           |Number     |6          |Tooltip arrow size
arrowColor          |String     |#fff       |Tooltip arrow color
offset              |Number     |0          |Number of pixels to offset tooltip away from the element
bounds              |String     |           |Selector or HTML element to be used as boundaries
keepInBounds        |Bool       |false      |Keep the tooltip inside the boundaries even if it covers the target element
onShow              |Function   |noop       |Callback function that will be called when tooltip is shown
onHide              |Function   |noop       |Callback function that will be called when tooltip is hidden

## Manually showing and hiding tooltips

### tooltipRef.show()

> Show the tooltip manually, for example:

```jsx
import ReactSuperTooltip from 'react-super-tooltip';

<ReactSuperTooltip ref={ref => this.tooltipRef = ref}>
  <button>I'm a button</button>
</ReactSuperTooltip>

<button onClick={() => { this.tooltipRef.show() }}>Show tooltip</button>
```
### tooltipRef.hide()

> Hide the tooltip manually

```jsx
import ReactSuperTooltip from 'react-super-tooltip';

<ReactSuperTooltip ref={ref => this.tooltipRef = ref}>
  <button>I'm a button</button>
</ReactSuperTooltip>

<button onClick={() => { this.tooltipRef.hide() }}>Hide tooltip</button>
```

## License

MIT
