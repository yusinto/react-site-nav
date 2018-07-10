import React, {Component} from 'react';
import {Switch, Link, Route, Redirect} from 'react-router-dom';
import Home from './home';
import Contact from './contact';
import SiteNav, {ContentGroup} from 'react-site-nav';
import styled, {injectGlobal} from 'styled-components';
import logo from '../../assets/logo-transparent.png';

injectGlobal`
  // auto-generated from https://www.svgbackgrounds.com/#abstract-envelope
  body {
    background-color: #77aa77;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 2 1'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(0,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%2377aa77'/%3E%3Cstop offset='1' stop-color='%234fd'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='0' y2='1' gradientTransform='rotate(360,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23cf8' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23cf8' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='2' y2='2' gradientTransform='rotate(105,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23cf8' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23cf8' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='2' height='1'/%3E%3Cg fill-opacity='0.85'%3E%3Cpolygon fill='url(%23b)' points='0 1 0 0 2 0'/%3E%3Cpolygon fill='url(%23c)' points='2 1 2 0 0 0'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
  }
  
  a {
    text-decoration: none;
  }
  
  a:visited {
    color: lightslategray;
  }
`;
const ListContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
`;
const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  color: lightslategray;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const ListItemContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const LisItemHeadingText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 13px;
  margin-left: 10px;
`;

const ListItemHeading = styled.div`
  font-size: 15px;
  font-weight: 400;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 400px auto;
  grid-template-rows: 80px;
  background: transparent;
`;

export default class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Header>
            <Link to="/">
              <img style={{height: '80px', marginLeft: '20px', marginTop: '0px'}} src={logo}/>
            </Link>
          </Header>
          <SiteNav background="transparent"
                   fontSize="18"
                   fontFamily="Helvetica, sans-serif"
          >
            <ContentGroup title="Products" width="360" height="200">
              <ListContainer>
                <List>
                  <li>
                    <Link to="/contact">
                      <ListItemContent>
                        <img src="https://booster.io/wp-content/uploads/payment-gateways-icons.png"
                             width={40} height={40}/>
                        <LisItemHeadingText>
                          <ListItemHeading>PAYMENTS</ListItemHeading>
                          <div>A complete payments platform engineered.</div>
                        </LisItemHeadingText>
                      </ListItemContent>
                    </Link>
                  </li>
                  <li>
                    <ListItemContent>
                      <img src="https://main.yhlsoft.com/main/images/Billing-Icon-darkblue-min.png"
                           width={40} height={40}/>
                      <LisItemHeadingText>
                        <ListItemHeading>BILLING</ListItemHeading>
                        <div>Build and scale your recurring business model.</div>
                      </LisItemHeadingText>
                    </ListItemContent>
                  </li>
                  <li>
                    <ListItemContent>
                      <img src="https://cdn2.iconfinder.com/data/icons/computer-roundline/512/share-512.png"
                           width={40} height={40}/>
                      <LisItemHeadingText>
                        <ListItemHeading>CONNECT</ListItemHeading>
                        <div>Everything platforms need to get sellers paid.</div>
                      </LisItemHeadingText>
                    </ListItemContent>
                  </li>
                </List>
              </ListContainer>
            </ContentGroup>
            <ContentGroup title="Developers" width="220" height="220">
              <List>
                <li>Documentation</li>
                <li>Api Reference</li>
              </List>
            </ContentGroup>
            <ContentGroup title="Company" width="300" height="250">
              <List>
                <li>About</li>
                <li>Customers</li>
                <li>Jobs</li>
              </List>
            </ContentGroup>
            <ContentGroup title="Pricing" width="180" height="100">
              <List>
                <li>Basic</li>
                <li>Medium</li>
                <li>Enterprise</li>
              </List>
            </ContentGroup>
          </SiteNav>
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