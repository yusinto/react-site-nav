import React from 'react';
import logo from './logo.svg';
import reactMenuImage from './react-logo.png';
import aboutMeImage from './about-me.png';
import docsImage from './docs.png';
import communityImage from './community.png';
import reactSiteNavImage from './react-site-nav-logo.png';
import tutorialImage from './tutorial.png';
import './App.css';
import SiteNav, {ContentGroup} from 'react-site-nav';

export default () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo"/>
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <SiteNav debug={false}>
      <ContentGroup title="Github" width="220" height="100">
        <ul>
          <li>
            <img src={reactMenuImage} width="30" height="30" alt="react"/>
            <a href="https://github.com/facebook/react">React</a>
          </li>
          <li>
            <img src={reactSiteNavImage} height="30" alt="react site nav"/>
            <a href="https://github.com/yusinto/react-site-nav">React Site Nav</a>
          </li>
        </ul>
      </ContentGroup>
      <ContentGroup title="Developers" width="180" height="200">
        <ul>
          <li>
            <img src={docsImage} height="30" alt="docs"/>
            <a href="https://reactjs.org/docs/getting-started.html">Docs</a>
          </li>
          <li>
            <img src={tutorialImage} height="30" alt="tutorial"/>
            <a href="https://reactjs.org/tutorial/tutorial.html">Tutorial</a>
          </li>
          <li>
            <img src={communityImage} height="30" alt="community"/>
            <a href="https://reactjs.org/community/support.html">Community</a>
          </li>
          <li>
            <img src={aboutMeImage} height="30" alt="blog"/>
            <a href="http://www.reactjunkie.com/">Blog</a>
          </li>
        </ul>
      </ContentGroup>
    </SiteNav>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
  </div>
);