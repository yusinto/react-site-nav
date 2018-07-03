import React, {Component} from 'react';
import {Switch, Link, Route, Redirect} from 'react-router-dom';
import Home from './home';
import Contact from './contact';
import SiteNav, {ContentGroup} from './siteNav';

// TODO: Use react children api to render content divs
// https://mxstbr.blog/2017/02/react-children-deepdive/
export default class App extends Component {
  render() {
    return (
      <div>
        <header>
          <SiteNav>
            <ContentGroup label="Products" width="200" height="200">
              <ContentItem>Payments</ContentItem>
              <ContentItem>Billing</ContentItem>
              <ContentItem>Connect</ContentItem>
            </ContentGroup>
            <ContentGroup label="Developers" width="300" height="400">
              <ContentItem>Documentation</ContentItem>
              <ContentItem>Api Reference</ContentItem>
            </ContentGroup>
            <ContentGroup label="Company" width="450" height="200">
              <ContentItem>About</ContentItem>
              <ContentItem>Customers</ContentItem>
              <ContentItem>Jobs</ContentItem>
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