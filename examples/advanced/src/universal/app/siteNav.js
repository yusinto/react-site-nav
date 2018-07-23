import React, {Component} from 'react';
import styled, {keyframes, css} from 'styled-components';
import memoize from 'memoize-one';
import kebabCase from 'lodash.kebabcase';

const defaultRootAlign = 'center';
const defaultColor = '#fff';
const defaultColumnWidth = 150;
const defaultRowHeight = 45;
const defaultBackground = '#323232';
const defaultBreakpoint = 768;
const defaultContentBackground = '#fff';
const defaultContentColor = '#323232';
const defaultContentWidth = 320;
const defaultContentHeight = 200;

const arrowHeight = 15;
const perspective = 850;

const fadeOutSeconds = 0.34;
const fadeInSeconds = 0.25;
const moveSeconds = 0.25;
const moveArrowSeconds = 0.28;
const fadeOutContentSeconds = 0.29;
const fadeInContentSeconds = 0.1;

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
  if (fadeOut) return `${fadeOutSeconds}s`;
  if (display === 'block') {
    if (fromData.left === toData.left) return `${fadeInSeconds}s`; // fade in
    if (fromData) return `${moveSeconds}s`; // move
  }
  return '0s'; // display: none; don't animate
}}
  
  forwards ease;
`;
const FadeInContent = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
`;
const FadeOutContent = keyframes`
  from {
    opacity: 1;
  }
  
  to {
    opacity: 0;
  }
`;
const ContentGroupContainer = styled.div`
  position: absolute;
  margin-top: 0;
  margin-bottom: 0;
  width: 100%;
  height: 100%;
  opacity: ${({show}) => show ? 1 : 0};
  z-index: ${({show}) => show ? 1 : 0};
  animation: ${({show, fadeOut}) => {
  if (show) return FadeInContent;
  if (fadeOut) return FadeOutContent;
  return ''; // cold start and everything else just show without animation 
}} 
  ${({show}) => show ? `${fadeInContentSeconds}` : `${fadeOutContentSeconds}`}s
  forwards;
`;
const FadeInArrow = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
`;
const FadeOutArrow = keyframes`
  from {
    opacity: 1;
  }
  
  to {
    opacity: 0;
  }
`;
const MoveArrow = (fromData, toData, offset) => keyframes`
  from {
    left: ${fromData.left + (fromData.width / 2) - arrowHeight}px;
  }
  
  to {
    left: ${toData.left + (toData.width / 2) - offset - arrowHeight}px;
  }
`;
const Arrow = styled.div`
  top: -${arrowHeight / 2}px;
  position: absolute;
  transform: rotate(45deg);  
  border-radius: 4px 0 0 0;
  z-index: 1;
  ${setFromProps('background')};
  left: ${({toData, offset}) => toData ? toData.left + (toData.width / 2) - offset - arrowHeight : 0}px;
  width: ${arrowHeight}px;
  height: ${arrowHeight}px;
  display: ${props => props.display};
  // TODO: fix box shadow around arrow
  //box-shadow: 0 8px 28px 1px rgba(138,126,138,0.67); // Ripped from: https://www.cssmatic.com/box-shadow
  animation: ${({fadeOut, display, fromData, toData, offset}) => {
  if (fadeOut) return FadeOutArrow;
  if (display === 'block') {
    if (fromData.left === toData.left) return FadeInArrow;
    if (fromData) return MoveArrow(fromData, toData, offset);
  }
  return ''; // display: none; don't animate
}}
  
  // fade out and in slower than moving sideways
  ${({fadeOut, display, fromData, toData}) => {
  if (fadeOut) return `${fadeOutSeconds}s`;
  if (display === 'block') {
    if (fromData.left === toData.left) return `${fadeInSeconds}s`; // fade in
    if (fromData) return `${moveArrowSeconds}s`; // move
  }
  return '0s'; // display: none; don't animate
}}
  
  forwards ease;
`;

export const ContentGroup = ({title, width, height}) => {
  return <div>{title}: {width}x{height}</div>;
};

export default class SiteNav extends Component {
  state = {display: 'none', fadeOut: false, fromData: null, toData: null, offset: 0};

  static defaultProps = {
    align: defaultRootAlign,
    columnWidth: defaultColumnWidth,
    rowHeight: defaultRowHeight,
    background: defaultBackground,
    contentBackground: defaultContentBackground,
    contentColor: defaultContentColor,
    breakpoint: defaultBreakpoint,
    color: defaultColor,
    debug: false,
  };

  /**
   * Injects index and left properties into MenuData
   */
  memoizeMenuData = memoize((columnWidth, children) => React.Children.map(children, (child, i) => {
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
  memoizeGridItems = memoize(children => React.Children.map(children, (child, i) =>
    <GridItem key={`menu-title-${i}`}
              index={i}
              onMouseEnter={(e) => this.onMouseEnter(e.target, i)}>
      {child.props.title}
    </GridItem>
  ));
  memoizeContent = memoize((children, fromData, toData) => React.Children.map(children, (child, i) =>
    <ContentGroupContainer
      key={`content-group-${i}`}
      show={toData && toData.index === i}
      fadeOut={fromData && fromData.index === i}
    >
      {child.props.children}
    </ContentGroupContainer>
  ));
  memoizeColumns = memoize(children => React.Children.count(children));
  memoizeAlign = memoize(align => {
    switch (align) {
      case 'left':
        return 'start';
      case 'right':
        return 'end';
      default:
        return 'center';
    }
  });

  close = () => {
    if (this.props.debug) return;
    this.setState((prevState) => ({fadeOut: true, fromData: prevState.toData}));
  };
  onMouseEnter = (target, menuDataIndex) => {
    this.setState((prevState) => {
      const fadeOut = false;
      const display = 'block';
      const toDataOriginal = this.memoizeMenuData(this.props.columnWidth, this.props.children)[menuDataIndex];
      const toData = {...toDataOriginal};
      let offset = 0;

      if (target) { // off screen detection
        // target is rootGridItem
        const {left, width} = target.getBoundingClientRect();
        const offScreenDistance = (toData.width / 2) - (left + (width / 2));
        const isOffScreen = offScreenDistance > 0;

        if (isOffScreen) {
          // if off screen, toData.left needs to be moved to be on-screen!
          offset = offScreenDistance + 10;
          toData.left += offset;
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
          offset,
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
    const {fromData, toData, display, fadeOut, offset} = this.state;
    const columns = this.memoizeColumns(children);
    const rootGridItems = this.memoizeGridItems(children);
    const content = this.memoizeContent(children, fromData, toData);
    const justifyContent = this.memoizeAlign(align);

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
              offset={offset}
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