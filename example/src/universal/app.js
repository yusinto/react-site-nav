import React, {Component} from 'react';
import {Switch, Link, Route, Redirect} from 'react-router-dom';
import Home from './home';
import Contact from './contact';
import SiteNav, {ContentGroup} from './siteNav';

export default class App extends Component {
  render() {
    return (
      <div>
        <header>
          <SiteNav>
            <ContentGroup label="Products" width="200" height="200">
              <ul>
                <li>Payments</li>
                <li>Billing</li>
                <li>Connect</li>
              </ul>
            </ContentGroup>
            <ContentGroup label="Developers" width="300" height="400">
              <div>Documentation</div>
              <div>Api Reference</div>
            </ContentGroup>
            <ContentGroup label="Company" width="450" height="200">
              <div>About</div>
              <div>Customers</div>
              <div>Jobs</div>
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