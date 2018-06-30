import React, {Component} from 'react';
import {Switch, Link, Route, Redirect} from 'react-router-dom';
import Home from './home';
import Contact from './contact';
import styled, {keyframes} from 'styled-components';

const gridRowHeight = 30;
const arrowHeight = 5;
const perspective = 850;

const fadeOutSeconds = 0.34;
const fadeInSeconds = 0.25;
const moveSeconds = 0.2;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px 100px 100px 100px;
  grid-template-rows: ${gridRowHeight}px;
`;
const ArrowUp = styled.div`
  margin-left: 40px;
  width: 0; 
  height: 0; 
  border-left: ${arrowHeight}px solid transparent;
  border-right: ${arrowHeight}px solid transparent;
  border-bottom: ${arrowHeight}px solid #73AD21;
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
    if(fromData) return Move(fromData, toData);
  }
  return ''; // display: none; don't animate
}}
  
  // fade out and in slower than moving sideways
  ${({fadeOut, display, fromData, toData}) => {
  if (fadeOut) return `${fadeOutSeconds}s`;
  if (display === 'block') {
    if (fromData.left === toData.left) return `${fadeInSeconds}s`; // fade in
    if(fromData) return `${moveSeconds}s`; // move
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
  & > ul {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

const List = props => {
  const {data: {items}} = props;
  return (
    <ul style={{listStyleType: 'none', padding: '5px'}}>
      {items.map(i => <li>{i}</li>)}
    </ul>
  );
};

const MenuData = {
  products: {left: -10, width: 200, height: 200, items: ['Payments', 'Billing', 'Connect']},
  developers: {left: 90, width: 300, height: 400, items: ['Documentation', 'Api Reference']},
  company: {left: 190, width: 450, height: 200, items: ['About', 'Customers', 'Jobs']},
};

export default class App extends Component {
  state = {display: 'none', fadeOut: false, fromData: null, toData: null};

  onMouseEnter = (category) => {
    this.setState((prevState) => {
      const fadeOut = false;
      const display = 'block';
      const toData = MenuData[category];

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
                <MenuTitle onMouseEnter={() => this.onMouseEnter('products')}>Products</MenuTitle>
                <MenuTitle onMouseEnter={() => this.onMouseEnter('developers')}>Developers</MenuTitle>
                <MenuTitle onMouseEnter={() => this.onMouseEnter('company')}>Company</MenuTitle>
                <MovingDiv display={this.state.display}
                           fadeOut={this.state.fadeOut}
                           fromData={this.state.fromData}
                           toData={this.state.toData}
                >
                  <ArrowUp/>
                  <MovingDivContent>
                    {
                      this.state.toData && <List data={this.state.toData}/>
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