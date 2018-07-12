import React, {Component} from 'react';
import {Switch, Link, Route, Redirect} from 'react-router-dom';
import Home from '../home';
import Contact from '../contact';
import SiteNav, {ContentGroup} from '../siteNav';
import styled, {injectGlobal} from 'styled-components';
import logo from '../../../assets/logo-transparent.png';
import ProductsContentGroup from './products';
import Developers from './developers';
import Company from './company';
import Pricing from './pricing';

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
  
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
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
                   debug={false}
          >
            <ContentGroup title="Products" width="420" height="270">
              <ProductsContentGroup/>
            </ContentGroup>
            <ContentGroup title="Developers" width="370" height="300">
              <Developers/>
            </ContentGroup>
            <ContentGroup title="Company" width="260" height="220">
              <Company/>
            </ContentGroup>
            <ContentGroup title="Pricing" width="300" height="250">
              <Pricing/>
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