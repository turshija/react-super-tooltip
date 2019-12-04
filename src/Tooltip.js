import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Root = styled.div`
  pointer-events: none;
  opacity: 0;
  position: fixed;
  padding: ${(props) => props.arrowSize}px;
  
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
    border-width: ${(props) => props.size}px 0 ${(props) => props.size}px ${(props) => props.size}px;
    border-color: transparent transparent transparent ${(props) => props.color};
  }
  
  &.right {
    border-width: ${(props) => props.size}px ${(props) => props.size}px ${(props) => props.size}px 0;
    border-color: transparent ${(props) => props.color} transparent transparent;
  }
  
  &.top {
    border-width: ${(props) => props.size}px ${(props) => props.size}px 0 ${(props) => props.size}px;
    border-color: ${(props) => props.color} transparent transparent transparent;
  }
  
  &.bottom {
    border-width: 0 ${(props) => props.size}px ${(props) => props.size}px ${(props) => props.size}px;
    border-color: transparent transparent ${(props) => props.color} transparent;
  }
  
  &.top-left {
    border-width: ${(props) => props.size * 2}px ${(props) => props.size}px 0 ${(props) => props.size}px;
    border-color: ${(props) => props.color} transparent transparent transparent;
    transform: rotate(-45deg);
  }
  
  &.top-right {
    border-width: ${(props) => props.size * 2}px ${(props) => props.size}px 0 ${(props) => props.size}px;
    border-color: ${(props) => props.color} transparent transparent transparent;
    transform: rotate(45deg);
  }
  
  &.bottom-left {
    border-width: ${(props) => props.size * 2}px ${(props) => props.size}px 0 ${(props) => props.size}px;
    border-color: ${(props) => props.color} transparent transparent transparent;
    transform: rotate(-135deg);
  }
  
  &.bottom-right {
    border-width: ${(props) => props.size * 2}px ${(props) => props.size}px 0 ${(props) => props.size}px;
    border-color: ${(props) => props.color} transparent transparent transparent;
    transform: rotate(135deg);
  }
`;

const UnderArrowBox = styled.div`
  position: absolute;
  z-index: 9;
`;

export default class Tooltip extends Component {

  static propTypes = {
    preferredPosition: PropTypes.string,
    children: PropTypes.any,
    className: PropTypes.string,
    interactive: PropTypes.bool,
    visible: PropTypes.bool,
    position: PropTypes.object,
    withRef: PropTypes.any,
    offset: PropTypes.number,
    arrowColor: PropTypes.string,
    arrowSize: PropTypes.number
  };

  getUnderArrowBoxStyle () {
    const { position: { position, box }, arrowSize, offset } = this.props;

    if (position === 'top') {
      const height = arrowSize + offset;
      const width = Math.min(arrowSize * 5, box.width);
      return {
        height,
        width,
        left: (box.width - width) / 2 - box.offset,
        bottom: -offset
      };
    }
    if (position === 'bottom') {
      const height = arrowSize + offset;
      const width = Math.min(arrowSize * 5, box.width);
      return {
        height,
        width,
        left: (box.width - width) / 2 - box.offset,
        top: -offset
      };
    }
    if (position === 'left') {
      const height = Math.min(arrowSize * 5, box.height);
      const width = arrowSize + offset;
      return {
        height,
        width,
        right: -offset,
        top: (box.height - height) / 2 - box.offset
      };
    }
    if (position === 'right') {
      const height = Math.min(arrowSize * 5, box.height);
      const width = arrowSize + offset;
      return {
        height,
        width,
        left: -offset,
        top: (box.height - height) / 2 - box.offset
      };
    }
    if (position === 'top-left') {
      const height = arrowSize * 4;
      const width = (arrowSize + offset) * 1.4 + 12;
      return {
        height,
        width,
        right: arrowSize - width,
        bottom: arrowSize - height / 2,
        transform: 'rotate(45deg)',
        transformOrigin: 'center left'
      };
    }
    if (position === 'bottom-left') {
      const height = arrowSize * 4;
      const width = (arrowSize + offset) * 1.4 + 12;
      return {
        height,
        width,
        right: arrowSize - width,
        top: arrowSize - height / 2,
        transform: 'rotate(-45deg)',
        transformOrigin: 'center left'
      };
    }
    if (position === 'top-right') {
      const height = arrowSize * 4;
      const width = (arrowSize + offset) * 1.4 + 12;
      return {
        height,
        width,
        left: arrowSize - width,
        bottom: arrowSize - height / 2,
        transform: 'rotate(-45deg)',
        transformOrigin: 'center right'
      };
    }
    if (position === 'bottom-right') {
      const height = arrowSize * 4;
      const width = (arrowSize + offset) * 1.4 + 12;
      return {
        height,
        width,
        left: arrowSize - width,
        top: arrowSize - height / 2,
        transform: 'rotate(45deg)',
        transformOrigin: 'center right'
      };
    }
  }

  getArrowPosition () {
    const { position: { position, box }, arrowSize } = this.props;

    if (position === 'top') {
      return {
        bottom: 0,
        left: box.width / 2 - box.offset - arrowSize
      };
    }
    if (position === 'bottom') {
      return {
        top: 0,
        left: box.width / 2 - box.offset - arrowSize
      };
    }
    if (position === 'left') {
      return {
        right: 0,
        top: box.height / 2 - box.offset - arrowSize
      };
    }
    if (position === 'right') {
      return {
        left: 0,
        top: box.height / 2 - box.offset - arrowSize
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
    const { children, interactive, visible, position, withRef, arrowColor, arrowSize, className } = this.props;

    return (
      <Root
        ref={withRef}
        interactive={interactive}
        className={visible ? 'open' : null}
        style={{ top: position.box.y, left: position.box.x }}
        arrowSize={arrowSize}>
        <UnderArrowBox style={this.getUnderArrowBoxStyle()}/>
        <Arrow className={position.position} size={arrowSize} color={arrowColor} style={this.getArrowPosition()}/>
        <Content position={position} className={className}>
          {children}
        </Content>
      </Root>
    );
  }

}
