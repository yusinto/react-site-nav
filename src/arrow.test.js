import React from 'react';
import Arrow from './arrow';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

describe('<Arrow />', () => {
  let display = 'block';
  let fadeOut = false;
  const fromData = {height: 270, width: 420, index: 0, left: 100};
  const toData = {height: 270, width: 420, index: 0, left: 100};
  const onClick = jest.fn();
  let background = 'white';
  let leftOffset = 0;
  let rightOffset = 0;

  const props = {
    display,
    fadeOut,
    fromData,
    toData,
    onClick,
    background,
    leftOffset,
    rightOffset,
  };

  it('should fade in on cold start', () => {
    const arrow = renderer.create(<Arrow {...props}/>);
    // console.log(arrow);
    expect(arrow).toMatchSnapshot();
  });
});