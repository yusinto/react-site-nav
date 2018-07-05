import React, {Component} from 'react';
import styled, {keyframes} from 'styled-components';

const gridColumnWidth = 100;
const gridRowHeight = 30;
const arrowHeight = 5;
const perspective = 850;

const fadeOutSeconds = 0.34;
const fadeInSeconds = 0.25;
const moveSeconds = 0.2;
const moveArrowSeconds = 0.25;
const fadeOutContentSeconds = 0.29;
const fadeInContentSeconds = 0.1;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, ${gridColumnWidth}px);
  grid-template-rows: ${gridRowHeight}px;
`;
const ArrowUp = styled.div`
  margin-left: ${({toData}) => toData ? (toData.width / 2) - arrowHeight : 0}px;
  width: 0; 
  height: 0; 
  border-left: ${arrowHeight}px solid transparent;
  border-right: ${arrowHeight}px solid transparent;
  border-bottom: ${arrowHeight}px solid #73AD21;
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
const GridItem = styled.div`
  background: #6772e5;
  grid-column: 3 / span 3;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  position: relative;
`;
const MenuTitle = styled.div`
  &:hover {
    opacity: 0.5;
  }
  flex-grow: 1;
  text-align: center;
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
  position: absolute;
  top: ${gridRowHeight}px;
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
  background: #73AD21;
  border-radius: 5px;
  width: 100%;
  height: 100%;
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
  animation: ${({coldStart, show}) => {
  if (coldStart) return ''; // just show without animation on cold start
  return show ? FadeInContent : FadeOutContent
}} 
  ${({show}) => show ? `${fadeInContentSeconds}` : `${fadeOutContentSeconds}`}s
  forwards;
`;

/**
 * Injects index and left properties into MenuData
 */
const massageMenuData = (children) => {
  return React.Children.map(children, (child, i) => {
    const childData = {...child.props};
    childData.index = i;
    childData.left = (((i + 1) * gridColumnWidth) - (gridColumnWidth / 2)) - (child.props.width / 2);
    return childData;
  });
};

export const ContentGroup = ({label, width, height}) => {
  return <div>{label}: {width}x{height}</div>;
};

export default class SiteNav extends Component {
  state = {display: 'none', fadeOut: false, fromData: null, toData: null};

  constructor(props) {
    super(props);
    this.menuDataMassaged = massageMenuData(props.children);
  }

  onMouseEnter = (menuDataIndex) => {
    this.setState((prevState) => {
      const fadeOut = false;
      const display = 'block';
      const toData = this.menuDataMassaged[menuDataIndex];

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

  onMouseLeave = () => {
    this.setState((prevState) => ({fadeOut: true, fromData: prevState.toData}));
  };

  render() {
    const {children} = this.props;
    return (
      <nav>
        <GridContainer>
          <GridItem onMouseLeave={this.onMouseLeave}>
            {
              React.Children.map(children, (child, i) =>
                <MenuTitle key={`menu-title-${i}`} onMouseEnter={() => this.onMouseEnter(i)}>{child.props.label}</MenuTitle>)
            }
            <MovingDiv display={this.state.display}
                       fadeOut={this.state.fadeOut}
                       fromData={this.state.fromData}
                       toData={this.state.toData}
            >
              <ArrowUp fromData={this.state.fromData}
                       toData={this.state.toData}
              />
              <MovingDivContent>
                {
                  React.Children.map(children, (child, i) =>
                    <ContentGroupContainer
                      key={`content-group-${i}`}
                      coldStart={this.state.toData && this.state.toData.index === this.state.fromData.index}
                      show={this.state.toData && this.state.toData.index === i}
                    >
                      {child.props.children}
                    </ContentGroupContainer>
                  )
                }
              </MovingDivContent>
            </MovingDiv>
          </GridItem>
        </GridContainer>
      </nav>
    );
  }
}