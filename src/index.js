import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';

export default class ReactSuperTooltip extends Component {

  static propTypes = {
    component: PropTypes.any,
    getContent: PropTypes.func,
    children: PropTypes.any,
    preferredPosition: PropTypes.string,
    interactive: PropTypes.bool
  };

  static defaultProps = {
    component: 'div',
    getContent: () => null,
    children: null,
    preferredPosition: 'right',
    interactive: true
  };

  state = {
    visible: false
  };

  handleMouseEnter = (e) => {

  };

  handleMouseLeave = (e) => {

  };

  handleClick = (e) => {

  };

  render () {
    const { component: Comp, getContent, children, preferredPosition, interactive, ...props } = this.props;
    const { visible } = this.state;

    return (
      <Comp {...props} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClick={this.handleClick}>
        {children}
        <Tooltip preferredPosition={preferredPosition} visible={visible} interactive={interactive}>
          {getContent(this.props)}
        </Tooltip>
      </Comp>
    );
  }

}
