import React, {Component} from 'react';
import styled, {keyframes, css} from 'styled-components';
import kebabCase from 'lodash.kebabcase';
import PropTypes from 'prop-types';
import Arrow from './arrow';
import {memoizeAlign, memoizeColumns, memoizeContent, memoizeGridItems, memoizeMenuData} from './memoized';
import {OffScreenPadding, FadeOutSeconds, FadeInSeconds} from './constants';

const defaultRootAlign = 'center';
const defaultColor = '#fff';
const defaultColumnWidth = 150;
const defaultRowHeight = 45;
const defaultBackground = '#323232';
const defaultBreakpoint = 768;
const defaultContentBackground = '#fff';
const defaultContentColor = '#323232';

const perspective = 850;
const moveSeconds = 0.25;

const setFromProps = camelCaseKey => css`
  ${props => props[camelCaseKey] ? `${kebabCase(camelCaseKey)}: ${props[camelCaseKey]}` : null}`;

const GridContainer = styled.div`
  // HACK: can't use display none because menu flashes when breakpoint changes for some reason!
  @media(max-width: ${({breakpoint}) => (breakpoint - 1)}px) {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }
  
  @media(min-width: ${({breakpoint}) => breakpoint}px) {
    display: grid;
    ${setFromProps('justifyContent')};
    justify-items: stretch;
    grid-template-columns: repeat(${({columns}) => columns}, ${({columnWidth}) => columnWidth}px);
    grid-template-rows: ${({rowHeight}) => rowHeight}px;
    position: relative;
    ${setFromProps('background')};
    ${setFromProps('color')};  
    ${setFromProps('fontFamily')};
    ${setFromProps('fontSize')}px;  
  }
`;
const ContentRow = styled.div`
  grid-column: 1 / span ${({columns}) => columns};
  grid-row: 2 / span 1;
  position: relative;
  height: 0;
`;
const Move = (fromData, toData) => keyframes`
  from {
    left: ${fromData.left}px;
    width: ${fromData.width}px;
    height: ${fromData.height}px;
  }
  
  to {
    left: ${toData.left}px;
    width: ${toData.width}px;
    height: ${toData.height}px;
  }
`;
const FadeIn = keyframes`
  from {
    opacity: 0;
    transform: perspective(${perspective}px) rotateX(-60deg);
    transform-origin: top center;
  }
  
  to {
    opacity: 1;
    transform: perspective(${perspective}px) rotateX(0deg);
    transform-origin: top center;
  }
`;
const FadeOut = keyframes`
  from {
    opacity: 1;
    transform: perspective(${perspective}px) rotateX(0deg);
    transform-origin: top center;
  }
  
  to {
    opacity: 0;
    transform: perspective(${perspective}px) rotateX(-60deg);
    transform-origin: top center;
    z-index: -1; // HACK: do this so hidden div does not block other elements on the page! We should have set display: none here, but its too hard
  }
`;
const MovingDiv = styled.div`
  ${setFromProps('color')};
  ${setFromProps('background')};
  position: absolute;
  left: ${({fromData}) => fromData ? fromData.left : 0}px;
  width: ${({fromData}) => fromData ? fromData.width : 0}px;
  height: ${({fromData}) => fromData ? fromData.height : 0}px;
  display: ${({display}) => display};
  border-radius: 4px;
  box-shadow: 0 8px 28px 1px rgba(138,126,138,0.67); // Ripped from: https://www.cssmatic.com/box-shadow
  animation: ${({fadeOut, display, fromData, toData}) => {
  if (fadeOut) return FadeOut;
  if (display === 'block') {
    if (fromData.left === toData.left) return FadeIn;
    if (fromData) return Move(fromData, toData);
  }
  return ''; // display: none; don't animate
}}
  
  // fade out and in slower than moving sideways
  ${({fadeOut, display, fromData, toData}) => {
  if (fadeOut) return `${FadeOutSeconds}s`;
  if (display === 'block') {
    if (fromData.left === toData.left) return `${FadeInSeconds}s`; // fade in
    if (fromData) return `${moveSeconds}s`; // move
  }
  return '0s'; // display: none; don't animate
}}
  
  forwards ease;
`;

