import React, {Children} from 'react';
import memoize from 'memoize-one';
import styled from 'styled-components';
import {ContentGroupContainer} from './contentGroup';

const defaultContentWidth = 320;
const defaultContentHeight = 200;

const GridItem = styled.div`
  grid-column: ${({index}) => index + 1} / span 1;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.5;
    cursor: default;
  }
`;

/**
 * Injects index and left properties into MenuData
 */
export const memoizeMenuData = memoize((columnWidth, children) => Children.map(children, (child, i) => {
  // if width or height is not specified, add defaults
  const width = child.props.width ? child.props.width : defaultContentWidth;
  return {
    height: defaultContentHeight,
    ...child.props, // order is important here! spread child.props after height, followed by width.
    width,
    index: i,
    left: (((i + 1) * columnWidth) - (columnWidth / 2)) - (width / 2),
  };
}));

export const memoizeGridItems = memoize((children, onMouseEnter) => Children.map(children, (child, i) => (
  <GridItem
    key={`menu-title-${i}`}
    index={i}
    onMouseEnter={(e) => onMouseEnter(e.target, i)}
  >
    {child.props.title}
  </GridItem>
)));

export const memoizeContent = memoize((children, fromData, toData) => Children.map(children, (child, i) => (
  <ContentGroupContainer
    key={`content-group-${i}`}
    show={toData && toData.index === i}
    fadeOut={fromData && fromData.index === i}
  >
    {child.props.children}
  </ContentGroupContainer>
)));

export const memoizeColumns = memoize(children => Children.count(children));

export const memoizeAlign = memoize(align => {
  switch (align) {
    case 'left':
      return 'start';
    case 'right':
      return 'end';
    default:
      return 'center';
  }
});