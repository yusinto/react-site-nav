import React from 'react';
import {Switch, Link, Route} from 'react-router-dom';
import Home from './home';
import MyStory from './myStory';
import SiteNav, {ContentGroup} from 'react-site-nav';

export default () =>
  (
    <div>
      <header>
        <SiteNav>
          <ContentGroup title="About" width="320" height="200">
            <p>You can add anything within a ContentGroup.</p>
            <p>Like a list:</p>
            <ul>
              <li><Link to="/my-story">My Story</Link></li>
              <li>Another list item</li>
            </ul>
          </ContentGroup>
          <ContentGroup title="Contact" width="350" height="180">
            This is free text. Followed by some links.<br/>
            <a href="mailto:yusinto@gmail.com">Email</a><br/>
            <a href="https://github.com/yusinto">Github</a>
          </ContentGroup>
        </SiteNav>
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/my-story" component={MyStory}/>
        </Switch>
      </main>
    </div>
  );