export default class SiteNav extends Component {
  state = {display: 'none', fadeOut: false, fromData: null, toData: null, leftOffset: 0, rightOffset: 0};

  static defaultProps = {
    align: defaultRootAlign,
    columnWidth: defaultColumnWidth,
    rowHeight: defaultRowHeight,
    background: defaultBackground,
    contentBackground: defaultContentBackground,
    contentColor: defaultContentColor,
    breakpoint: defaultBreakpoint,
    color: defaultColor,
    fontSize: null,
    fontFamily: null,
    debug: false,
  };

  static propTypes = {
    align: PropTypes.oneOf(['left', 'center', 'right']),
    columnWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rowHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    background: PropTypes.string,
    contentBackground: PropTypes.string,
    contentColor: PropTypes.string,
    breakpoint: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.string,
    fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fontFamily: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    debug: PropTypes.bool,
    children: PropTypes.any.isRequired,
  };

  close = () => {
    if (this.props.debug) return;
    this.setState((prevState) => ({fadeOut: true, fromData: prevState.toData}));
  };

  onMouseEnter = (target, menuDataIndex) => {
    this.setState((prevState) => {
      const fadeOut = false;
      const display = 'block';
      const toDataOriginal = memoizeMenuData(this.props.columnWidth, this.props.children)[menuDataIndex];
      const toData = {...toDataOriginal};
      let leftOffset = 0;
      let rightOffset = 0;

      if (target) { // off screen detection
        // target is rootGridItem
        const {left, width} = target.getBoundingClientRect();
        const siteNavWidth = target.parentNode.clientWidth;
        leftOffset = (toData.width / 2) - (left + (width / 2));
        rightOffset = (toData.width / 2) - (siteNavWidth - (left + (width / 2)));

        if (leftOffset > 0) {
          // if off screen, toData.left needs to be moved to be on-screen!
          toData.left += leftOffset + OffScreenPadding;
        } else {
          leftOffset = 0;
        }

        if (rightOffset > 0) {
          toData.left -= rightOffset - OffScreenPadding;
        } else {
          rightOffset = 0;
        }

        let fromData;
        if (prevState.fadeOut || !prevState.toData) {
          // on cold start, pop up right from the current item
          fromData = toData;
        } else {
          // on warm start, start animation from the previous item
          fromData = prevState.toData;
        }

        return {
          display,
          fadeOut,
          fromData,
          toData,
          leftOffset,
          rightOffset,
        };
      }
    });
  };

  onMouseLeave = () => this.close();
  onClickMovingDiv = () => this.close();

  render() {
    const {
      columnWidth, rowHeight, background, contentBackground, contentColor,
      children, align, fontSize, fontFamily, color, breakpoint
    } = this.props;
    const {fromData, toData, display, fadeOut, leftOffset, rightOffset} = this.state;
    const columns = memoizeColumns(children);
    const rootGridItems = memoizeGridItems(children, this.onMouseEnter);
    const content = memoizeContent(children, fromData, toData);
    const justifyContent = memoizeAlign(align);

    return (
      <nav>
        <GridContainer
          background={background}
          columnWidth={columnWidth}
          rowHeight={rowHeight}
          justifyContent={justifyContent}
          fontSize={fontSize}
          fontFamily={fontFamily}
          color={color}
          breakpoint={breakpoint}

          /* Below are not configurable */
          onMouseLeave={this.onMouseLeave}
          columns={columns}
        >
          {rootGridItems}
          <ContentRow columns={columns}>
            <Arrow
              display={display}
              fadeOut={fadeOut}
              fromData={fromData}
              toData={toData}
              onClick={this.onClickMovingDiv}
              background={contentBackground}
              leftOffset={leftOffset}
              rightOffset={rightOffset}
            />
            <MovingDiv
              display={display}
              fadeOut={fadeOut}
              fromData={fromData}
              toData={toData}
              color={contentColor}
              onClick={this.onClickMovingDiv}
              background={contentBackground}
            >
              {content}
            </MovingDiv>
          </ContentRow>
        </GridContainer>
      </nav>
    );
  }
}