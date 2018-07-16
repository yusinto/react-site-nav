import React from 'react';
import logo from './logo.svg';
import aboutMeImage from './about-me.png';
import myProjectsImage from './projects.png';
import './App.css';
import SiteNav, {ContentGroup} from 'react-site-nav';

export default () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo"/>
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <SiteNav debug={true}>
      <ContentGroup title="About" width="240" height="140">
        <ul>
          <li>
              <img src={aboutMeImage} height="40"/>
              <span>About me</span>
          </li>
          <li>
            <img src={myProjectsImage} height="40"/>
            <span>My projects</span>
          </li>
        </ul>
      </ContentGroup>
      <ContentGroup title="Contact" width="200" height="150">
        <ul>
          <li><a href="https://github.com/yusinto">Github</a></li>
          <li><a href="https://twitter.com/yusinto">Twitter</a></li>
        </ul>
      </ContentGroup>
    </SiteNav>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
  </div>
);