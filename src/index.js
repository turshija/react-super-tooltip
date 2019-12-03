import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';
import calculatePosition from './calculatePosition';

export default class ReactSuperTooltip extends Component {

  static propTypes = {
    component: PropTypes.any,
    getContent: PropTypes.func,
    children: PropTypes.any,
    preferredPosition: PropTypes.string,
    interactive: PropTypes.bool,
    spacing: PropTypes.number,
    trigger: PropTypes.string,
    arrowColor: PropTypes.string,
  };

  static defaultProps = {
    component: 'div',
    getContent: () => null,
    children: null,
    preferredPosition: 'right',
    interactive: true,
    spacing: 7,
    trigger: 'hover',
    arrowColor: '#ffffff'
  };

  state = {
    visible: false,
    position: {
      box: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        offset: 0
      },
      position: 'left',
      intersection: 0
    }
  };

  target = null;
  tooltip = null;

  componentDidMount () {
    this.setState({ position: this.calculatePosition() });

    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  }

  calculatePosition = () => {
    return calculatePosition(this.props.preferredPosition, this.state.position, this.target.getBoundingClientRect(), this.tooltip.getBoundingClientRect(), {
      x: window.scrollX,
      y: window.scrollY,
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  handleMouseEnter = (e) => {
    if (this.props.trigger === 'hover') {
      this.setState({ visible: true, position: this.calculatePosition() });
    }

    this.props.onMouseEnter && this.props.onMouseEnter(e);
  };

  handleMouseLeave = (e) => {
    if (this.props.trigger === 'hover') {
      this.setState({ visible: false });
    }

    this.props.onMouseLeave && this.props.onMouseLeave(e);
  };

  handleClick = (e) => {
    if (this.props.trigger === 'click') {
      this.setState({ visible: true, position: this.calculatePosition() });
    }

    this.props.onClick && this.props.onClick(e);
  };

  handleScroll = () => {
    this.setState({ position: this.calculatePosition() });
  };

  handleResize = () => {
    this.setState({ position: this.calculatePosition() });
  };

  setTargetRef = (ref) => this.target = ref;

  setTooltipRef = (ref) => this.tooltip = ref;

  render () {
    const {
      component: Comp, getContent, children, preferredPosition, interactive, spacing, arrowColor, ...props
    } = this.props;
    const { visible, position } = this.state;

    return (
      <Comp
        {...props}
        ref={this.setTargetRef}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}>
        {children}
        <Tooltip
          withRef={this.setTooltipRef}
          preferredPosition={preferredPosition}
          position={position}
          visible={visible}
          interactive={interactive}
          arrowColor={arrowColor}
          spacing={spacing}>
          {getContent(this.props)}
        </Tooltip>
      </Comp>
    );
  }

}
