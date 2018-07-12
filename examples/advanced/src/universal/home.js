import React, {Component} from 'react';
import styled from 'styled-components';

const RootDiv = styled.div`
  margin-top: 30px; 
  margin-left: 30px; 
  color: #fff;
`;
const Heading = styled.h1`
  font-weight: 400;
  color: #fff;
`;

export default class Home extends Component {
  render() {
    return (
      <RootDiv>
        <Heading>React Site Nav</Heading>
        The new standard in site navigation.
      </RootDiv>
    );
  }
}