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

const arrowHeight = 5;
const perspective = 850;

const fadeOutSeconds = 0.34;
const fadeInSeconds = 0.25;
const moveSeconds = 0.2;
const moveArrowSeconds = 0.25;
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
  grid-column: ${props => props.index + 1} / span 1;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.5;
  }
`;
const ContentRow = styled.div`
  grid-column: 1 / span ${({columns}) => columns};
  grid-row: 2 / span 1;
  position: relative;
  height: 0;
`;
const ArrowUp = styled.div`
  margin-left: ${({toData}) => toData ? (toData.width / 2) - arrowHeight : 0}px;
  width: 0; 
  height: 0; 
  border-left: ${arrowHeight}px solid transparent;
  border-right: ${arrowHeight}px solid transparent;
  border-bottom: ${arrowHeight}px solid ${({background}) => background};
  animation: ${({fromData, toData}) => {
  if (fromData) return MoveArrow(fromData, toData);
  return '';
}}
  
  ${moveArrowSeconds}s forwards ease;
`;
const MoveArrow = (fromData, toData) => keyframes`
  from {
    margin-left: ${(fromData.width / 2) - arrowHeight}px;
  }
  
  to {
    margin-left: ${(toData.width / 2) - arrowHeight}px;
  }
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
  position: absolute;
  top: -10px;
  left: ${({fromData}) => fromData ? fromData.left : 0}px;
  width: ${({fromData}) => fromData ? fromData.width : 0}px;
  height: ${({fromData}) => fromData ? fromData.height : 0}px;
  display: ${props => props.display};
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
const MovingDivContent = styled.div`
  ${setFromProps('background')};
  border-radius: 4px;
  width: 100%;
  height: 100%;
  box-shadow: 0px 8px 28px 1px rgba(138,126,138,0.67); // Ripped from: https://www.cssmatic.com/box-shadow
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
  top: 0;
  margin-top: 0;
  margin-bottom: 0;
  width: 100%;
  height: 100%;
  padding: 5px;
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

export const ContentGroup = ({title, width, height}) => {
  return <div>{title}: {width}x{height}</div>;
};

export default class SiteNav extends Component {
  state = {display: 'none', fadeOut: false, fromData: null, toData: null};

  static defaultProps = {
    align: defaultRootAlign,
    columnWidth: defaultColumnWidth,
    rowHeight: defaultRowHeight,
    background: defaultBackground,
    contentBackground: defaultContentBackground,
    contentColor: defaultContentColor,
    breakpoint: defaultBreakpoint,
    color: defaultColor,
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
              onMouseEnter={() => this.onMouseEnter(i)}>
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

  close = () => this.setState((prevState) => ({fadeOut: true, fromData: prevState.toData}));
  onMouseEnter = (menuDataIndex) => {
    this.setState((prevState) => {
      const fadeOut = false;
      const display = 'block';
      const toData = this.memoizeMenuData(this.props.columnWidth, this.props.children)[menuDataIndex];

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
      };
    });
  };
  onMouseLeave = () => this.close();
  onClickMovingDiv = () => this.close();

  render() {
    const {
      columnWidth, rowHeight, background, contentBackground, contentColor,
      children, align, fontSize, fontFamily, color, breakpoint
    } = this.props;
    const {fromData, toData} = this.state;
    const columns = this.memoizeColumns(children);
    const gridItems = this.memoizeGridItems(children);
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
          {gridItems}
          <ContentRow columns={columns}>
            <MovingDiv display={this.state.display}
                       fadeOut={this.state.fadeOut}
                       fromData={this.state.fromData}
                       toData={this.state.toData}
                       color={contentColor}
            >
              <ArrowUp fromData={this.state.fromData}
                       toData={this.state.toData}
                       background={contentBackground}
              />
              <MovingDivContent onClick={this.onClickMovingDiv}
                                background={contentBackground}>
                {content}
              </MovingDivContent>
            </MovingDiv>
          </ContentRow>
        </GridContainer>
      </nav>
    );
  }
}