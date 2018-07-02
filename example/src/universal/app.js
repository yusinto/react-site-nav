import React, {Component} from 'react';
import {Switch, Link, Route, Redirect} from 'react-router-dom';
import Home from './home';
import Contact from './contact';
import styled, {keyframes} from 'styled-components';

const gridColumnWidth = 100;
const gridRowHeight = 30;
const arrowHeight = 5;
const perspective = 850;

const fadeOutSeconds = 0.34;
const fadeInSeconds = 0.25;
const moveSeconds = 0.2;
const moveArrowSeconds = 0.25;

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
const ListContent = styled.ul`
  position: absolute;
  top: 0;
  margin-top: 0;
  margin-bottom: 0;
  list-style-type: none;
  padding: 5px;
  opacity: ${({show}) => show ? 1 : 0};
  animation: ${({coldStart, show}) => {
    if (coldStart) return ''; // just show without animation on cold start
    return show ? FadeInContent : FadeOutContent
  }} 
  ${({show}) => show ? '0.1' : '0.29'}s
  forwards;
`;

/**
 * Tentative shape of the object that drives the menu items
 */
const MenuData = [
  {label: 'products', width: 200, height: 200, items: ['Payments', 'Billing', 'Connect']},
  {label: 'developers', width: 300, height: 400, items: ['Documentation', 'Api Reference']},
  {label: 'company', width: 450, height: 200, items: ['About', 'Customers', 'Jobs']},
];

/**
 * Injects index and left properties into MenuData
 */
const massageMenuData = () => {
  return MenuData.map((m, i) => {
    const result = {...m};
    result.index = i;
    result.left = (((i + 1) * gridColumnWidth) - (gridColumnWidth / 2)) - (m.width / 2);
    return result;
  });
};

export default class App extends Component {
  state = {display: 'none', fadeOut: false, fromData: null, toData: null};

  constructor(props) {
    super(props);
    this.menuDataMassaged = massageMenuData();
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
    return (
      <div>
        <header>
          <nav>
            <GridContainer>
              <GridItem onMouseLeave={this.onMouseLeave}>
                {
                  this.menuDataMassaged.map((m, i) =>
                    <MenuTitle key={`menu-title-${i}`} onMouseEnter={() => this.onMouseEnter(i)}>{m.label}</MenuTitle>)
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
                      this.menuDataMassaged.map((m, i) =>
                        <ListContent
                          coldStart={this.state.toData && this.state.toData.index === this.state.fromData.index}
                          show={this.state.toData && this.state.toData.index === i}
                        >
                          {
                            m.items.map((li, j) => <li key={`list-item-${i}-${j}`}>{li}</li>)
                          }
                        </ListContent>
                      )
                    }
                  </MovingDivContent>
                </MovingDiv>
              </GridItem>
            </GridContainer>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/home">
              <Redirect to="/"/>
            </Route>
            <Route path="/contact" component={Contact}/>
          </Switch>
        </main>
      </div>
    );
  }
}