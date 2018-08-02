import React from 'react';
import Arrow, {calculateArrowMarginLeft} from './arrow';
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
    expect(arrow).toMatchSnapshot();
  });

  it('should fade out on mouse out', () => {
    const propsCopy = {
      ...props,
      display: 'none',
      fadeOut: true,
    };
    const arrow = renderer.create(<Arrow {...propsCopy}/>);
    expect(arrow).toMatchSnapshot();
  });

  it('animate moving between content groups', () => {
    props.toData = {height: 350, width: 200, index: 1, left: 200};
    const propsCopy = {
      ...props,
      toData: {height: 350, width: 200, index: 1, left: 200},
    };
    const arrow = renderer.create(<Arrow {...propsCopy}/>);
    expect(arrow).toMatchSnapshot();
  });

  it('should compensate for left offset', () => {
    const marginLeft = calculateArrowMarginLeft(fromData, 50, 0);
    expect(marginLeft).toMatchSnapshot();
  });

  it('should compensate for right offset', () => {
    const marginLeft = calculateArrowMarginLeft(fromData, 0, 50);
    expect(marginLeft).toMatchSnapshot();
  });
});