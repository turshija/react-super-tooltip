import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';
import calculatePosition, { availablePositions } from './calculatePosition';

export default class ReactSuperTooltip extends Component {

  static propTypes = {
    component: PropTypes.any,
    getContent: PropTypes.func,
    children: PropTypes.any,
    preferredPosition: PropTypes.oneOf(availablePositions),
    interactive: PropTypes.bool,
    trigger: PropTypes.oneOf([ 'click', 'hover' ]),
    arrowSize: PropTypes.number,
    arrowColor: PropTypes.string,
    offset: PropTypes.number,
    tooltipClassName: PropTypes.string,
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func
  };

  static defaultProps = {
    component: 'div',
    getContent: () => null,
    children: null,
    preferredPosition: 'right',
    interactive: true,
    trigger: 'hover',
    arrowSize: 6,
    arrowColor: '#ffffff',
    offset: 0,
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
      intersection: 0
    }
  };

  target = null;
  tooltip = null;

  componentDidMount () {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ position: this.calculatePosition() });
  }

  calculatePosition = () => {
    return calculatePosition(this.props.preferredPosition, this.state.position, this.props.offset, this.target.getBoundingClientRect(), this.tooltip.getBoundingClientRect(), {
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  showTooltip = (manual = false) => {
    this.setState({ visible: true, manualOpen: manual, position: this.calculatePosition() }, () => this.props.onShow(this.props));

    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);

    if (this.props.trigger === 'click' || manual) {
      window.addEventListener('click', this.handleClickOutside);
    }
  };

  hideTooltip = () => {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);

    if (this.props.trigger === 'click' || this.state.manualOpen) {
      window.removeEventListener('click', this.handleClickOutside);
    }

    this.setState({ visible: false }, () => this.props.onHide(this.props));
  };

  show = () => this.showTooltip(true);

  hide = () => this.hideTooltip();

  handleMouseEnter = (e) => {
    if (this.props.trigger === 'hover') {
      this.showTooltip();
    }

    this.props.onMouseEnter && this.props.onMouseEnter(e);
  };

  handleMouseLeave = (e) => {
    if (this.props.trigger === 'hover') {
      this.hideTooltip();
    }

    this.props.onMouseLeave && this.props.onMouseLeave(e);
  };

  handleClick = (e) => {
    if (this.props.trigger === 'click') {
      e.preventDefault();
      e.stopPropagation();
      this.showTooltip();
    }

    this.props.onClick && this.props.onClick(e);
  };

  handleClickOutside = () => {
    this.hideTooltip();
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
      component: Comp, getContent, children, preferredPosition, interactive, trigger, arrowSize, arrowColor, offset,
      tooltipClassName, onShow, onHide, onMouseEnter, onMouseLeave, onClick, ...props
    } = this.props;
    const { visible, position } = this.state;
    /* eslint-enable no-unused-vars */

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
          className={tooltipClassName}
          preferredPosition={preferredPosition}
          position={position}
          visible={visible}
          offset={offset}
          interactive={interactive}
          arrowColor={arrowColor}
          arrowSize={arrowSize}>
          {getContent(this.props)}
        </Tooltip>
      </Comp>
    );
  }

}
