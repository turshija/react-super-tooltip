# react-super-tooltip
[![Version](http://img.shields.io/npm/v/react-super-tooltip.svg)](https://www.npmjs.org/package/react-super-tooltip)

## EXAMPLE

[TODO](https://www.google.com)

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
getContent          |Function   |noop       |Function that generates tooltip content
onClick             |Function   |noop       |Gets called when user clicks on tooltip 
trigger             |String     |hover      |How to trigger tooltip (Available: hover, click)
preferredPosition   |String     |right      |Define your preferred position that will be used if multiple positions are possible 
interactive         |Bool       |true       |Change cursor to pointer to specify that tooltip is interactive
component           |Component  |`div`      |Choose tooltip element
arrowSize           |Number     |6          |Tooltip arrow size
arrowColor          |String     |#fff       |Tooltip arrow color
offset              |Number     |0          |Number of pixels to offset tooltip away from element
onShow              |Function   |noop       |Callback function that will be called when tooltip is shown
onHide              |Function   |noop       |Callback function that will be called when tooltip is hidden
onMouseEnter        |Function   |noop       |Callback function that will be called when mouse enters target element
onMouseLeave        |Function   |noop       |Callback function that will be called when mouse leaves target element

## Manually showing and hiding tooltips

### tooltipRef.show()

> Show specific tooltip manually, for example:

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
