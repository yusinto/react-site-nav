import React, {Component} from 'react';
import {Switch, Link, Route, Redirect} from 'react-router-dom';
import Home from './home';
import SpaLink1 from './spaLink1';
import SpaLink2 from './spaLink2';
import SiteNav, {ContentGroup} from 'react-site-nav';
import './app.css';
import logo from '../../assets/logo.jpg';

export default () =>
  (
    <div>
      <header>
        <div style={{width: '100%', background: 'white'}}>
          <Link to="/">
            <img style={{height: '70px', marginLeft: '20px', marginTop: '5px'}} src={logo}/>
          </Link>
        </div>
        <SiteNav>
          <ContentGroup title="About" width="300" height="100">
            <ul>
              <li><Link to="/spa-link-1">Spa Link</Link></li>
              <li><Link to="/spa-link-2">Another Spa Link</Link></li>
            </ul>
          </ContentGroup>
          <ContentGroup title="Contact" width="200" height="150">
            <ul style={{listStyleType: 'none'}}>
              <li>
                <a href="mailto:yusinto@gmail.com">Email</a>
              </li>
              <li>
                <a href="https://github.com/yusinto">Github</a>
              </li>
              <li>
                <a href="https://twitter.com/yusinto">Twitter</a>
              </li>
              <li>
                <a href="https://linkedin.com/in/yusinto">Tinkedin</a>
              </li>
            </ul>
          </ContentGroup>
        </SiteNav>
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/home">
            <Redirect to="/"/>
          </Route>
          <Route path="/spa-link-1" component={SpaLink1}/>
          <Route path="/spa-link-2" component={SpaLink2}/>
        </Switch>
      </main>
    </div>
  );
