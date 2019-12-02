import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Root = styled.div`
  pointer-events: none;
  opacity: 0;
  position: absolute;
  
  &.open {
    pointer-events: ${(props) => props.interactive ? 'auto' : 'none'};
    opacity: 1;
  }
`;

const Content = styled.div`
  
`;

const Arrow = styled.div`
  position: absolute;
  height: 0;
  width: 0;
`;

export default class Tooltip extends Component {

  static propTypes = {
    preferredPosition: PropTypes.string,
    children: PropTypes.any,
    interactive: PropTypes.bool,
    visible: PropTypes.bool
  };

  constructor (props) {
    super(props);

    this.state = {
      position: props.preferredPosition
    };
  }

  render () {
    const { children, interactive, visible } = this.props;
    const { position } = this.state;

    return (
      <Root interactive={interactive} className={visible ? 'open' : null}>
        <Arrow position={position}/>
        <Content position={position}>
          {children}
        </Content>
      </Root>
    );
  }

}
