import React, {Component} from 'react';
import {Switch, Link, Route, Redirect} from 'react-router-dom';
import Home from './home';
import Contact from './contact';
import SiteNav, {ContentGroup} from 'react-site-nav';
import styled, {injectGlobal} from 'styled-components';
import logo from '../../assets/logo.jpg';

injectGlobal`
  a {
    text-decoration: none;
  }
  
  a:visited {
    color: lightslategray;
  }
`;
const ContentList = styled.ul`
  list-style-type: none;
  margin-top: 10px;
  margin-left: 10px;
  padding: 0;
  color: lightslategray;
  
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  margin: 10px
`;

const LisItemHeadingText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 13px;
  margin-left: 10px;
`;

const ListItemHeading = styled.div`
  font-size: 15px;
  font-weight: 400;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 100px auto 100px;
  grid-template-rows: 80px;
  background: #fff;
`;

export default class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Header>
            <Link to="/">
              <img style={{height: '70px', marginLeft: '20px', marginTop: '5px'}} src={logo}/>
            </Link>
          </Header>
          <SiteNav>
            <ContentGroup title="Products" width="400" height="170">
              <ContentList>
                <ListItem>
                  <Link to="/contact">
                    <img src="https://booster.io/wp-content/uploads/payment-gateways-icons.png"
                         width={40} height={40}/>
                  </Link>
                  <LisItemHeadingText>
                    <Link to="/contact">
                      <ListItemHeading>PAYMENTS</ListItemHeading>
                      <div>A complete payments platform engineered for growth.</div>
                    </Link>
                  </LisItemHeadingText>
                </ListItem>
                <ListItem>
                  <img src="https://main.yhlsoft.com/main/images/Billing-Icon-darkblue-min.png"
                       width={40} height={40}/>
                  <LisItemHeadingText>
                    <ListItemHeading>BILLING</ListItemHeading>
                    <div>Build and scale your recurring business model.</div>
                  </LisItemHeadingText>
                </ListItem>
                <ListItem>
                  <img src="https://cdn2.iconfinder.com/data/icons/computer-roundline/512/share-512.png"
                       width={40} height={40}/>
                  <LisItemHeadingText>
                    <ListItemHeading>CONNECT</ListItemHeading>
                    <div>Everything platforms need to get sellers paid.</div>
                  </LisItemHeadingText>
                </ListItem>
              </ContentList>
            </ContentGroup>
            <ContentGroup title="Developers" width="300" height="400">
              <ContentList>
                <ListItem>Documentation</ListItem>
                <ListItem>Api Reference</ListItem>
              </ContentList>
            </ContentGroup>
            <ContentGroup title="Company" width="450" height="200">
              <ContentList>
                <ListItem>About</ListItem>
                <ListItem>Customers</ListItem>
                <ListItem>Jobs</ListItem>
              </ContentList>
            </ContentGroup>
            <ContentGroup title="Pricing" width="250" height="100">
              <ContentList>
                <ListItem>Basic</ListItem>
                <ListItem>Medium</ListItem>
                <ListItem>Enterprise</ListItem>
              </ContentList>
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