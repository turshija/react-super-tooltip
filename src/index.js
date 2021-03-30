import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';
import calculatePosition, { availablePositions } from './calculatePosition';
import styled from '@emotion/styled';

const StyledComponent = styled.div`
  position: relative;
`;

export default class ReactSuperTooltip extends Component {

  static propTypes = {
    component: PropTypes.any,
    content: PropTypes.node,
    children: PropTypes.node,
    preferredPosition: PropTypes.oneOf(availablePositions),
    interactive: PropTypes.bool,
    trigger: PropTypes.oneOf([ 'click', 'hover' ]),
    ignoreTrigger: PropTypes.bool,
    arrowSize: PropTypes.number,
    arrowColor: PropTypes.string,
    offset: PropTypes.number,
    bounds: PropTypes.any,
    keepInBounds: PropTypes.bool,
    tooltip: PropTypes.node,
    tooltipClassName: PropTypes.string,
    tooltipContainerClassName: PropTypes.string,
    ignoreGlobalClick: PropTypes.bool,
    onShow: PropTypes.func,
    onHide: PropTypes.func
  };

  static defaultProps = {
    component: 'div',
    content: '',
    children: null,
    preferredPosition: 'right',
    interactive: true,
    ignoreTrigger: false,
    trigger: 'hover',
    arrowSize: 6,
    arrowColor: '#ffffff',
    offset: 0,
    bounds: null,
    keepInBounds: false,
    ignoreGlobalClick: false,
    onShow: () => null,
    onHide: () => null
  };

  state = {
    visible: false,
    manualOpen: false,
    position: {
      box: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        offset: 0
      },
      position: 'left',
      intersection: 0,
      originalPosition: true
    }
  };

  target = null;
  tooltip = null;

  componentDidMount () {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ position: this.calculatePosition() });
  }

  componentDidUpdate (props, state) {
    if (!state.visible && this.state.visible) {
      this.props.onShow();
    } else if (state.visible && !this.state.visible) {
      this.props.onHide();
    }
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('click', this.handleClickOutside);
  }

  getViewport = () => {
    if (this.props.bounds) {
      let element = null;

      if (this.props.bounds.length > 0) {
        // string
        element = document.querySelector(this.props.bounds);
      } else if (this.props.bounds.outerHTML) {
        // html element
        element = this.props.bounds;
      }

      if (element) {
        const box = element.getBoundingClientRect();

        const top = Math.max(0, box.top);
        const left = Math.max(0, box.left);
        const bottom = Math.min(box.bottom, window.innerHeight);
        const right = Math.min(box.right, window.innerWidth);

        return {
          top,
          left,
          width: right - left,
          height: bottom - top
        };
      }
    }

    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  };

  calculatePosition = () => {
    if (!this.target || !this.tooltip) {
      return this.state.position;
    }

    return calculatePosition(
      this.props.preferredPosition,
      this.state.position,
      this.props.offset,
      this.target.getBoundingClientRect(),
      this.tooltip.getBoundingClientRect(),
      this.getViewport(),
      this.props.keepInBounds
    );
  };

  showTooltip = (manualOpen = false) => {
    this.setState({ visible: true, manualOpen, position: this.calculatePosition() });

    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('click', this.handleClickOutside);
  };

  hideTooltip = () => {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('click', this.handleClickOutside);

    this.setState({ visible: false });
  };

  show = () => this.showTooltip(true);

  hide = () => this.hideTooltip();

  handleMouseEnter = (e) => {
    if (this.props.trigger === 'hover' && !this.props.ignoreTrigger) {
      this.showTooltip();
    }

    // eslint-disable-next-line react/prop-types
    this.props.onMouseEnter && this.props.onMouseEnter(e);
  };

  handleMouseLeave = (e) => {
    if (this.props.trigger === 'hover' && !this.props.ignoreTrigger) {
      this.hideTooltip();
    }

    // eslint-disable-next-line react/prop-types
    this.props.onMouseLeave && this.props.onMouseLeave(e);
  };

  handleClick = (e) => {
    if (this.props.trigger === 'click' && !this.props.ignoreTrigger) {
      e.preventDefault();
      e.stopPropagation();
      this.showTooltip();
    }

    // eslint-disable-next-line react/prop-types
    this.props.onClick && this.props.onClick(e);
  };

  handleClickOutside = () => {
    if (this.props.ignoreGlobalClick || this.props.ignoreTrigger) {
      return;
    }

    if (this.props.trigger === 'click' || this.state.manualOpen) {
      this.hideTooltip();
    }
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
    /* eslint-disable no-unused-vars */
    const {
      component, content, children, preferredPosition, interactive, trigger, arrowSize, arrowColor, offset,
      tooltip, tooltipClassName, tooltipContainerClassName, onShow, onHide, ...props
    } = this.props;
    const { visible, position } = this.state;
    /* eslint-enable no-unused-vars */

    return (
      <StyledComponent
        as={component}
        {...props}
        ref={this.setTargetRef}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}>
        {children}
        <Tooltip
          withRef={this.setTooltipRef}
          tooltip={tooltip}
          className={tooltipClassName}
          rootClassName={tooltipContainerClassName}
          preferredPosition={preferredPosition}
          position={position}
          visible={visible}
          offset={offset}
          interactive={interactive}
          arrowColor={arrowColor}
          arrowSize={arrowSize}>
          {content}
        </Tooltip>
      </StyledComponent>
    );
  }

}
