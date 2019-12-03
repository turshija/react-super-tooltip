import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import calculatePosition from './calculatePosition';

const Root = styled.div`
  pointer-events: none;
  opacity: 0;
  position: fixed;
  padding: ${(props) => props.spacing}px;
  
  &.open {
    pointer-events: ${(props) => props.interactive ? 'auto' : 'none'};
    opacity: 1;
  }
`;

const Content = styled.div`
  background: #ffffff;
  border-radius: 5px;
  position: relative;
  padding: 8px;
  z-index: 12;
`;

const Arrow = styled.div`
  position: absolute;
  z-index: 11;
  height: 0;
  width: 0;
  
  border-style: solid;
  
  &.left {
    border-width: ${(props) => props.spacing}px 0 ${(props) => props.spacing}px ${(props) => props.spacing}px;
    border-color: transparent transparent transparent ${(props) => props.color};
  }
  
  &.right {
    border-width: ${(props) => props.spacing}px ${(props) => props.spacing}px ${(props) => props.spacing}px 0;
    border-color: transparent ${(props) => props.color} transparent transparent;
  }
  
  &.top {
    border-width: ${(props) => props.spacing}px ${(props) => props.spacing}px 0 ${(props) => props.spacing}px;
    border-color: ${(props) => props.color} transparent transparent transparent;
  }
  
  &.bottom {
    border-width: 0 ${(props) => props.spacing}px ${(props) => props.spacing}px ${(props) => props.spacing}px;
    border-color: transparent transparent ${(props) => props.color} transparent;
  }
  
  &.top-left {
    border-width: ${(props) => props.spacing * 2}px ${(props) => props.spacing}px 0 ${(props) => props.spacing}px;
    border-color: ${(props) => props.color} transparent transparent transparent;
    transform: rotate(-45deg);
  }
  
  &.top-right {
    border-width: ${(props) => props.spacing * 2}px ${(props) => props.spacing}px 0 ${(props) => props.spacing}px;
    border-color: ${(props) => props.color} transparent transparent transparent;
    transform: rotate(45deg);
  }
  
  &.bottom-left {
    border-width: ${(props) => props.spacing * 2}px ${(props) => props.spacing}px 0 ${(props) => props.spacing}px;
    border-color: ${(props) => props.color} transparent transparent transparent;
    transform: rotate(-135deg);
  }
  
  &.bottom-right {
    border-width: ${(props) => props.spacing * 2}px ${(props) => props.spacing}px 0 ${(props) => props.spacing}px;
    border-color: ${(props) => props.color} transparent transparent transparent;
    transform: rotate(135deg);
  }
`;

export default class Tooltip extends Component {

  static propTypes = {
    preferredPosition: PropTypes.string,
    children: PropTypes.any,
    interactive: PropTypes.bool,
    visible: PropTypes.bool,
    position: PropTypes.object,
    withRef: PropTypes.any,
    arrowColor: PropTypes.string,
    spacing: PropTypes.number
  };

  getArrowPosition () {
    const { position: { position, box }, spacing } = this.props;

    if (position === 'top') {
      return {
        bottom: 0,
        left: box.width / 2 - box.offset - spacing
      };
    }
    if (position === 'bottom') {
      return {
        top: 0,
        left: box.width / 2 - box.offset - spacing
      };
    }
    if (position === 'left') {
      return {
        right: 0,
        top: box.height / 2 - box.offset - spacing
      };
    }
    if (position === 'right') {
      return {
        left: 0,
        top: box.height / 2 - box.offset - spacing
      };
    }
    if (position === 'top-left') {
      return {
        bottom: 0,
        right: 0
      };
    }
    if (position === 'top-right') {
      return {
        bottom: 0,
        left: 0
      };
    }
    if (position === 'bottom-left') {
      return {
        top: 0,
        right: 0
      };
    }
    if (position === 'bottom-right') {
      return {
        top: 0,
        left: 0
      };
    }
  }

  render () {
    const { children, interactive, visible, position, withRef, arrowColor, spacing } = this.props;

    return (
      <Root
        ref={withRef}
        interactive={interactive}
        className={visible ? 'open' : null}
        style={{ top: position.box.y, left: position.box.x }}
        spacing={spacing}>
        <Arrow className={position.position} spacing={spacing} color={arrowColor} style={this.getArrowPosition()}/>
        <Content position={position}>
          {children}
        </Content>
      </Root>
    );
  }

}
